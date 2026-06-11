import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function isAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  // Also check if they passed the gate clearance
  const gate = cookieStore.get("admin_gate_clearance");
  return (session && session.value === "authenticated") || (gate && gate.value === "unlocked");
}

export async function GET() {
  try {
    if (!await isAuthorized()) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const apiKey = process.env.RESEND_API_KEY || "re_VRKzZxvP_8AYP4zXcStJK4hAX5963Z2TU";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "sales@australianpropsmoney.com";
    const adminEmail = process.env.RESEND_ADMIN_EMAIL || "sales@australianpropsmoney.com";

    // Reveal length and secure bounds for diagnostic safety
    return NextResponse.json({
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey.length,
      apiKeyMasked: apiKey ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length > 4 ? apiKey.length - 4 : 0)}` : "Not Configured",
      fromEmail,
      adminEmail,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!await isAuthorized()) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { targetEmail } = await req.json();
    if (!targetEmail) {
      return NextResponse.json({ error: "Target email address is required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY || "re_VRKzZxvP_8AYP4zXcStJK4hAX5963Z2TU";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "sales@australianpropsmoney.com";

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        mode: "mock",
        message: "Warning: RESEND_API_KEY is missing from environment. The application is running in local offline mock/test mode.",
      }, { status: 200 });
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 12px; font-weight: 800; font-size: 20px; text-transform: uppercase; margin-top: 0;">Resend Connection Active! 🚀</h2>
        <p style="color: #334155; font-size: 15px; line-height: 1.6;">
          Congratulations! This message confirms that your <strong>Resend API Key</strong> is live and communicating with the mail server APIs.
        </p>
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin: 20px 0; font-family: monospace; font-size: 13px; color: #475569; border: 1px solid #edf2f7; line-height: 1.5;">
          <strong>Diagnostic Records:</strong><br/>
          • Dispatch Time: ${new Date().toLocaleString()}<br/>
          • Sender Identity: Australian Prop Money &lt;${fromEmail}&gt;<br/>
          • Destination Address: ${targetEmail}<br/>
          • Host System: Next.js Cloud Gateway
        </div>
        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 12px;">
          This is an automated system diagnostic email. You may safely dismiss.
        </p>
      </div>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: `Australian Prop Money <${fromEmail}>`,
        to: [targetEmail],
        subject: "APM Resend Server Integration Test 🚀",
        html: htmlContent
      })
    });

    const status = resendResponse.status;
    const responseText = await resendResponse.text();

    if (!resendResponse.ok) {
      return NextResponse.json({
        success: false,
        status,
        message: `Resend servers rejected dispatch with code ${status}`,
        detail: responseText
      }, { status: 400 });
    }

    let responseData = {};
    try {
      responseData = JSON.parse(responseText);
    } catch (_) {}

    return NextResponse.json({
      success: true,
      status,
      message: "Test email successfully delivered through Resend servers!",
      data: responseData
    });
  } catch (err: any) {
    console.error("Test email API error:", err);
    return NextResponse.json({
      success: false,
      message: `System Connection Failure: ${err.message}`
    }, { status: 500 });
  }
}
