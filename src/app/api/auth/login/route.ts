import { NextRequest, NextResponse } from "next/server";
import {
  IS_PRODUCTION,
  MOVESBOOK_BASE_URL,
  MOVESBOOK_SESSION_COOKIE,
  MOVESBOOK_SESSION_MAX_AGE,
  extractRemoteSessionId,
} from "@/lib/auth/constants";

type LoginPayload = {
  username?: string;
  password?: string;
};

const MOVESBOOK_LOGIN_ENDPOINT = `${MOVESBOOK_BASE_URL}/users/login`;

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as LoginPayload;
  const username = body.username?.trim();
  const password = body.password?.trim();

  if (!username || !password) {
    return NextResponse.json({ message: "Missing credentials." }, { status: 400 });
  }

  const form = new URLSearchParams();
  form.append("data[User][username]", username);
  form.append("data[User][password]", password);

  let upstreamResponse: Response;

  try {
    upstreamResponse = await fetch(MOVESBOOK_LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
      redirect: "manual",
    });
  } catch (error) {
    console.error("Movesbook login failed:", error);
    return NextResponse.json({ message: "Unable to reach Movesbook login." }, { status: 502 });
  }

  const setCookieHeader =
    (upstreamResponse.headers as unknown as { getSetCookie?: () => string[] }).getSetCookie?.() ??
    upstreamResponse.headers.get("set-cookie");
  const remoteSession = extractRemoteSessionId(setCookieHeader);

  if (!remoteSession) {
    const status = upstreamResponse.status;
    const message = status === 302 ? "Unexpected login response." : "Invalid username or password.";
    return NextResponse.json({ message }, { status: status === 302 ? 500 : 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: MOVESBOOK_SESSION_COOKIE,
    value: remoteSession,
    httpOnly: true,
    sameSite: "lax",
    secure: IS_PRODUCTION,
    path: "/",
    maxAge: MOVESBOOK_SESSION_MAX_AGE,
  });

  return response;
}

