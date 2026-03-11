import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const catalog = await prisma.catalog.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        file: data.file,
        thumbnail: data.thumbnail,
        active: data.active,
      },
    });
    return NextResponse.json({ success: true, catalog });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar catálogo" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.catalog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar catálogo" }, { status: 500 });
  }
}
