import { NextResponse } from "next/server";
import { isStudioAuthenticated } from "@/lib/auth";

export async function GET() {
  const authenticated = await isStudioAuthenticated();
  return NextResponse.json({ authenticated });
}
