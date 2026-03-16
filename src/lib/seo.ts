import type { Metadata } from "next";

type SeoKey = "elcio";

interface SeoSiteConfig {
  title: string;
  description: string;
  favicon: string;
  keywords: string;
}

const baseConfig: SeoSiteConfig = {
  title: "Elcio Representação Comercial | Consultoria + Catálogo",
  description:
    "Representação comercial B2B para conectar sua demanda à empresa ideal com atendimento consultivo e catálogo técnico.",
  favicon: "/favicon.ico",
  keywords:
    "elcio, representacao comercial, consultoria comercial, catalogo tecnico, b2b, empresas representadas",
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
