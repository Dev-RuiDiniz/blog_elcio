import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/admin/layout?type=header&variant=shr
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const variant = searchParams.get("variant");

    if (!type) {
      // Retorna todos os configs de um tipo
      const configs = await prisma.layoutConfig.findMany({
        where: variant ? { type: type || undefined, variant } : {},
        orderBy: { variant: "asc" },
      });
      return NextResponse.json({ configs });
    }

    if (variant) {
      // Retorna config específico
      const config = await prisma.layoutConfig.findUnique({
        where: { type_variant: { type, variant } },
      });
      return NextResponse.json({ config });
    }

    // Retorna todos do tipo
    const configs = await prisma.layoutConfig.findMany({
      where: { type },
      orderBy: { variant: "asc" },
    });
    return NextResponse.json({ configs });
  } catch (error) {
    console.error("Error fetching layout config:", error);
    return NextResponse.json({ error: "Erro ao buscar configuração" }, { status: 500 });
  }
}

// PUT /api/admin/layout
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { type, variant, content } = body;

    if (!type || !variant || !content) {
      return NextResponse.json({ error: "Campos type, variant e content são obrigatórios" }, { status: 400 });
    }

    const config = await prisma.layoutConfig.upsert({
      where: { type_variant: { type, variant } },
      update: { content },
      create: { type, variant, content },
    });

    return NextResponse.json({ config });
  } catch (error) {
    console.error("Error saving layout config:", error);
    return NextResponse.json({ error: "Erro ao salvar configuração" }, { status: 500 });
  }
}
