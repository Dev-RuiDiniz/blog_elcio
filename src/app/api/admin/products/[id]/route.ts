import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        categories: { include: { category: true } },
        brands: { include: { brand: true } },
        specifications: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Remove existing relations
    await prisma.productBrand.deleteMany({ where: { productId: id } });
    await prisma.productCategory.deleteMany({ where: { productId: id } });
    await prisma.specification.deleteMany({ where: { productId: id } });

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        shortDescription: data.shortDescription,
        description: data.description,
        features: data.features || [],
        image: data.image,
        gallery: data.gallery || [],
        catalog: data.catalog || null,
        warranty: data.warranty || null,
        video: data.video,
        featured: data.featured || false,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || null,
        ogImage: data.ogImage || null,
        active: data.active ?? true,
        categoryId: data.categoryIds?.[0] || null,
        categories: data.categoryIds?.length
          ? {
              create: data.categoryIds.map((categoryId: string) => ({ categoryId })),
            }
          : undefined,
        brands: data.brandIds?.length
          ? {
              create: data.brandIds.map((brandId: string) => ({ brandId })),
            }
          : undefined,
        specifications: data.specifications?.length
          ? {
              create: data.specifications.map((spec: { label: string; value: string }) => ({
                label: spec.label,
                value: spec.value,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        categories: { include: { category: true } },
        brands: { include: { brand: true } },
        specifications: true,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Erro ao deletar produto" }, { status: 500 });
  }
}
