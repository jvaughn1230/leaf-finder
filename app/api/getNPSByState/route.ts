import { fetchNPSByState } from "@/lib/fetchNpsByState";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get("state") || "";
    const limit = parseInt(searchParams.get("limit") || "9", 10); // Default limit to 9
    const page = parseInt(searchParams.get("page") || "1", 10); // Default page to 1

    // convert page number to start number
    const start = (page - 1) * 9;

    if (state) {
      const parks = await fetchNPSByState(state, limit, start);
      return NextResponse.json(parks);
    } else {
      return NextResponse.json(
        { error: "state parameter is required" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error retrieving parks", error);
    return NextResponse.json(
      { error: `Error retrieving parks: ${error}` },
      { status: 500 }
    );
  }
}
