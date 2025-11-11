export const MOVESBOOK_BASE_URL = process.env.MOVESBOOK_BASE_URL ?? "https://movesbook.net";

export const MOVESBOOK_SESSION_COOKIE = "movesbook_session";
export const MOVESBOOK_REMOTE_SESSION_COOKIE = "PHPSESSID";

export const MOVESBOOK_SESSION_MAX_AGE = 60 * 60 * 4; // 4 hours
export const IS_PRODUCTION = process.env.NODE_ENV === "production";

type MaybeSetCookieHeader = string | string[] | undefined | null;

export function extractRemoteSessionId(header: MaybeSetCookieHeader) {
  if (!header) {
    return null;
  }

  const headerValues = Array.isArray(header) ? header : [header];

  for (const value of headerValues) {
    const match = value.match(new RegExp(`${MOVESBOOK_REMOTE_SESSION_COOKIE}=([^;]+)`));
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

