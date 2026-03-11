import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const [posts, total, categories, tags] = await Promise.all([
      prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
          comments: true,
        },
      }),
      prisma.blogPost.count(),
      prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
      prisma.blogTag.findMany({ orderBy: { name: "asc" } }),
    ]);

    return NextResponse.json({
      posts,
      categories,
      tags,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Erro ao buscar posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image,
        cover: data.cover,
        published: data.published || false,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || null,
        ogImage: data.ogImage || null,
        publishedAt: data.published ? new Date() : null,
        categories: data.categoryIds?.length ? {
          create: data.categoryIds.map((categoryId: string) => ({ categoryId })),
        } : undefined,
        tags: data.tagIds?.length ? {
          create: data.tagIds.map((tagId: string) => ({ tagId })),
        } : undefined,
      },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });
    
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Erro ao criar post" }, { status: 500 });
  }
}
