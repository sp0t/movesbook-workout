import { NextResponse } from "next/server";
import { fetchSignupMetadata } from "@/lib/auth/signupMetadata";

export async function GET() {
  try {
    const metadata = await fetchSignupMetadata();
    return NextResponse.json(metadata, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Unable to load Movesbook signup metadata:", error);
    return NextResponse.json({ message: "Unable to fetch signup metadata" }, { status: 502 });
  }
}

