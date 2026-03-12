import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

interface PageBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
  active: boolean;
}

interface DynamicPageData {
  id: string;
  name: string;
  slug: string;
  title: string | null;
  description: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImage: string | null;
  published: boolean;
  blocks: PageBlock[];
}

async function getPageBySlug(slug: string): Promise<DynamicPageData | null> {
  try {
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        blocks: {
          where: { active: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!page || !page.published) return null;
    return page as DynamicPageData;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: "Página não encontrada",
      description: "A página solicitada não foi encontrada.",
    };
  }

  const title = page.metaTitle || page.title || page.name;
  const description = page.metaDescription || page.description || `Conheça ${page.name}.`;
  const keywords = page.metaKeywords
    ? page.metaKeywords.split(",").map((item) => item.trim()).filter(Boolean)
    : undefined;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      images: page.ogImage ? [{ url: page.ogImage }] : undefined,
    },
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <BlockRenderer blocks={page.blocks} />;
}
