import type { Metadata } from "next";

type SeoKey = "elcio";

interface SeoSiteConfig {
  title: string;
  description: string;
  favicon: string;
  keywords: string;
}

const baseConfig: SeoSiteConfig = {
  title: "Elcio Hub B2B | Descubra, compare e acione a empresa industrial certa",
  description:
    "Hub B2B para descobrir, comparar e acionar 7 empresas industriais por solução, aplicação e contexto comercial.",
  favicon: "/favicon.ico",
  keywords:
    "elcio, hub b2b, representacao comercial, comparacao de empresas industriais, catalogo tecnico, qualidade de energia, lubrificacao especial",
};

const seoMap: Record<SeoKey, SeoSiteConfig> = { elcio: baseConfig };

function resolveMetadataBase(): URL {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3003");

  try {
    return new URL(rawUrl);
  } catch {
    return new URL("http://localhost:3003");
  }
}

export async function getSeoConfig(key: SeoKey): Promise<SeoSiteConfig> {
  return seoMap[key] || baseConfig;
}

export async function buildMetadata(key: SeoKey): Promise<Metadata> {
  const seo = await getSeoConfig(key);
  const keywords = seo.keywords.split(",").map((keyword) => keyword.trim());

  return {
    metadataBase: resolveMetadataBase(),
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
  return seo.favicon;
}
