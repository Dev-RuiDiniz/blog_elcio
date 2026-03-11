import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET público /api/layout?type=header&variant=shr
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const variant = searchParams.get("variant");

    if (!type || !variant) {
      return NextResponse.json({ error: "type e variant são obrigatórios" }, { status: 400 });
    }

    const config = await prisma.layoutConfig.findUnique({
      where: { type_variant: { type, variant } },
    });

    return NextResponse.json({ config });
  } catch (error) {
    console.error("Error fetching layout:", error);
    return NextResponse.json({ error: "Erro ao buscar layout" }, { status: 500 });
  }
}
