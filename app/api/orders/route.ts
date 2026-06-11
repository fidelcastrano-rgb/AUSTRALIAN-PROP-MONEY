import { NextRequest, NextResponse } from "next/server";
import { getOrders, updateOrderStatus } from "@/lib/db";

// API to support Admin Dashboard reading and status alterations
export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    console.error("GET orders handler error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders from database." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, status } = body;

    if (!orderNumber || !status) {
      return NextResponse.json(
        { error: "Required fields 'orderNumber' and 'status' are missing." },
        { status: 400 }
      );
    }

    const validStatuses = ["Pending", "Processing", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status provided. Must be Pending, Processing, Completed, or Cancelled." },
        { status: 400 }
      );
    }

    const updated = await updateOrderStatus(orderNumber, status);
    if (!updated) {
      return NextResponse.json(
        { error: "Order not found or database update failed." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: `Order status successfully modified to ${status}.` },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("PATCH order status handler error:", error);
    return NextResponse.json(
      { error: "Internal server error altering order status." },
      { status: 500 }
    );
  }
}
