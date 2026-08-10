import { NextResponse } from "next/server";
import { verifyToken, getTokenFromCookies } from "@/lib/utils/auth";

export async function GET() {
  try {
    const token = getTokenFromCookies();

    if (!token) {
      return NextResponse.json({ loggedIn: false }, { status: 200 });
    }

    const decoded = verifyToken(token);
    console.log("Decoded: ", decoded);

    return NextResponse.json({ loggedIn: true }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }
}
