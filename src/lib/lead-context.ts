export type HubSegment =
  | "usinagem"
  | "ferramentas-especiais"
  | "filtragem"
  | "ventilacao"
  | "acionamentos"
  | "motores"
  | "assistencia-tecnica-industrial";

export type BuyerIntent =
  | "receber-catalogo"
  | "entender-melhor-opcao"
  | "solicitar-contato-comercial";

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
  segment: HubSegment;
  solutionTypes: string[];
  primaryApplications: string[];
  buyerIntents: BuyerIntent[];
  comparisonTags: string[];
}

export interface BuyerIntentOption {
  value: BuyerIntent;
  label: string;
  description: string;
}

export const DEFAULT_WHATSAPP_PHONE = "5512988737347";
export const COMPANY_CARD_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
export const COMPANY_CARD_IMAGE_QUALITY = 92;
export const COMPANY_CARD_CONTAINER_CLASS =
  "relative aspect-[2/1] bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200";
export const COMPANY_CARD_IMAGE_CLASS = "object-contain p-3 md:p-4";

const LEGACY_COMPANY_SLUGS: Record<string, string> = {
  solufil: "solofil",
  f1300: "nord-drivesystems",
  apresenta: "mercosul-motores",
};

const INTENT_TO_SUBJECT: Record<BuyerIntent, string> = {
  "receber-catalogo": "catalogo",
  "entender-melhor-opcao": "consultoria-catalogo",
  "solicitar-contato-comercial": "orcamento",
};

export const HUB_INTENT_OPTIONS: BuyerIntentOption[] = [
  {
    value: "receber-catalogo",
    label: "Receber catálogo",
    description: "Ideal para quem já sabe a linha de interesse e quer material técnico.",
  },
  {
    value: "entender-melhor-opcao",
    label: "Entender a melhor opção",
    description: "Ideal para comparar as empresas do portfólio e descobrir o melhor caminho.",
  },
  {
    value: "solicitar-contato-comercial",
    label: "Solicitar contato comercial",
    description: "Ideal para abrir orçamento, cotação ou próximo passo com contexto.",
  },
];

export const COMPANY_OPTIONS: CompanyOption[] = [
  {
    slug: "ardiri",
    name: "Ardiri",
    fileName: "Ardiri.pdf",
    pdfPublicPath: "/catalogos/ardiri.pdf",
    logoPublicPath: "/images/empresas/ardiri/logo.png",
    coverPublicPath: "/images/empresas/ardiri/cover.png",
    teaser: "Qualidade de energia e filtros capacitivos para proteger ativos, reduzir perdas e elevar a produtividade industrial.",
    ctaSource: "empresa-ardiri",
    order: 1,
    segment: "acionamentos",
    solutionTypes: ["qualidade de energia", "filtros capacitivos", "proteção elétrica", "eficiência energética"],
    primaryApplications: ["correção e estabilidade elétrica", "proteção de máquinas e eletrônicos", "ganho de produtividade industrial"],
    buyerIntents: ["receber-catalogo", "entender-melhor-opcao", "solicitar-contato-comercial"],
    comparisonTags: ["qualidade de energia", "proteção elétrica", "economia de energia", "produtividade"],
  },
  {
    slug: "autoplast",
    name: "Autoplast",
    fileName: "Autoplast.pdf",
    pdfPublicPath: "/catalogos/autoplast.pdf",
    logoPublicPath: "/images/empresas/autoplast/logo.png",
    coverPublicPath: "/images/empresas/autoplast/cover.jpg",
    teaser: "Lubrificantes especiais e aditivos industriais com PTFE e MoS2 para reduzir atrito, desgaste e paradas mecânicas.",
    ctaSource: "empresa-autoplast",
    order: 2,
    segment: "ferramentas-especiais",
    solutionTypes: ["lubrificantes especiais", "aditivos industriais", "PTFE", "MoS2", "proteção mecânica"],
    primaryApplications: ["redução de atrito e desgaste", "lubrificação industrial crítica", "aumento de vida útil de componentes"],
    buyerIntents: ["entender-melhor-opcao", "solicitar-contato-comercial", "receber-catalogo"],
    comparisonTags: ["lubrificação", "proteção mecânica", "manutenção industrial", "vida útil"],
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
    segment: "filtragem",
    solutionTypes: ["filtragem industrial", "qualidade do ar", "mangas filtrantes", "controle de emissões"],
    primaryApplications: ["ambientes críticos", "controle de contaminação", "sistemas HVAC"],
    buyerIntents: ["entender-melhor-opcao", "solicitar-contato-comercial", "receber-catalogo"],
    comparisonTags: ["conformidade", "qualidade do ar", "diagnóstico técnico", "retenção de partículas"],
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
    segment: "ventilacao",
    solutionTypes: ["ventilação industrial", "ventiladores axiais", "retrofit", "conservação energética"],
    primaryApplications: ["climatização industrial", "redução de consumo", "controle acústico"],
    buyerIntents: ["entender-melhor-opcao", "solicitar-contato-comercial", "receber-catalogo"],
    comparisonTags: ["eficiência energética", "projeto específico", "retrofit", "consultoria técnica"],
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
    segment: "acionamentos",
    solutionTypes: ["acionamentos", "motorredutores", "redutores industriais", "inversores de frequência"],
    primaryApplications: ["movimento industrial", "transmissão", "ambientes severos"],
    buyerIntents: ["entender-melhor-opcao", "solicitar-contato-comercial", "receber-catalogo"],
    comparisonTags: ["sistema completo", "robustez", "integração", "eficiência"],
  },
  {
    slug: "mercosul-motores",
    name: "Mercosul Motores",
    fileName: "Mercosul_motores.pdf",
    pdfPublicPath: "/catalogos/mercosul-motores.pdf",
    logoPublicPath: "/images/empresas/mercosul-motores/logo.svg",
    coverPublicPath: "/images/empresas/mercosul-motores/cover.jpg",
    teaser: "Motores elétricos e soluções industriais com foco em baixa tensão, automação e redutores.",
    ctaSource: "empresa-mercosul-motores",
    order: 6,
    segment: "motores",
    solutionTypes: ["motores elétricos", "automação industrial", "redutores", "baixa tensão"],
    primaryApplications: ["aplicações industriais", "automação", "mobilidade elétrica"],
    buyerIntents: ["receber-catalogo", "entender-melhor-opcao", "solicitar-contato-comercial"],
    comparisonTags: ["escala fabril", "baixa tensão", "rede de assistência", "motores"],
  },
  {
    slug: "wmg-assistencia-tecnica",
    name: "WMG Assistência Técnica",
    fileName: "WMG Assistência Técnica.pdf",
    pdfPublicPath: "/catalogos/wmg-assistencia-tecnica.pdf",
    logoPublicPath: "/images/empresas/wmg-assistencia-tecnica/logo.png",
    coverPublicPath: "/images/empresas/wmg-assistencia-tecnica/cover.jpg",
    teaser:
      "Manutenção elétrica e eletrônica industrial para inversores, servo drives, CNCs, IHMs, PLCs e equipamentos multimarcas.",
    ctaSource: "empresa-wmg-assistencia-tecnica",
    order: 7,
    segment: "assistencia-tecnica-industrial",
    solutionTypes: ["manutenção elétrica", "manutenção eletrônica", "CNC", "IHM", "PLC", "servo drives"],
    primaryApplications: ["paradas programadas", "corretiva industrial", "recuperação de eletrônica"],
    buyerIntents: ["solicitar-contato-comercial", "entender-melhor-opcao", "receber-catalogo"],
    comparisonTags: ["multimarcas", "manutenção industrial", "campo e laboratório", "alta criticidade"],
  },
];

