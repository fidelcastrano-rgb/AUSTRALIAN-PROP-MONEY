import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/db";
import { sendEmail, renderCustomerEmailHTML, renderAdminEmailHTML } from "@/lib/email";

// Simple Rate Limiting Map in-memory
const rateLimitMap = new Map<string, { count: number; lastTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip);
  if (!userData) {
    rateLimitMap.set(ip, { count: 1, lastTime: now });
    return false;
  }
  // Allow maximum 5 checkouts per 5 minutes per IP
  if (now - userData.lastTime > 5 * 60 * 1000) {
    rateLimitMap.set(ip, { count: 1, lastTime: now });
    return false;
  }
  if (userData.count >= 5) {
    return true;
  }
  userData.count += 1;
  return false;
}

// Basic input sanitization
function sanitize(val: string): string {
  if (!val) return "";
  return val
    .replace(/[<>'"&]/g, "") // strip standard HTML elements & script brackets
    .trim();
}

export async function POST(req: NextRequest) {
  // 1. IP rate limiting & bot protection
  const ip = req.headers.get("x-forwarded-for") || (req as any).ip || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many checkout requests. Please wait a few minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      shippingAddress,
      country,
      stateRegion,
      notes,
      shippingMethod,
      shippingCost,
      paymentMethod,
      items,
      totalAmount
    } = body;

    // 2. Server-side validation
    if (!firstName || !lastName || !email || !phone || !shippingAddress || !country || !stateRegion || !items || !shippingMethod) {
      return NextResponse.json(
        { error: "All required fields must be supplied." },
        { status: 400 }
      );
    }

    if (items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }

    // Phone format check (must contain digits/useful contact info)
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7) {
      return NextResponse.json(
        { error: "Please enter a valid phone or WhatsApp contact number." },
        { status: 400 }
      );
    }

    // 3. Sanitization
    const cleanFirst = sanitize(firstName);
    const cleanLast = sanitize(lastName);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanAddress = sanitize(shippingAddress);
    const cleanCountry = sanitize(country);
    const cleanState = sanitize(stateRegion);
    const cleanNotes = sanitize(notes);
    const cleanShippingMethod = sanitize(shippingMethod);
    const cleanPaymentMethod = sanitize(paymentMethod);

    // 4. Generate unique order ID
    // E.g., APM-2026-XXXXX
    const randomSuffix = Math.floor(100000 + Math.random() * 900000).toString();
    const orderNumber = `APM-${new Date().getFullYear()}-${randomSuffix}`;

    // 5. Build order object
    const productsJsonString = JSON.stringify(items.map((i: any) => ({
      id: i.id || "",
      name: i.name || "",
      price: i.price ? Number(i.price) : 0,
      quantity: i.quantity ? Number(i.quantity) : 1,
      variationName: i.variationName || ""
    })));

    const parsedCost = Number(shippingCost) || 0;
    const parsedTotal = Number(totalAmount) || 0;

    const newOrder = {
      order_number: orderNumber,
      first_name: cleanFirst,
      last_name: cleanLast,
      email: cleanEmail,
      phone: cleanPhone,
      shipping_address: cleanAddress,
      country: cleanCountry,
      state_region: cleanState,
      notes: cleanNotes,
      shipping_method: cleanShippingMethod,
      shipping_cost: parsedCost,
      payment_method: cleanPaymentMethod,
      products: productsJsonString,
      total_amount: parsedTotal,
      status: "Pending" as const,
      created_at: new Date().toISOString()
    };

    // 6. Save order to DB (supports D1 & fallback memory)
    const success = await createOrder(newOrder);
    if (!success) {
      throw new Error("Unable to save order record inside database.");
    }

    // 7. Fire-and-forget Emails or try/catch so failure doesn't crash checkout
    // Construct HTML and send to customer & administrator
    const adminEmailHtml = renderAdminEmailHTML({
      orderNumber,
      firstName: cleanFirst,
      lastName: cleanLast,
      email: cleanEmail,
      phone: cleanPhone,
      shippingAddress: cleanAddress,
      country: cleanCountry,
      stateRegion: cleanState,
      notes: cleanNotes,
      shippingMethod: cleanShippingMethod,
      paymentMethod: cleanPaymentMethod,
      products: items,
      totalAmount: parsedTotal
    });

    const customerEmailHtml = renderCustomerEmailHTML({
      orderNumber,
      customerName: `${cleanFirst} ${cleanLast}`,
      products: items,
      shippingMethod: cleanShippingMethod,
      paymentMethod: cleanPaymentMethod,
      totalAmount: parsedTotal
    });

    const adminEmailAddress = process.env.RESEND_ADMIN_EMAIL || "info@australianpropsmoney.com";

    // Attempt emails with automatic simple immediate retry on failure
    const dispatchEmails = async () => {
      let adminSuccess = false;
      let customerSuccess = false;

      // Admin Email send + dynamic retry
      for (let attempt = 1; attempt <= 2; attempt++) {
        adminSuccess = await sendEmail({
          to: adminEmailAddress,
          subject: `New Order Received - ${orderNumber}`,
          html: adminEmailHtml
        });
        if (adminSuccess) break;
        console.warn(`Admin email failed. Retrying... (${attempt}/2)`);
      }

      // Customer Email send + dynamic retry
      for (let attempt = 1; attempt <= 2; attempt++) {
        customerSuccess = await sendEmail({
          to: cleanEmail,
          subject: `Australian Prop Money - Order Confirmation #${orderNumber}`,
          html: customerEmailHtml
        });
        if (customerSuccess) break;
        console.warn(`Customer email failed. Retrying... (${attempt}/2)`);
      }

      if (!adminSuccess || !customerSuccess) {
        console.error(`Email dispatch completed with warnings. Admin: ${adminSuccess}, Customer: ${customerSuccess}`);
      }
    };

    // Run emails async to prevent blocking browser response times
    dispatchEmails().catch(err => {
      console.error("Unhandled error background processing mail sender:", err);
    });

    return NextResponse.json(
      { 
        success: true, 
        orderNumber, 
        totalAmount: parsedTotal 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Endpoint Checkout Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error performing checkout operations." },
      { status: 500 }
    );
  }
}
