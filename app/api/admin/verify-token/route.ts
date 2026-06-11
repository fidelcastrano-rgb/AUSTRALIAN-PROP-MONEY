import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const correctToken = process.env.ADMIN_SECRET_TOKEN || "0987654321";

    if (!token || token !== correctToken) {
      return NextResponse.json(
        { error: "Invalid gateway token" },
        { status: 403 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_gate_clearance", "unlocked", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({ success: true, message: "Gateway cleared." });
  } catch (error: any) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Internal server error during verification." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const clearance = cookieStore.get("admin_gate_clearance");
  if (clearance && clearance.value === "unlocked") {
    return NextResponse.json({ unlocked: true });
  }
  return NextResponse.json({ unlocked: false }, { status: 403 });
}
