import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const [partners, total] = await Promise.all([
      prisma.partner.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.partner.count(),
    ]);

    return NextResponse.json({
      partners,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar parceiros" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const partner = await prisma.partner.create({
      data: {
        name: data.name,
        logo: data.logo,
        website: data.website,
        description: data.description,
      },
    });
    return NextResponse.json({ success: true, partner });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar parceiro" }, { status: 500 });
  }
}
