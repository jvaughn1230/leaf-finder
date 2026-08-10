import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/Users";
import { hashPassword, generateToken } from "@/lib/utils/auth";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { email, password, name } = await request.json();

    // field validations
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // check if user exists already
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email aready in use" },
        { status: 409 }
      );
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user
    const user = await User.create({ email, name, password: hashedPassword });

    const token = generateToken(user._id.toString());

    cookies().set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, //1 hour
    });

    return NextResponse.json(
      {
        success: true,
        data: { id: user._id, email: user.email, name: user.name },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to add user:  ${(error as Error).message}`,
      },
      { status: 400 }
    );
  }
}
