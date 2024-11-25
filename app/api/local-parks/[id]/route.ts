import { NextResponse } from "next/server";
import { fetchLocalPark } from "@/lib/localParks";

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const park = await fetchLocalPark(id);
    return NextResponse.json(park);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch local park." },
      { status: 500 }
    );
  }
}
