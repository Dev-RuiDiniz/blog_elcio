import { prisma } from "@/lib/prisma";

interface PageBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
  active: boolean;
}

export async function getPageData(slug: string): Promise<PageBlock[]> {
  try {
    const page = await prisma.page.findFirst({
      where: { slug },
      include: {
        blocks: {
          where: { active: true },
          orderBy: { order: "asc" },
        },
      },
    });
    return (page?.blocks || []) as PageBlock[];
  } catch {
    return [];
  }
}
