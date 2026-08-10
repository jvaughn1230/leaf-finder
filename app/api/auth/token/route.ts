import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/auth";

export async function GET() {
  try {
    const token = getTokenFromCookies();

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving token:", error);
    return NextResponse.json(
      { error: "Failed to retrieve token" },
      { status: 500 }
    );
  }
}
