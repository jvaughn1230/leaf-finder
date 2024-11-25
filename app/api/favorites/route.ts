import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/Users";
import { getTokenFromCookies } from "@/lib/utils/auth";
import { fetchNPSPark } from "@/lib/NPSParks";
import { fetchLocalPark } from "@/lib/localParks";

//GET favorites
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  //   params check
  if (!type || (type !== "nps" && type !== "local")) {
    return NextResponse.json(
      { success: false, message: "Invalid or missing 'type' parameter" },
      { status: 400 }
    );
  }

  try {
    let favorites;
    // token check
    const token = getTokenFromCookies();

    const decoded = verifyToken(token) as { userId: string };
    const userId = decoded.userId;

    await dbConnect();

    // find user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (type === "nps") {
      const npsParkCodes = user.favoriteNPSParks;
      favorites = (await Promise.all(npsParkCodes.map(fetchNPSPark))).flat();
    } else if (type === "local") {
      const localParkIds = user.favoriteLocalParks;
      favorites = (await Promise.all(localParkIds.map(fetchLocalPark))).flat();
    }

    return NextResponse.json(favorites);
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

  //   params check
  if (!park || !type || (type !== "nps" && type !== "local")) {
    return NextResponse.json(
      { success: false, message: "Invalid 'park' or 'type' parameter" },
      { status: 400 }
    );
  }

  try {
    // token check
    const token = getTokenFromCookies();

    const decoded = verifyToken(token) as { userId: string };
    const userId = decoded.userId;

    await dbConnect();

    // fetch user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // check type & add
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
