export interface CompanyOption {
  slug: string;
  name: string;
  fileName: string;
  teaser: string;
}

export const COMPANY_OPTIONS: CompanyOption[] = [
  {
    slug: "dest-dormer-pramet",
    name: "DEST DORMER PRAMET",
    fileName: "Apresentação DEST DORMER PRAMET.pdf",
    teaser: "Soluções industriais com foco em performance, precisão e produtividade.",
  },
  {
    slug: "fecial",
    name: "Fecial",
    fileName: "Apresentação Fecial - 2025.pdf",
    teaser: "Ferramentas e insertos especiais com desenvolvimento técnico consolidado.",
  },
  {
    slug: "solufil",
    name: "Solufil",
    fileName: "CATALOGO produtos SOLUFIL- 2025.pdf",
    teaser: "Catálogo de produtos para aplicações de filtragem e processos industriais.",
  },
  {
    slug: "deltajet",
    name: "Deltajet",
    fileName: "Deltajet.pdf",
    teaser: "Tecnologia aplicada para eficiência operacional em ambientes industriais.",
  },
  {
    slug: "f1300",
    name: "F1300",
    fileName: "FOLDER F1300.pdf",
    teaser: "Acionamentos completos com foco em robustez e confiabilidade técnica.",
  },
  {
    slug: "apresenta",
    name: "Apresenta (provisório)",
    fileName: "Apresenta.pdf",
    teaser: "Apresentação institucional provisória para ajuste de naming no CMS.",
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
  phone = "5511981982279",
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
