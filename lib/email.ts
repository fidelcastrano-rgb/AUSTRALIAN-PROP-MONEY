// Transactional Email Service utilizing Resend API via lightweight Edge-compatible REST fetch.

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY || "re_VRKzZxvP_8AYP4zXcStJK4hAX5963Z2TU";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "sales@australianpropsmoney.com";

  if (!apiKey) {
    console.warn("Resend API Key (RESEND_API_KEY) is missing. Skipping email sending in local test mode.");
    console.info(`---------------- [LOCAL E-MAIL MOCK] ----------------`);
    console.info(`To: ${to}`);
    console.info(`Subject: ${subject}`);
    console.info(`Body Preview: (HTML omitted, ${html.length} chars)`);
    console.info(`------------------------------------------------------`);
    return true; // Return true so that orders completed without API configuration still succeed in dev/trial.
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: `Australian Prop Money <${fromEmail}>`,
        to: [to],
        subject: subject,
        html: html
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Resend API returned status ${response.status}: ${errText}`);
    }

    console.log(`Email successfully sent to ${to} (Subject: "${subject}")`);
    return true;
  } catch (err) {
    console.error(`Failed to send email to ${to}:`, err);
    // Log failure, retry or notify administrator could be scheduled, but we return false to indicate immediate failure
    return false;
  }
}

// Helper to construct HTML for Customer Confirmation Email
export function renderCustomerEmailHTML({
  orderNumber,
  customerName,
  products,
  shippingMethod,
  paymentMethod,
  totalAmount,
}: {
  orderNumber: string;
  customerName: string;
  products: any[];
  shippingMethod: string;
  paymentMethod: string;
  totalAmount: number;
}) {
  const itemsRows = products.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-family: sans-serif; font-size: 14px; color: #334155;">
        <strong>${item.name}</strong> ${item.variationName ? `<span style="font-size: 12px; color: #64748b; font-style: italic;">[Size: ${item.variationName}]</span>` : ''}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center; font-family: sans-serif; font-size: 14px; color: #334155;">
        ${item.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-family: Arial, sans-serif; font-size: 14px; color: #1e293b; font-weight: bold;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('');

  return `
    <div style="background-color: #f8fafc; padding: 40px 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <!-- Header -->
        <div style="background-color: #0c1c2e; padding: 24px 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Australian Prop Money</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px;">
          <p style="font-size: 16px; color: #334155; line-height: 1.5; margin-top: 0;">Hi ${customerName},</p>
          <p style="font-size: 16px; color: #334155; line-height: 1.5;">Thank you for your order! We are reviewing your request to replicate the real deal for motion picture, television, educational or novelty use.</p>
          
          <div style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #64748b; font-weight: 600;">ORDER NUMBER</p>
            <p style="margin: 0; font-size: 20px; color: #0c1c2e; font-weight: 900; letter-spacing: 0.5px;">#${orderNumber}</p>
          </div>

          <!-- Product Table -->
          <h3 style="color: #0c1c2e; font-size: 16px; font-weight: 700; margin: 24px 0 12px 0; text-transform: uppercase; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
              <tr style="background-color: #f8fafc;">
                <th style="padding: 10px 12px; text-align: left; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; border-bottom: 2px solid #e2e8f0;">Item</th>
                <th style="padding: 10px 12px; text-align: center; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; border-bottom: 2px solid #e2e8f0;">Qty</th>
                <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; border-bottom: 2px solid #e2e8f0;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
          </table>

          <!-- Details list -->
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 16px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #64748b;">
              <span>Shipping Method:</span>
              <span style="font-weight: 600; color: #334155;">${shippingMethod}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #64748b;">
              <span>Payment Option:</span>
              <span style="font-weight: 600; color: #334155;">${paymentMethod}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 16px; font-size: 18px; color: #0c1c2e; font-weight: bold;">
              <span>Grand Total:</span>
              <span style="color: #10b981;">$${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <!-- Special payment notices -->
          ${paymentMethod.toLowerCase().includes('card') ? `
            <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 13px; color: #1e3a8a; line-height: 1.5; font-weight: 600;">
                <strong>Credit Card Notice:</strong> Our secure card payment link will be emailed or WhatsApped to you after we receive and review your order.
              </p>
            </div>
          ` : ''}

          ${paymentMethod.toLowerCase().includes('paypal') ? `
            <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 13px; color: #1e3a8a; line-height: 1.5; font-weight: 600;">
                <strong>PayPal Notice:</strong> PayPal Friends & Family payments only.
              </p>
            </div>
          ` : ''}

          ${paymentMethod.toLowerCase().includes('zelle') || paymentMethod.toLowerCase().includes('apple cash') || paymentMethod.toLowerCase().includes('chime') ? `
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 13px; color: #78350f; line-height: 1.5; font-weight: 600;">
                <strong>Notice:</strong> This payment option will be emailed or WhatsApped to you once we receive and review your order.
              </p>
            </div>
          ` : ''}

          <p style="font-size: 14px; color: #64748b; line-height: 1.5;">If you have any urgent timing requests, feel free to contact us via WhatsApp: <strong>+61485989180</strong> or reply to this email at <strong>${process.env.RESEND_ADMIN_EMAIL || 'sales@australianpropsmoney.com'}</strong>.</p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-t: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 12px; color: #64748b;">This email contains confidential transactional info. &copy; 2026 Australian Prop Money</p>
        </div>
      </div>
    </div>
  `;
}

// Helper to construct HTML for Admin Email Notification
export function renderAdminEmailHTML({
  orderNumber,
  firstName,
  lastName,
  email,
  phone,
  shippingAddress,
  country,
  stateRegion,
  notes,
  shippingMethod,
  paymentMethod,
  products,
  totalAmount,
}: {
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  country: string;
  stateRegion: string;
  notes: string;
  shippingMethod: string;
  paymentMethod: string;
  products: any[];
  totalAmount: number;
}) {
  const itemsRows = products.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px;">
        <strong>${item.name}</strong> ${item.variationName ? `[${item.variationName}]` : ''}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center; font-size: 13px;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 13px; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <div style="background-color: #fef2f2; padding: 30px 15px; font-family: sans-serif;">
      <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #fca5a5; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #991b1b; padding: 16px 24px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase;">🚨 NEW ORDER RECEIVED - #${orderNumber}</h2>
        </div>
        <div style="padding: 24px;">
          <h3 style="border-bottom: 2px solid #ef4444; padding-bottom: 6px; color: #991b1b; margin-top: 0;">Customer Information</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 140px; color: #4b5563;">Name:</td>
              <td style="padding: 6px 0; color: #111827;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Email:</td>
              <td style="padding: 6px 0; color: #111827;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Phone/WhatsApp:</td>
              <td style="padding: 6px 0; color: #111827;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Shipping Address:</td>
              <td style="padding: 6px 0; color: #111827; white-space: pre-line;">${shippingAddress}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">State & Country:</td>
              <td style="padding: 6px 0; color: #111827;">${stateRegion}, ${country}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Order Notes:</td>
              <td style="padding: 6px 0; color: #b91c1c; font-weight: bold; font-style: italic;">${notes || "None"}</td>
            </tr>
          </table>

          <h3 style="border-bottom: 2px solid #ef4444; padding-bottom: 6px; color: #991b1b;">Shipping & Payment</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 140px; color: #4b5563;">Shipping Method:</td>
              <td style="padding: 6px 0; color: #111827; font-weight: bold;">${shippingMethod}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Payment Method:</td>
              <td style="padding: 6px 0; color: #111827; font-weight: bold;">${paymentMethod}</td>
            </tr>
          </table>

          <h3 style="border-bottom: 2px solid #ef4444; padding-bottom: 6px; color: #991b1b;">Ordered Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 8px; text-align: left; font-size: 11px; text-transform: uppercase;">Product</th>
                <th style="padding: 8px; text-align: center; font-size: 11px; text-transform: uppercase; width: 60px;">Qty</th>
                <th style="padding: 8px; text-align: right; font-size: 11px; text-transform: uppercase; width: 100px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; font-weight: bold; text-align: right; font-size: 14px;">Total Amount:</td>
                <td style="padding: 10px; font-weight: bold; text-align: right; font-size: 16px; color: #b91c1c;">$${totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; text-align: center;">
            <a href="https://australianpropsmoney.com/admin/orders" style="display: inline-block; background-color: #991b1b; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; text-transform: uppercase;">
              Manage Order in Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}
