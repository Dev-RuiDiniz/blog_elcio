import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ banners });
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json({ error: "Erro ao buscar banners" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const banner = await prisma.banner.create({
      data: {
        badge: data.badge,
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
        image: data.image,
        video: data.video,
        button1Text: data.button1Text,
        button1Link: data.button1Link,
        button1Color: data.button1Color || "white",
        button1Rounded: data.button1Rounded || false,
        button2Text: data.button2Text,
        button2Link: data.button2Link,
        button2Color: data.button2Color || "outline",
        button2Rounded: data.button2Rounded || false,
        order: data.order || 0,
        active: data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, banner });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json({ error: "Erro ao criar banner" }, { status: 500 });
  }
}
