import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const site = searchParams.get("site") || "SHR";
    const position = searchParams.get("position");

    const where: any = {
      active: true,
      OR: [
        { site: "BOTH" },
        { site: site.toUpperCase() },
      ],
    };

    if (position) {
      where.position = position.toUpperCase();
    }

    const scripts = await prisma.script.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        name: true,
        type: true,
        position: true,
        code: true,
      },
    });

    return NextResponse.json({ scripts });
  } catch (error) {
    console.error("Error fetching scripts:", error);
    return NextResponse.json({ scripts: [] });
  }
}
