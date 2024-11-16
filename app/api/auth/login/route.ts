import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { comparePassword } from "@/lib/utils/auth";
import { generateToken } from "@/lib/utils/auth";
import User from "@/lib/models/Users";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken(user._id);

    const response = NextResponse.json(
      { success: true, data: { id: user._id, email: user.email } },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Login failed: ${(error as Error).message}`,
      },
      { status: 500 }
    );
  }
}
