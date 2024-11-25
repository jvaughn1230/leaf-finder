import { NextRequest, NextResponse } from "next/server";
import { fetchNPSPark } from "@/lib/NPSParks";

export async function GET(
  request: NextRequest,
  { params }: { params: { parkCode: string } }
) {
  const { parkCode } = params;

  try {
    if (parkCode) {
      const park = await fetchNPSPark(parkCode);
      return NextResponse.json(park);
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
