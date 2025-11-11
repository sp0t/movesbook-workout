import { NextRequest, NextResponse } from "next/server";
import { MOVESBOOK_SESSION_COOKIE } from "@/lib/auth/constants";

function requiresAuth(pathname: string) {
  return pathname.startsWith("/app");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(MOVESBOOK_SESSION_COOKIE);
  const isAuthenticated = Boolean(sessionCookie);

  if (!isAuthenticated && requiresAuth(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated) {
    if (pathname === "/login") {
      const destination = request.nextUrl.clone();
      destination.pathname = "/app/my-page";
      destination.search = "";
      return NextResponse.redirect(destination);
    }

    if (pathname === "/") {
      const destination = request.nextUrl.clone();
      destination.pathname = "/app/my-page";
      destination.search = "";
      return NextResponse.redirect(destination);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/app/:path*"],
};


