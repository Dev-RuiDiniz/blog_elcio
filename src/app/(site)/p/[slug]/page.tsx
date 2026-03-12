import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { COMPANY_OPTIONS, buildContactHref, getCompanyBySlug } from "@/lib/lead-context";

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

function getFallbackCompanyPage(slug: string): DynamicPageData | null {
  const company = getCompanyBySlug(slug);
  if (!company) return null;

  const contatoLink = buildContactHref({
    assunto: "consultoria-catalogo",
    empresa: company.slug,
    origem: company.ctaSource,
  });

  const blocks: PageBlock[] = [
    {
      id: `fallback-hero-${company.slug}`,
      type: "hero",
      order: 0,
      active: true,
      content: {
        badge: "Empresa Representada",
        title: company.name,
        subtitle: "Portfólio Comercial Elcio",
        description:
          "Soluções especializadas apresentadas com suporte comercial consultivo para facilitar especificação, comparação e primeiro contato.",
        image: company.coverPublicPath,
        button1Text: "Quero Consultoria + Catálogo",
        button1Link: contatoLink,
        button2Text: "Baixar Catálogo",
        button2Link: company.pdfPublicPath,
        overlay: 58,
        align: "left",
      },
    },
    {
      id: `fallback-text-${company.slug}`,
      type: "text",
      order: 1,
      active: true,
      content: {
        subtitle: "Proposta de Valor",
        title: `Por que ${company.name}?`,
        content: `${company.teaser}\n\nElcio atua como ponto de contato comercial para acelerar o entendimento técnico, apoiar na pré-venda e direcionar a melhor solução para cada cenário.`,
        align: "left",
        background: "white",
      },
    },
    {
      id: `fallback-features-${company.slug}`,
      type: "features",
      order: 2,
      active: true,
      content: {
        subtitle: "Aplicações",
        title: "Onde essa empresa entrega resultado",
        columns: 3,
        items: [
          {
            icon: "star",
            title: "Aplicação Industrial",
            description: "Suporte para seleção de solução alinhada ao processo e à operação.",
          },
          {
            icon: "star",
            title: "Recomendação Técnica",
            description: "Orientação comercial com foco em viabilidade e ganho de produtividade.",
          },
          {
            icon: "star",
            title: "Primeiro Contato Ágil",
            description: "Atendimento rápido para cotação, dúvidas e encaminhamento de próximos passos.",
          },
        ],
      },
    },
    {
      id: `fallback-cards-${company.slug}`,
      type: "cards",
      order: 3,
      active: true,
      content: {
        subtitle: "Material de Apoio",
        title: "Conteúdos para avaliação",
        columns: 3,
        cards: [
          {
            image: company.coverPublicPath,
            title: "Catálogo da Empresa",
            description: `Material de referência: ${company.fileName}`,
            link: company.pdfPublicPath,
          },
          {
            image: company.logoPublicPath,
            title: "Consultoria Inicial",
            description: "Explique seu contexto e receba indicação comercial orientada.",
            link: contatoLink,
          },
          {
            image: company.coverPublicPath,
            title: "Próximos Passos",
            description: "Conheça também as demais empresas representadas e compare caminhos de atendimento.",
            link: "/marcas",
          },
        ],
      },
    },
    {
      id: `fallback-cta-${company.slug}`,
      type: "cta",
      order: 4,
      active: true,
      content: {
        title: `Falar sobre ${company.name}`,
        description:
          "Inicie o primeiro contato com Elcio para receber catálogo, tirar dúvidas e avançar com consultoria comercial.",
        buttonText: "Solicitar Consultoria + Catálogo",
        buttonLink: contatoLink,
        background: "black",
      },
    },
  ];

  return {
    id: `fallback-page-${company.slug}`,
    name: company.name,
    slug: company.slug,
    title: `${company.name} | Representação Comercial Elcio`,
    description: company.teaser,
    metaTitle: `${company.name} | Consultoria + Catálogo`,
    metaDescription: `${company.teaser} Solicite consultoria comercial e catálogo técnico com o Elcio.`,
    metaKeywords: COMPANY_OPTIONS.map((option) => option.name).join(", "),
    ogImage: company.coverPublicPath,
    published: true,
    blocks,
  };
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

    if (!page || !page.published) {
      return getFallbackCompanyPage(slug);
    }

    return page as DynamicPageData;
  } catch {
    return getFallbackCompanyPage(slug);
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
  const description =
    page.metaDescription ||
    page.description ||
    `Conheça ${page.name} e solicite consultoria comercial com catálogo técnico.`;
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
