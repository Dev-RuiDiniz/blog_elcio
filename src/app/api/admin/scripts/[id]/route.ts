import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const script = await prisma.script.findUnique({
      where: { id },
    });

    if (!script) {
      return NextResponse.json({ error: "Script não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ script });
  } catch (error) {
    console.error("Error fetching script:", error);
    return NextResponse.json({ error: "Erro ao buscar script" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const script = await prisma.script.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        position: data.position,
        code: data.code,
        active: data.active,
        site: data.site,
        order: data.order,
      },
    });

    return NextResponse.json({ success: true, script });
  } catch (error) {
    console.error("Error updating script:", error);
    return NextResponse.json({ error: "Erro ao atualizar script" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.script.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting script:", error);
    return NextResponse.json({ error: "Erro ao deletar script" }, { status: 500 });
  }
}
