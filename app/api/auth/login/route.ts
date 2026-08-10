import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

import dbConnect from "@/lib/dbConnect";
import { comparePassword, generateToken } from "@/lib/utils/auth";
import User from "@/lib/models/Users";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { email, password } = await request.json();
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

    cookies().set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    const response = NextResponse.json(
      { success: true, data: { id: user._id, email: user.email } },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Login failed: ${(error as Error).message}`,
      },
      { status: 500 }
    );
  }
}
