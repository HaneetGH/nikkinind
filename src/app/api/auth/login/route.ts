import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  if (!process.env.NIKKININD_STUDIO_PASSWORD || !process.env.NIKKININD_SESSION_SECRET) {
    return NextResponse.json(
      { error: "Studio is not configured. Set NIKKININD_STUDIO_PASSWORD and NIKKININD_SESSION_SECRET." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    password?: string;
  } | null;

  if (!body?.password || !verifyPassword(body.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 14 * 24 * 60 * 60,
  });
  return response;
}
