import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

type SeoKey = "shr" | "maletti" | "tricologia" | "spa" | "salao";

interface SeoSiteConfig {
  title?: string;
  description?: string;
  favicon?: string;
  keywords?: string;
}

const defaults: Record<SeoKey, SeoSiteConfig> = {
  shr: {
    title: "SHR | Distribuidor Exclusivo Maletti no Brasil",
    description: "Somos o único distribuidor exclusivo da Maletti no Brasil. Conheça nossa linha completa de lavatórios, cadeiras e mobiliário para salões de beleza e spas.",
    favicon: "/shr-favicon.png",
    keywords: "Maletti, SHR, lavatórios, salão de beleza, mobiliário, Heaven, Shirobody, Total Body, Spa Garçon, Vapomist",
  },
  maletti: {
    title: "Maletti | Design Italiano de Luxo para Salões",
    description: "Transforme espaços, eleve experiências. As estações Maletti Head SPA unem o design italiano a tecnologia inovadora para redefinir o luxo em seu salão.",
    favicon: "/malleti-fav.png",
    keywords: "Maletti, design italiano, Head SPA, salão de luxo",
  },
  tricologia: {
    title: "Tricologia | Tecnologia Maletti para Clínicas Premium",
    description: "A união do Design Italiano com a Tecnologia Coreana: A revolução no tratamento capilar chegou à sua clínica. Conheça o ecossistema de equipamentos Maletti.",
    favicon: "/malleti-fav.png",
    keywords: "tricologia, tratamento capilar, Maletti, Heaven, Shirobody, Total Body, Spa Garçon, Vapomist, wellness, clínica de estética",
  },
  spa: {
    title: "SPA Profissional | Equipamentos Maletti para Wellness",
    description: "Transforme seu espaço em um SPA de alto padrão com equipamentos Maletti. Design italiano, tecnologia de ponta e experiências sensoriais únicas para seus clientes.",
    favicon: "/malleti-fav.png",
    keywords: "spa profissional, head spa, Maletti, Heaven, Shirobody, Total Body, Spa Garçon, wellness, spa cabin",
  },
  salao: {
    title: "Salão de Beleza Premium | Equipamentos Maletti para Head SPA",
    description: "O Padrão Ouro do Head SPA: Design Italiano e Tecnologia de Wellness. Crie rituais sensoriais únicos que encantam seus clientes e justificam seu alto valor.",
    favicon: "/malleti-fav.png",
    keywords: "salão de beleza, head spa, Maletti, Heaven, Shirobody, Total Body, equipamentos salão, mobiliário salão de luxo",
  },
};

export async function getSeoConfig(key: SeoKey): Promise<SeoSiteConfig> {
  try {
    const settings = await prisma.siteSettings.findFirst() as Record<string, unknown> | null;
    const seoConfig = settings?.seoConfig as Record<string, SeoSiteConfig> | null;
    if (seoConfig && seoConfig[key]) {
      return { ...defaults[key], ...seoConfig[key] };
    }
  } catch {
    // fallback to defaults
  }
  return defaults[key];
}

export async function buildMetadata(key: SeoKey): Promise<Metadata> {
  const seo = await getSeoConfig(key);
  const keywords = seo.keywords ? seo.keywords.split(",").map((k) => k.trim()) : [];
  return {
    title: seo.title,
    description: seo.description,
    keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "pt_BR",
    },
  };
}

export async function getFaviconUrl(key: SeoKey): Promise<string> {
  const seo = await getSeoConfig(key);
  return seo.favicon || defaults[key].favicon || "/favicon.ico";
}
