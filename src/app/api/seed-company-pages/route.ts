import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { COMPANY_OPTIONS, buildContactHref } from "@/lib/lead-context";

interface SeedBlock {
  type: string;
  order: number;
  active: boolean;
  content: Record<string, unknown>;
}

function getCompanyBlocks(company: (typeof COMPANY_OPTIONS)[number]): SeedBlock[] {
  const contatoLink = buildContactHref({
    assunto: "consultoria-catalogo",
    empresa: company.slug,
    origem: company.ctaSource,
  });
  const catalogoLink = company.pdfPublicPath;

  return [
    {
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
        button2Link: catalogoLink,
        overlay: 58,
        align: "left",
      },
    },
    {
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
            link: catalogoLink,
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
}

export async function GET() {
  try {
    const results = [];

    const companies = [...COMPANY_OPTIONS].sort((a, b) => a.order - b.order);

    for (const company of companies) {
      const page = await prisma.page.upsert({
        where: { slug: company.slug },
        update: {
          name: company.name,
          title: `${company.name} | Representação Comercial Elcio`,
          description: company.teaser,
          published: true,
          metaTitle: `${company.name} | Consultoria + Catálogo`,
          metaDescription: `${company.teaser} Solicite consultoria comercial e catálogo técnico com o Elcio.`,
          ogImage: company.coverPublicPath,
        },
        create: {
          name: company.name,
          slug: company.slug,
          title: `${company.name} | Representação Comercial Elcio`,
          description: company.teaser,
          published: true,
          metaTitle: `${company.name} | Consultoria + Catálogo`,
          metaDescription: `${company.teaser} Solicite consultoria comercial e catálogo técnico com o Elcio.`,
          ogImage: company.coverPublicPath,
        },
      });

      await prisma.pageBlock.deleteMany({ where: { pageId: page.id } });

      const blocks = getCompanyBlocks(company);
      if (blocks.length > 0) {
        await prisma.pageBlock.createMany({
          data: blocks.map((block) => ({
            pageId: page.id,
            type: block.type,
            content: block.content as Prisma.InputJsonValue,
            order: block.order,
            active: block.active,
          })),
        });
      }

      results.push({
        slug: company.slug,
        pageId: page.id,
        blocksCreated: blocks.length,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Páginas das 6 empresas criadas/atualizadas com sucesso.",
      companies: results,
    });
  } catch (error) {
    console.error("seed-company-pages error:", error);
    return NextResponse.json(
      { error: "Erro ao criar páginas das empresas" },
      { status: 500 }
    );
  }
}
