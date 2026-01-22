import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("admin-token")?.value;
  const path = req.nextUrl.pathname;

  // Block admin pages if no token
  if (!token && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Prevent logged-in users from visiting login
  if (token && path === "/auth/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};
