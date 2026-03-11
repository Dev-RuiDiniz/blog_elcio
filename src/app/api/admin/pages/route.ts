import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const pages = await prisma.page.findMany({
      include: {
        _count: {
          select: { blocks: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ pages });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ error: "Erro ao buscar páginas" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, title, description } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Nome e slug são obrigatórios" }, { status: 400 });
    }

    const existingPage = await prisma.page.findUnique({ where: { slug } });
    if (existingPage) {
      return NextResponse.json({ error: "Já existe uma página com este slug" }, { status: 400 });
    }

    const page = await prisma.page.create({
      data: {
        name,
        slug,
        title,
        description,
      },
    });

    return NextResponse.json({ page });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json({ error: "Erro ao criar página" }, { status: 500 });
  }
}
