import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
console.log("here: ", JWT_SECRET);

if (!JWT_SECRET) {
  console.log("Missing");
  throw new Error("JWT_SECRET  is not defined");
}

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

// Get Token From Cookie

export function getTokenFromCookies() {
  const token = cookies().get("jwt")?.value;
  return token;
}
// verify auth for front end
export const verifyAuth = async (): Promise<boolean> => {
  try {
    const response = await fetch("/api/auth/status");
    const data = await response.json();
    return data.loggedIn;
  } catch (error) {
    console.error("Error checking auth status:", error);
    return false;
  }
};
