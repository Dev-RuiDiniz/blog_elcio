import { prisma } from "@/lib/prisma";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import {
  Hero,
  FeaturedProducts,
  WhyChooseUs,
  MalettiPartnership,
  CatalogCTA,
  MaintenancePreview,
} from "@/components/sections";

async function getHomeBlocks() {
  try {
    const page = await prisma.page.findFirst({
      where: {
        OR: [
          { id: "page-home" },
          { slug: "home" },
        ],
      },
      include: {
        blocks: {
          where: { active: true },
          orderBy: { order: "asc" },
        },
      },
    });
    return page?.blocks || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const blocks = await getHomeBlocks();

  // Se houver blocos dinâmicos, usa o BlockRenderer
  if (blocks.length > 0) {
    return <BlockRenderer blocks={blocks} />;
  }

  // Fallback para componentes estáticos
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <MalettiPartnership />
      <MaintenancePreview />
      <CatalogCTA />
    </>
  );
}
