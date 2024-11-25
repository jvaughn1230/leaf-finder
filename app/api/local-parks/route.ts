import { fetchLocalParks } from "@/lib/localParks";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const longLat = searchParams.get("longLat") || "";
    const limit = searchParams.get("limit") || "";

    if (longLat) {
      const parks = await fetchLocalParks(longLat, parseInt(limit));
      return NextResponse.json(parks);
    } else {
      return NextResponse.json(
        { error: "longLat parameter is required" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error retrieving parks", error);
    return NextResponse.json(
      { error: `Error retrieving parks: ${error}` },
      {
        status: 500,
      }
    );
  }
}