export const COMPANY_COUNT = COMPANY_OPTIONS.length;

export function normalizeCompanySlug(value?: string | null): string {
  if (!value) return "";
  const normalizedInput = value.trim().toLowerCase();
  const normalized = LEGACY_COMPANY_SLUGS[normalizedInput] || normalizedInput;
  return COMPANY_OPTIONS.some((company) => company.slug === normalized) ? normalized : "";
}

export function normalizeIntent(value?: string | null): BuyerIntent {
  if (!value) return "entender-melhor-opcao";

  if ((HUB_INTENT_OPTIONS as BuyerIntentOption[]).some((item) => item.value === value)) {
    return value as BuyerIntent;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "catalogo" || normalized === "receber-catalogo") {
    return "receber-catalogo";
  }

  if (
    normalized === "orcamento" ||
    normalized === "solicitar-contato-comercial" ||
    normalized === "contato-comercial"
  ) {
    return "solicitar-contato-comercial";
  }

  return "entender-melhor-opcao";
}

export function getIntentLabel(intent?: string | null): string {
  return HUB_INTENT_OPTIONS.find((option) => option.value === normalizeIntent(intent))?.label || "Entender a melhor opção";
}

export function getIntentDescription(intent?: string | null): string {
  return (
    HUB_INTENT_OPTIONS.find((option) => option.value === normalizeIntent(intent))?.description ||
    "Ideal para comparar as empresas do portfólio e descobrir o melhor caminho."
  );
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
  assunto,
  intent,
  empresa,
  origem,
}: {
  assunto?: string;
  intent?: BuyerIntent | string | null;
  empresa?: string | null;
  origem?: string | null;
}) {
  const params = new URLSearchParams();
  const normalizedIntent = normalizeIntent(intent || assunto);
  const resolvedAssunto = assunto?.trim() || INTENT_TO_SUBJECT[normalizedIntent];

  params.set("assunto", resolvedAssunto);
  params.set("intent", normalizedIntent);

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
  assunto,
  intent,
  empresa,
  origem,
  extraMessage,
}: {
  phone?: string;
  assunto?: string;
  intent?: BuyerIntent | string | null;
  empresa?: string | null;
  origem?: string | null;
  extraMessage?: string;
}) {
  const resolvedIntent = normalizeIntent(intent || assunto);
  const companyName = getCompanyNameFromSlug(empresa);
  const parts = [
    "Olá! Quero atendimento pelo hub B2B do Elcio.",
    `Intenção: ${getIntentLabel(resolvedIntent)}.`,
    companyName ? `Empresa de interesse: ${companyName}.` : "",
    origem ? `Origem: ${origem}.` : "",
    extraMessage || "",
  ].filter(Boolean);

  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(parts.join(" "))}`;
}
