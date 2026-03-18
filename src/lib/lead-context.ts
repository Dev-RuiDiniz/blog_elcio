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

export interface HubSegmentDefinition {
  slug: HubSegment;
  label: string;
  title: string;
  description: string;
  shortDescription: string;
  heroTitle: string;
  heroDescription: string;
  idealFor: string[];
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
  "dest-dormer-pramet": "dormer-pramet",
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

export const HUB_SEGMENTS: HubSegmentDefinition[] = [
  {
    slug: "usinagem",
    label: "Usinagem",
    title: "Soluções para usinagem",
    description:
      "Ferramentas e processos para furação, fresamento, torneamento, rosqueamento e ganho de produtividade em operações metalmecânicas.",
    shortDescription: "Ferramentas e suporte para produtividade em usinagem.",
    heroTitle: "Usinagem com mais previsibilidade comercial e técnica",
    heroDescription:
      "Encontre empresas voltadas à seleção de ferramentas, aplicações especiais e apoio consultivo para operações de usinagem.",
    idealFor: [
      "Engenharia de processo",
      "Produção metalmecânica",
      "Moldes, matrizes e manutenção industrial",
    ],
  },
  {
    slug: "ferramentas-especiais",
    label: "Ferramentas especiais",
    title: "Ferramentas especiais sob aplicação",
    description:
      "Empresas com foco em projetos fora do padrão, geometrias dedicadas, repetibilidade e integração com a necessidade do processo.",
    shortDescription: "Projetos especiais para operações fora do padrão.",
    heroTitle: "Quando a ferramenta padrão não resolve",
    heroDescription:
      "Compare empresas que atuam com soluções especiais, insertos dedicados e projetos para exigências de tolerância, acabamento e ganho de ciclo.",
    idealFor: [
      "Demandas fora do catálogo padrão",
      "Insertos e ferramentas dedicadas",
      "Projetos com tolerâncias e geometrias específicas",
    ],
  },
  {
    slug: "filtragem",
    label: "Filtragem",
    title: "Controle de contaminação e qualidade do ar",
    description:
      "Soluções para filtragem industrial, qualidade do ar interior, emissões atmosféricas e adequação regulatória.",
    shortDescription: "Filtragem industrial e controle do ar para ambientes críticos.",
    heroTitle: "Filtragem e qualidade do ar com apoio consultivo",
    heroDescription:
      "Identifique a empresa certa para retenção de partículas, controle de emissões e qualidade do ar em aplicações industriais e comerciais.",
    idealFor: [
      "HVAC e qualidade do ar",
      "Controle de emissões atmosféricas",
      "Ambientes críticos e industriais",
    ],
  },
  {
    slug: "ventilacao",
    label: "Ventilação",
    title: "Ventilação industrial e conservação energética",
    description:
      "Ventiladores, retrofits e consultoria para reduzir consumo de energia e melhorar performance de sistemas de ventilação.",
    shortDescription: "Ventilação industrial com foco em desempenho e eficiência.",
    heroTitle: "Ventilação industrial pensada para performance",
    heroDescription:
      "Avalie soluções para sistemas completos de ventilação, adaptação de hélices e ganhos de eficiência energética em aplicações industriais.",
    idealFor: [
      "Projetos com meta de eficiência energética",
      "Ventilação e climatização industrial",
      "Retrofit e controle acústico",
    ],
  },
  {
    slug: "acionamentos",
    label: "Acionamentos",
    title: "Acionamentos industriais",
    description:
      "Motorredutores, inversores, redutores, motores e soluções completas para transmissão, controle e eficiência operacional.",
    shortDescription: "Acionamentos completos para movimento e transmissão.",
    heroTitle: "Acionamentos e movimento com mais clareza na escolha",
    heroDescription:
      "Descubra empresas do portfólio focadas em sistemas de acionamento, integração entre redutores, motores e eletrônica de controle.",
    idealFor: [
      "Movimento e transmissão industrial",
      "Dimensionamento de redutores e inversores",
      "Projetos com foco em robustez e eficiência",
    ],
  },
  {
    slug: "motores",
    label: "Motores",
    title: "Motores elétricos e soluções de movimento",
    description:
      "Portfólio para motores elétricos, automação industrial, redutores e soluções ligadas a baixa tensão e mobilidade.",
    shortDescription: "Motores elétricos, redutores e soluções industriais complementares.",
    heroTitle: "Motores elétricos e soluções industriais conectadas ao seu cenário",
    heroDescription:
      "Compare opções para motores, automação e componentes de movimento com apoio comercial centralizado.",
    idealFor: [
      "Baixa tensão e aplicações industriais",
      "Motores trifásicos e monofásicos",
      "Automação e redutores de velocidade",
    ],
  },
  {
    slug: "assistencia-tecnica-industrial",
    label: "Assistência técnica industrial",
    title: "Manutenção elétrica e eletrônica industrial",
    description:
      "Atendimento para manutenção preventiva e corretiva de acionamentos, CNCs, IHMs, PLCs, placas e equipamentos eletrônicos industriais.",
    shortDescription: "Assistência técnica industrial para recuperar disponibilidade e reduzir parada.",
    heroTitle: "Quando a demanda é manutenção industrial com alta criticidade",
    heroDescription:
      "Encontre suporte para manutenção elétrica e eletrônica industrial, diagnóstico técnico e recuperação de ativos críticos.",
    idealFor: [
      "Paradas programadas e corretivas",
      "CNCs, IHMs, PLCs e servo-drives",
      "Recuperação de eletrônica industrial multimarcas",
    ],
  },
];

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
    segment: "usinagem",
    solutionTypes: ["ferramentas de corte", "furação", "fresamento", "torneamento", "rosqueamento"],
    primaryApplications: ["engenharia geral", "moldes e matrizes", "manutenção industrial"],
    buyerIntents: ["receber-catalogo", "entender-melhor-opcao", "solicitar-contato-comercial"],
    comparisonTags: ["produtividade", "portfólio amplo", "usinagem seriada", "suporte técnico"],
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
    segment: "ferramentas-especiais",
    solutionTypes: ["ferramentas especiais", "insertos especiais", "mandrilamento", "rosqueamento especial"],
    primaryApplications: ["operações fora do padrão", "usinagem seriada", "acabamento de furos"],
    buyerIntents: ["entender-melhor-opcao", "solicitar-contato-comercial", "receber-catalogo"],
    comparisonTags: ["sob medida", "alta precisão", "engenharia aplicada", "fora do convencional"],
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
    coverPublicPath: "/images/empresas/mercosul-motores/cover.png",
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

export const HUB_SEGMENT_ORDER = HUB_SEGMENTS.map((segment) => segment.slug);

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

export function getHubSegmentBySlug(value?: string | null): HubSegmentDefinition | null {
  if (!value) return null;
  return HUB_SEGMENTS.find((segment) => segment.slug === value) || null;
}

export function getCompaniesBySegment(segment?: string | null): CompanyOption[] {
  if (!segment) return [];
  return COMPANY_OPTIONS.filter((company) => company.segment === segment);
}

export function getRelatedCompanies(slug?: string | null, limit = 3): CompanyOption[] {
  const current = getCompanyBySlug(slug);
  if (!current) return [];

  return COMPANY_OPTIONS.filter((company) => company.slug !== current.slug)
    .map((company) => {
      const sharedTags = company.comparisonTags.filter((tag) => current.comparisonTags.includes(tag)).length;
      const sharedSolutions = company.solutionTypes.filter((type) => current.solutionTypes.includes(type)).length;
      const sameSegment = company.segment === current.segment ? 3 : 0;

      return {
        company,
        score: sameSegment + sharedTags * 2 + sharedSolutions,
      };
    })
    .sort((a, b) => b.score - a.score || a.company.order - b.company.order)
    .slice(0, limit)
    .map((item) => item.company);
}

export function getSolutionHref(segment?: string | null): string {
  const normalized = getHubSegmentBySlug(segment);
  return normalized ? `/solucoes/${normalized.slug}` : "/marcas";
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
