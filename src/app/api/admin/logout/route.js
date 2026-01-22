import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  res.cookies.set("admin-token", "", {
    httpOnly: true,
    path: "/", // MUST match login cookie path
    expires: new Date(0), // force delete
  });

  return res;
}
