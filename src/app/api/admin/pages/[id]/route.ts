import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        blocks: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Página não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json({ error: "Erro ao buscar página" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, slug, title, description, published, blocks, metaTitle, metaDescription, metaKeywords, ogImage } = body;

    const existingPage = await prisma.page.findUnique({ where: { id } });
    if (!existingPage) {
      return NextResponse.json({ error: "Página não encontrada" }, { status: 404 });
    }

    if (slug && slug !== existingPage.slug) {
      const slugExists = await prisma.page.findFirst({
        where: { slug, id: { not: id } },
      });
      if (slugExists) {
        return NextResponse.json({ error: "Já existe uma página com este slug" }, { status: 400 });
      }
    }

    // Update page and blocks in a transaction
    const page = await prisma.$transaction(async (tx) => {
      // Update page
      const updatedPage = await tx.page.update({
        where: { id },
        data: {
          name: name ?? existingPage.name,
          slug: slug ?? existingPage.slug,
          title: title !== undefined ? title : existingPage.title,
          description: description !== undefined ? description : existingPage.description,
          published: published !== undefined ? published : existingPage.published,
          metaTitle: metaTitle !== undefined ? metaTitle : existingPage.metaTitle,
          metaDescription: metaDescription !== undefined ? metaDescription : existingPage.metaDescription,
          metaKeywords: metaKeywords !== undefined ? metaKeywords : existingPage.metaKeywords,
          ogImage: ogImage !== undefined ? ogImage : existingPage.ogImage,
        },
      });

      // Update blocks if provided
      if (blocks && Array.isArray(blocks)) {
        // Delete existing blocks
        await tx.pageBlock.deleteMany({ where: { pageId: id } });

        // Create new blocks
        if (blocks.length > 0) {
          await tx.pageBlock.createMany({
            data: blocks.map((block: { type: string; content: object; order: number; active?: boolean }, index: number) => ({
              pageId: id,
              type: block.type,
              content: block.content,
              order: block.order ?? index,
              active: block.active ?? true,
            })),
          });
        }
      }

      return updatedPage;
    });

    // Fetch updated page with blocks
    const updatedPageWithBlocks = await prisma.page.findUnique({
      where: { id },
      include: {
        blocks: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json({ page: updatedPageWithBlocks });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json({ error: "Erro ao atualizar página" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const page = await prisma.page.findUnique({ where: { id } });
    if (!page) {
      return NextResponse.json({ error: "Página não encontrada" }, { status: 404 });
    }

    if (page.isSystem) {
      return NextResponse.json({ error: "Páginas do sistema não podem ser excluídas" }, { status: 400 });
    }

    await prisma.page.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json({ error: "Erro ao excluir página" }, { status: 500 });
  }
}
