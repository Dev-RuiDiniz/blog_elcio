import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await prisma.blogPost.findUnique({
      where: { slug, published: true },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        comments: {
          where: { approved: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
    }

    // Increment views
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    // Get related posts from same categories
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        id: { not: post.id },
        categories: {
          some: {
            categoryId: { in: post.categories.map((c) => c.categoryId) },
          },
        },
      },
      take: 3,
      orderBy: { publishedAt: "desc" },
      include: {
        categories: { include: { category: true } },
      },
    });

    return NextResponse.json({ post, relatedPosts });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Erro ao buscar post" }, { status: 500 });
  }
}

// Add comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await request.json();

    const post = await prisma.blogPost.findUnique({
      where: { slug, published: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
    }

    const comment = await prisma.blogComment.create({
      data: {
        name: data.name,
        email: data.email,
        content: data.content,
        postId: post.id,
        approved: false, // Comments need approval
      },
    });

    return NextResponse.json({
      success: true,
      message: "Comentário enviado! Aguardando aprovação.",
      comment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Erro ao criar comentário" }, { status: 500 });
  }
}
