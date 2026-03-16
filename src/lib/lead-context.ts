export interface CompanyOption {
  slug: string;
  name: string;
  fileName: string;
  pdfPublicPath: string;
  logoPublicPath: string;
  coverPublicPath: string;
  teaser: string;
  ctaSource: string;
  order: number;
}

export const DEFAULT_WHATSAPP_PHONE = "5512988737347";
export const COMPANY_CARD_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
export const COMPANY_CARD_IMAGE_QUALITY = 92;
export const COMPANY_CARD_CONTAINER_CLASS =
  "relative aspect-[2/1] bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200";
export const COMPANY_CARD_IMAGE_CLASS = "object-contain p-3 md:p-4";

const LEGACY_COMPANY_SLUGS: Record<string, string> = {
  "dest-dormer-pramet": "dormer-pramet",
  solufil: "solofil",
  f1300: "nord-drivesystems",
  apresenta: "mercosul-motores",
};

export const COMPANY_OPTIONS: CompanyOption[] = [
  {
    slug: "dormer-pramet",
    name: "Dormer Pramet",
    fileName: "Dormer_Pramet.pdf",
    pdfPublicPath: "/catalogos/dormer-pramet.pdf",
    logoPublicPath: "/images/empresas/dormer-pramet/logo.svg",
    coverPublicPath: "/images/empresas/dormer-pramet/cover.jpg",
    teaser: "Ferramentas de corte para furação, fresamento, torneamento e rosqueamento com foco em produtividade.",
    ctaSource: "empresa-dormer-pramet",
    order: 1,
  },
  {
    slug: "fecial",
    name: "Fecial",
    fileName: "Fecial.pdf",
    pdfPublicPath: "/catalogos/fecial.pdf",
    logoPublicPath: "/images/empresas/fecial/logo.png",
    coverPublicPath: "/images/empresas/fecial/cover.jpg",
    teaser: "Ferramentas especiais para usinagem, com foco em insertos, mandrilamento e projetos sob medida.",
    ctaSource: "empresa-fecial",
    order: 2,
  },
  {
    slug: "solofil",
    name: "Solufil",
    fileName: "Solofil.pdf",
    pdfPublicPath: "/catalogos/solofil.pdf",
    logoPublicPath: "/images/empresas/solofil/logo.png",
    coverPublicPath: "/images/empresas/solofil/cover.jpg",
    teaser: "Soluções em filtragem industrial e qualidade do ar para controle de contaminação e emissões.",
    ctaSource: "empresa-solofil",
    order: 3,
  },
  {
    slug: "deltajet",
    name: "Delta Jet",
    fileName: "Deltajet.pdf",
    pdfPublicPath: "/catalogos/deltajet.pdf",
    logoPublicPath: "/images/empresas/deltajet/logo.png",
    coverPublicPath: "/images/empresas/deltajet/cover.jpg",
    teaser: "Ventilação industrial com foco em eficiência energética, ventiladores axiais e consultoria técnica.",
    ctaSource: "empresa-deltajet",
    order: 4,
  },
  {
    slug: "nord-drivesystems",
    name: "NORD DRIVESYSTEMS",
    fileName: "Nord_drivesystems.pdf",
    pdfPublicPath: "/catalogos/nord-drivesystems.pdf",
    logoPublicPath: "/images/empresas/nord-drivesystems/logo.svg",
    coverPublicPath: "/images/empresas/nord-drivesystems/cover.jpg",
    teaser: "Soluções completas em acionamentos com motorredutores, motores, redutores e inversores.",
    ctaSource: "empresa-nord-drivesystems",
    order: 5,
  },
  {
    slug: "mercosul-motores",
    name: "Mercosul Motores",
    fileName: "Mercosul_motores.pdf",
    pdfPublicPath: "/catalogos/mercosul-motores.pdf",
    logoPublicPath: "/images/empresas/mercosul-motores/logo.svg",
    coverPublicPath: "/images/empresas/mercosul-motores/cover.png",
    teaser: "Motores elétricos e soluções industriais com foco em baixa tensão, automação e redutores.",
    ctaSource: "empresa-mercosul-motores",
    order: 6,
  },
];

export function normalizeCompanySlug(value?: string | null): string {
  if (!value) return "";
  const normalizedInput = value.trim().toLowerCase();
  const normalized = LEGACY_COMPANY_SLUGS[normalizedInput] || normalizedInput;
  return COMPANY_OPTIONS.some((company) => company.slug === normalized) ? normalized : "";
}

export function getCompanyNameFromSlug(value?: string | null): string {
  const slug = normalizeCompanySlug(value);
  if (!slug) return "";
  return COMPANY_OPTIONS.find((company) => company.slug === slug)?.name || "";
}

export function getCompanyBySlug(value?: string | null): CompanyOption | null {
  const slug = normalizeCompanySlug(value);
  if (!slug) return null;
  return COMPANY_OPTIONS.find((company) => company.slug === slug) || null;
}

export function getCompanyCatalogHref(value?: string | null): string {
  return getCompanyBySlug(value)?.pdfPublicPath || "";
}

export function isCompanyAssetPath(path?: string | null): boolean {
  if (!path) return false;
  return path.startsWith("/images/empresas/");
}

export function buildContactHref({
  assunto = "consultoria-catalogo",
  empresa,
  origem,
}: {
  assunto?: string;
  empresa?: string | null;
  origem?: string | null;
}) {
  const params = new URLSearchParams();
  params.set("assunto", assunto);

  const normalizedCompany = normalizeCompanySlug(empresa);
  if (normalizedCompany) {
    params.set("empresa", normalizedCompany);
  }

  if (origem && origem.trim()) {
    params.set("origem", origem.trim());
  }

  return `/contato?${params.toString()}`;
}

export function buildWhatsappHref({
  phone = DEFAULT_WHATSAPP_PHONE,
  assunto = "consultoria-catalogo",
  empresa,
  origem,
  extraMessage,
}: {
  phone?: string;
  assunto?: string;
  empresa?: string | null;
  origem?: string | null;
  extraMessage?: string;
}) {
  const companyName = getCompanyNameFromSlug(empresa);
  const parts = [
    "Olá! Quero uma consultoria e catálogo.",
    companyName ? `Empresa de interesse: ${companyName}.` : "",
    origem ? `Origem: ${origem}.` : "",
    assunto ? `Assunto: ${assunto}.` : "",
    extraMessage || "",
  ].filter(Boolean);

  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(parts.join(" "))}`;
}
