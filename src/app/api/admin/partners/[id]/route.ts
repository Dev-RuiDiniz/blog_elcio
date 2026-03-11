import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name: data.name,
        logo: data.logo,
        website: data.website,
        description: data.description,
        active: data.active,
      },
    });
    return NextResponse.json({ success: true, partner });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar parceiro" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.partner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar parceiro" }, { status: 500 });
  }
}
