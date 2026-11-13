import { NextResponse } from "next/server";
import { isStudioAuthenticated } from "@/lib/auth";
import {
  deleteDesign,
  deleteUpdate,
  getContent,
  upsertDesign,
  upsertUpdate,
} from "@/lib/store";
import type { DesignInput, UpdateInput } from "@/lib/types";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  if (!(await isStudioAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    type?: "design" | "update";
    payload?: DesignInput | UpdateInput;
  } | null;

  if (!body?.type || !body.payload) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    if (body.type === "design") {
      const design = await upsertDesign(body.payload as DesignInput);
      return NextResponse.json({ design });
    }
    const update = await upsertUpdate(body.payload as UpdateInput);
    return NextResponse.json({ update });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Save failed" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isStudioAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json({ error: "Missing type or id" }, { status: 400 });
  }

  try {
    if (type === "design") await deleteDesign(id);
    else if (type === "update") await deleteUpdate(id);
    else {
      return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 400 },
    );
  }
}
