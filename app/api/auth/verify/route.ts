import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/utils/auth";

export async function POST() {
  try {
    const token = cookies().get("jwt")?.value;

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Verify the token using the utility function, returns user id
    const decoded = verifyToken(token);

    return NextResponse.json({ valid: true, decoded }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { valid: false, error: "Invalid token" },
      { status: 401 }
    );
  }
}
