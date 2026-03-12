import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-auth";

export async function GET() {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const scripts = await prisma.script.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ scripts });
  } catch (error) {
    console.error("Error fetching scripts:", error);
    return NextResponse.json({ error: "Erro ao buscar scripts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const data = await request.json();

    const script = await prisma.script.create({
      data: {
        name: data.name,
        type: data.type || "CUSTOM",
        position: data.position || "HEAD",
        code: data.code,
        active: data.active ?? true,
        site: data.site || "BOTH",
        order: data.order || 0,
      },
    });

    return NextResponse.json({ success: true, script });
  } catch (error) {
    console.error("Error creating script:", error);
    return NextResponse.json({ error: "Erro ao criar script" }, { status: 500 });
  }
}


