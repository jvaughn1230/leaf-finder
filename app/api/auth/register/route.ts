import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/Users";
import { hashPassword, generateToken } from "@/lib/utils/auth";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();

    // check if user exists already
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email aready in use" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await hashPassword(body.password);

    // create user
    const user = await User.create({ ...body, password: hashedPassword });

    const token = generateToken(user._id.toString());

    const response = NextResponse.json(
      {
        success: true,
        data: { id: user._id, email: user.email, name: user.name },
      },
      { status: 201 }
    );

    response.cookies.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, //1 hour
    });

    return response;
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
