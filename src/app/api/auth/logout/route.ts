import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  IS_PRODUCTION,
  MOVESBOOK_BASE_URL,
  MOVESBOOK_SESSION_COOKIE,
  MOVESBOOK_REMOTE_SESSION_COOKIE,
} from "@/lib/auth/constants";

const MOVESBOOK_LOGOUT_ENDPOINT = `${MOVESBOOK_BASE_URL}/users/logout`;

export async function POST() {
  const cookieStore = await cookies();
  const response = NextResponse.json({ ok: true });
  const sessionCookie = cookieStore.get(MOVESBOOK_SESSION_COOKIE);

  if (sessionCookie) {
    try {
      await fetch(MOVESBOOK_LOGOUT_ENDPOINT, {
        method: "GET",
        headers: {
          cookie: `${MOVESBOOK_REMOTE_SESSION_COOKIE}=${sessionCookie.value}`,
        },
        redirect: "manual",
      });
    } catch (error) {
      console.warn("Movesbook logout request failed:", error);
    }
  }

  response.cookies.set({
    name: MOVESBOOK_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: IS_PRODUCTION,
    path: "/",
    maxAge: 0,
  });

  return response;
}

