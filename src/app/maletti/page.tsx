import { prisma } from "@/lib/prisma";
import {
  MalettiHeader,
  MalettiHero,
  MalettiEssencia,
  MalettiBrasil,
  MalettiHeadSpa,
  MalettiDesign,
  MalettiCatalogo,
  MalettiFooter,
} from "@/components/maletti";

interface PageBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
  active: boolean;
}

async function getPageBlocks(): Promise<PageBlock[]> {
  try {
    const page = await prisma.page.findFirst({
      where: { slug: "maletti" },
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

export default async function MalettiPage() {
  const blocks = await getPageBlocks();
  
  const getBlockContent = (type: string) => blocks.find(b => b.type === type)?.content || {};

  return (
    <div className="maletti-page">
      <MalettiHeader />
      <MalettiHero content={getBlockContent("maletti-hero")} />
      <MalettiEssencia content={getBlockContent("maletti-essencia")} />
      <MalettiBrasil content={getBlockContent("maletti-brasil")} />
      <MalettiHeadSpa content={getBlockContent("maletti-headspa")} />
      <MalettiDesign content={getBlockContent("maletti-design")} />
      <MalettiCatalogo content={getBlockContent("maletti-catalogo")} />
      <MalettiFooter />
    </div>
  );
}
