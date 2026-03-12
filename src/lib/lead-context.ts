export interface CompanyOption {
  slug: string;
  name: string;
  fileName: string;
  pdfPublicPath: string;
  teaser: string;
  ctaSource: string;
  order: number;
}

export const DEFAULT_WHATSAPP_PHONE = "5500000000000";

export const COMPANY_OPTIONS: CompanyOption[] = [
  {
    slug: "dest-dormer-pramet",
    name: "DEST DORMER PRAMET",
    fileName: "Apresentação DEST DORMER PRAMET.pdf",
    pdfPublicPath: "/catalogos/dest-dormer-pramet.pdf",
    teaser: "Soluções industriais com foco em performance, precisão e produtividade.",
    ctaSource: "empresa-dest-dormer-pramet",
    order: 1,
  },
  {
    slug: "fecial",
    name: "Fecial",
    fileName: "Apresentação Fecial - 2025.pdf",
    pdfPublicPath: "/catalogos/fecial.pdf",
    teaser: "Ferramentas e insertos especiais com desenvolvimento técnico consolidado.",
    ctaSource: "empresa-fecial",
    order: 2,
  },
  {
    slug: "solufil",
    name: "Solufil",
    fileName: "CATALOGO produtos SOLUFIL- 2025.pdf",
    pdfPublicPath: "/catalogos/solufil.pdf",
    teaser: "Catálogo de produtos para aplicações de filtragem e processos industriais.",
    ctaSource: "empresa-solufil",
    order: 3,
  },
  {
    slug: "deltajet",
    name: "Deltajet",
    fileName: "Deltajet.pdf",
    pdfPublicPath: "/catalogos/deltajet.pdf",
    teaser: "Tecnologia aplicada para eficiência operacional em ambientes industriais.",
    ctaSource: "empresa-deltajet",
    order: 4,
  },
  {
    slug: "f1300",
    name: "F1300",
    fileName: "FOLDER F1300.pdf",
    pdfPublicPath: "/catalogos/f1300.pdf",
    teaser: "Acionamentos completos com foco em robustez e confiabilidade técnica.",
    ctaSource: "empresa-f1300",
    order: 5,
  },
  {
    slug: "apresenta",
    name: "Apresenta (provisório)",
    fileName: "Apresenta.pdf",
    pdfPublicPath: "/catalogos/apresenta-provisorio.pdf",
    teaser: "Apresentação institucional provisória para ajuste de naming no CMS.",
    ctaSource: "empresa-apresenta",
    order: 6,
  },
];

export function normalizeCompanySlug(value?: string | null): string {
  if (!value) return "";
  const normalized = value.trim().toLowerCase();
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
