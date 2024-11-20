import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/Users";
import { getTokenFromCookies } from "@/lib/utils/auth";

//GET favorites
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (!type || (type !== "nps" && type !== "local")) {
    return NextResponse.json(
      { success: false, message: "Invalid or missing 'type' parameter" },
      { status: 400 }
    );
  }

  try {
    const token = getTokenFromCookies();

    const decoded = verifyToken(token) as { userId: string };
    const userId = decoded.userId;

    await dbConnect();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const favorites =
      type === "nps"
        ? user.favoriteNpsParks
        : type === "local"
        ? user.favoriteLocalParks
        : [];

    return NextResponse.json({ favorites });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// Add Favorite
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { park, type } = body;

  if (!park || !type || (type !== "nps" && type !== "local")) {
    return NextResponse.json(
      { success: false, message: "Invalid 'park' or 'type' parameter" },
      { status: 400 }
    );
  }

  try {
    const token = getTokenFromCookies();

    const decoded = verifyToken(token) as { userId: string };
    const userId = decoded.userId;

    await dbConnect();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (type === "nps") {
      user.favoriteNPSParks.push(park);
    } else if (type === "local") {
      user.favoriteLocalParks.push(park);
    }

    await user.save();

    return NextResponse.json(
      { success: true, message: "Park added to favorites" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
