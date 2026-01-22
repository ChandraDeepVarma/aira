import connectDB from "@/lib/mongodb";
import Admin from "@/models/admincredentials";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const res = NextResponse.json({ message: "Login success" });

    res.cookies.set("admin-token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // ✅ works locally
    });

    return res;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
