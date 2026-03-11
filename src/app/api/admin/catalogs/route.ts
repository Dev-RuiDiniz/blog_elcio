import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const [catalogs, total] = await Promise.all([
      prisma.catalog.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.catalog.count(),
    ]);

    return NextResponse.json({
      catalogs,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar catálogos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const catalog = await prisma.catalog.create({
      data: {
        name: data.name,
        description: data.description,
        file: data.file,
        thumbnail: data.thumbnail,
      },
    });
    return NextResponse.json({ success: true, catalog });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar catálogo" }, { status: 500 });
  }
}
