import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const banner = await prisma.banner.findUnique({ where: { id } });
    if (!banner) {
      return NextResponse.json({ error: "Banner não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ banner });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar banner" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const banner = await prisma.banner.update({
      where: { id },
      data: {
        badge: data.badge,
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
        image: data.image,
        video: data.video,
        button1Text: data.button1Text,
        button1Link: data.button1Link,
        button1Color: data.button1Color,
        button1Rounded: data.button1Rounded,
        button2Text: data.button2Text,
        button2Link: data.button2Link,
        button2Color: data.button2Color,
        button2Rounded: data.button2Rounded,
        order: data.order,
        active: data.active,
      },
    });
    return NextResponse.json({ success: true, banner });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar banner" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.banner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar banner" }, { status: 500 });
  }
}
