import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sections = await prisma.homeSection.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ sections });
  } catch (error) {
    console.error("Error fetching home sections:", error);
    return NextResponse.json({ error: "Erro ao buscar seções" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const section = await prisma.homeSection.upsert({
      where: { sectionId: data.sectionId },
      update: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        content: data.content,
        image: data.image,
        active: data.active ?? true,
        order: data.order ?? 0,
      },
      create: {
        sectionId: data.sectionId,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        content: data.content,
        image: data.image,
        active: data.active ?? true,
        order: data.order ?? 0,
      },
    });

    return NextResponse.json({ success: true, section });
  } catch (error) {
    console.error("Error saving home section:", error);
    return NextResponse.json({ error: "Erro ao salvar seção" }, { status: 500 });
  }
}
