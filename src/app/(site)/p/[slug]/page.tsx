import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { COMPANY_OPTIONS, buildContactHref, getCompanyBySlug } from "@/lib/lead-context";
import { getCompanyPageDetail } from "@/data/companyDetails";

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
  const detail = getCompanyPageDetail(company.slug);

  const contatoLink = buildContactHref({
    assunto: "consultoria-catalogo",
    empresa: company.slug,
    origem: company.ctaSource,
  });

  const overviewParagraphs = detail?.overviewParagraphs || [company.teaser];
  const sectors = detail?.sectors || [
    "Aplicações industriais",
    "Suporte comercial consultivo",
    "Encaminhamento técnico e comercial",
  ];
  const differentiators = detail?.differentiators || [
    "Atendimento consultivo",
    "Catálogo técnico sob demanda",
    "Apoio no primeiro contato comercial",
  ];
  const products = detail?.products || [
    {
      title: "Catálogo técnico",
      description: `Conheça a linha de soluções da ${company.name} no material técnico disponível para consulta.`,
    },
    {
      title: "Soluções por aplicação",
      description: "Apoio para entender quais produtos fazem mais sentido para a sua operação.",
    },
    {
      title: "Suporte comercial inicial",
      description: "Encaminhamento com mais contexto para cotação, dúvidas e próximos passos.",
    },
  ];
  const services = detail?.services || [
    {
      title: "Leitura de cenário",
      description: "Apoio para traduzir a demanda e definir o melhor caminho comercial.",
    },
    {
      title: "Encaminhamento orientado",
      description: "Primeiro atendimento com mais clareza técnica e comercial.",
    },
    {
      title: "Acesso a portfólio",
      description: "Abertura do contato com suporte ao catálogo e à especificação inicial.",
    },
  ];
  const overviewHtml = [
    ...overviewParagraphs.map((paragraph) => `<p>${paragraph}</p>`),
    `<p><strong>Setores e aplicações:</strong> ${sectors.join(", ")}.</p>`,
    `<p><strong>Diferenciais:</strong> ${differentiators.join("; ")}.</p>`,
  ].join("\n\n");

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
          detail?.heroDescription ||
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
        subtitle: "Sobre a Empresa",
        title: detail?.overviewTitle || `Por que ${company.name}?`,
        content: overviewHtml,
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
        subtitle: "Principais Produtos",
        title: `O que a ${company.name} entrega`,
        columns: products.length >= 4 ? 4 : 3,
        items: products.map((item) => ({
          icon: "star",
          title: item.title,
          description: item.description,
        })),
      },
    },
    {
      id: `fallback-services-${company.slug}`,
      type: "features",
      order: 3,
      active: true,
      content: {
        subtitle: "Serviços e Suporte",
        title: "Como essa empresa apoia a operação",
        columns: services.length >= 4 ? 4 : 3,
        items: services.map((item) => ({
          icon: "star",
          title: item.title,
          description: item.description,
        })),
      },
    },
    {
      id: `fallback-cards-${company.slug}`,
      type: "cards",
      order: 4,
      active: true,
      content: {
        subtitle: "Apoio Comercial",
        title: "Setores, diferenciais e próximos passos",
        columns: 3,
        cards: [
          {
            image: company.coverPublicPath,
            title: "Catálogo técnico",
            description: `Baixe o catálogo ${company.fileName} para consultar linhas, aplicações e escopo técnico.`,
            link: company.pdfPublicPath,
          },
          {
            image: company.logoPublicPath,
            title: "Diferenciais comerciais",
            description: differentiators.join("; "),
            link: contatoLink,
          },
          {
            image: company.coverPublicPath,
            title: "Setores e aplicações",
            description: sectors.join(", "),
            link: "/marcas",
          },
        ],
      },
    },
    {
      id: `fallback-cta-${company.slug}`,
      type: "cta",
      order: 5,
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
    metaDescription:
      detail?.seoDescription ||
      `${company.teaser} Solicite consultoria comercial e catálogo técnico com o Elcio.`,
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
