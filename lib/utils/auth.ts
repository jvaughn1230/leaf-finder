import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

// Hash the password
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

// Compare password
export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT
export function generateToken(userId: string) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
}

// Verify JWT
export function verifyToken(token: string) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  return jwt.verify(token, JWT_SECRET);
}

//Get Token

export function getTokenFromCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    throw new Error("Authorization failed");
  }

  return token;
}
