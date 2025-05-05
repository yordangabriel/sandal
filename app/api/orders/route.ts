import { NextResponse } from "next/server";
import { saveOrder } from "@/lib/db";

export const dynamic = "force-dynamic"; // Still needed for dynamic features

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = saveOrder(data);

    return NextResponse.json({
      success: true,
      orderId: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Error saving order:", error);
    
    let errorMessage = "Failed to save order";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: "Failed to save order", details: errorMessage },
      { status: 500 }
    );
  }
}