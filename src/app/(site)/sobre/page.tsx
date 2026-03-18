import Image from "next/image";
import Link from "next/link";
import {
  HiArrowRight,
  HiCheckCircle,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { COMPANY_COUNT, COMPANY_OPTIONS, buildContactHref, buildWhatsappHref } from "@/lib/lead-context";

const orderedCompanies = [...COMPANY_OPTIONS].sort((a, b) => a.order - b.order);
const DARK_BG_LOGO_SLUGS = ["fecial", "mercosul-motores"];

const pillars = [
  {
    title: "Triagem Consultiva",
    description:
      "Elcio começa pelo problema, pela intenção e pelo contexto antes de encaminhar a empresa mais coerente.",
  },
  {
    title: "Ponto Único de Contato",
    description:
      "Em vez de acionar vários canais em paralelo, o atendimento começa por uma conversa centralizada.",
  },
  {
    title: "Encaminhamento com Contexto",
    description:
      "Cada lead segue para a empresa representada com mais clareza, reduzindo ruído e retrabalho.",
  },
];

const highlights = [
  "Hub B2B com foco em descoberta, comparação e encaminhamento comercial.",
  `Portfólio consolidado com ${COMPANY_COUNT} empresas e clusters de solução.`,
  "Entrada única para intenção, empresa e próximo passo comercial.",
];

const counters = [
  { value: String(COMPANY_COUNT), label: "Empresas representadas" },
  { value: "1", label: "Canal consultivo inicial" },
  { value: "B2B", label: "Atendimento comercial" },
  { value: "SP", label: "Base em Taubaté" },
];

export default function SobrePage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pt-40 pb-24 md:px-10">
        <div className="absolute inset-0 bg-[#0a1d37]" />
        <div className="absolute inset-0 opacity-15">
          <Image
            src={orderedCompanies[0]?.coverPublicPath || "/images/empresas/dormer-pramet/cover.jpg"}
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="site-container relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-400 mb-4">
              Sobre Elcio
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              O Elcio opera o hub B2B que conecta demanda, solução e próximo passo comercial.
            </h1>
            <p className="max-w-3xl text-lg text-slate-200 leading-relaxed mb-10">
              Mais do que representar empresas, o papel do Elcio é organizar a entrada comercial do
              portfólio, comparar caminhos e encaminhar a conversa com mais aderência técnica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={buildContactHref({ intent: "entender-melhor-opcao", origem: "sobre-hero" })}
                className="site-button-primary"
              >
                Entender o hub
                <HiArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/marcas" className="site-button-secondary-inverse">
                Ver empresas representadas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-10 bg-white">
        <div className="site-container grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 h-24 w-24 rounded-2xl bg-amber-500/20 -z-10" />
            <div className="site-card overflow-hidden">
              <div className="grid sm:grid-cols-[1.2fr_0.8fr]">
                <div className="p-8 md:p-10">
                  <span className="site-badge">Quem é Elcio</span>
                  <h2 className="site-heading mt-3 mb-5">
                    Atendimento comercial com leitura de contexto
                  </h2>
                  <p className="site-copy">
                    A proposta do Elcio não é apenas encaminhar contatos. O trabalho começa na
                    leitura do cenário, no filtro inicial da demanda e na organização do fluxo
                    comercial para que o contato avance com mais precisão entre as empresas do hub.
                  </p>
                </div>
                <div className="bg-[#0a1d37] p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-4xl font-black text-amber-400">{COMPANY_COUNT}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300">
                      Empresas no portfólio
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-white">1</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300">
                      Entrada comercial consultiva
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <HiOutlineLocationMarker className="w-5 h-5 text-amber-400" />
                    <span className="font-medium">Taubaté - SP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="site-badge">Como atua</span>
            <h2 className="site-heading mt-3 mb-5">
              Uma representação comercial menos dispersa e mais objetiva
            </h2>
            <p className="site-copy mb-8">
              O foco está em reduzir o atrito da descoberta e fazer com que cada empresa do portfólio
              receba uma oportunidade com contexto, intenção e comparação mais claros.
            </p>
            <ul className="space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <HiCheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-500" />
                  <span className="font-medium text-slate-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 px-4 md:px-10">
        <div className="site-container">
          <div className="max-w-3xl mb-12">
            <span className="site-badge">Método</span>
            <h2 className="site-heading mt-3 mb-5">
              Três frentes que estruturam o trabalho do Elcio
            </h2>
            <p className="site-copy">
              O modelo comercial combina escuta inicial, orientação de caminho e encaminhamento
              com mais clareza para a empresa representada mais adequada.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-lg font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mb-3 text-2xl font-black text-[#0a1d37]">{pillar.title}</h3>
                <p className="text-slate-600 leading-relaxed">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-10 bg-white">
        <div className="site-container">
          <div className="text-center mb-14">
            <span className="site-badge">Empresas representadas</span>
            <h2 className="site-heading mt-3 mb-5">
              O portfólio que o Elcio conecta ao mercado
            </h2>
            <p className="mx-auto max-w-3xl site-copy">
              A atuação comercial passa por empresas com foco em ferramentas, filtragem, acionamentos
              e soluções industriais complementares.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderedCompanies.map((company) => (
              <article
                key={company.slug}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-6 flex h-16 items-center justify-center rounded-xl border border-slate-200 p-3 ${
                    DARK_BG_LOGO_SLUGS.includes(company.slug) ? "bg-[#0a1d37]" : "bg-white"
                  }`}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={company.logoPublicPath}
                      alt={`Logo da ${company.name}`}
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                </div>
                <h3 className="mb-3 text-2xl font-black text-[#0a1d37]">{company.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{company.teaser}</p>
                <div className="flex flex-col gap-3">
                  <Link href={`/p/${company.slug}`} className="text-sm font-bold text-amber-600 hover:text-amber-700">
                    Ver página da empresa
                  </Link>
                  <Link
                    href={buildContactHref({
                      assunto: "consultoria-catalogo",
                      empresa: company.slug,
                      origem: "sobre-empresas",
                    })}
                    className="text-sm text-slate-600 hover:text-[#0a1d37]"
                  >
                    Abrir atendimento com contexto
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1d37]/5 py-16 border-y border-[#0a1d37]/10">
        <div className="site-container grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {counters.map((counter) => (
            <div key={counter.label}>
              <p className="mb-2 text-4xl md:text-5xl font-black text-[#0a1d37]">{counter.value}</p>
              <p className="text-sm font-semibold uppercase tracking-tight text-slate-500">
                {counter.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0a1d37] py-20 px-4 md:px-10">
        <div className="site-container grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-400 mb-4">
              Próximo passo
            </span>
            <h2 className="site-heading-inverse mb-6">
              Se quiser abrir a conversa certa, o primeiro passo começa aqui.
            </h2>
            <p className="site-copy-inverse mb-8">
              Entre em contato para receber orientação inicial, descobrir o melhor caminho dentro do
              hub e avançar com contexto comercial mais claro.
            </p>
            <div className="space-y-4 text-slate-200">
              <div className="flex items-center gap-3">
                <HiOutlineMail className="h-5 w-5 text-amber-400" />
                <a href="mailto:vendas@raemtools.com.br" className="hover:text-white">
                  vendas@raemtools.com.br
                </a>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlinePhone className="h-5 w-5 text-amber-400" />
                <a href="tel:+5512988737347" className="hover:text-white">
                  +55 12 98873-7347
                </a>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineLocationMarker className="h-5 w-5 text-amber-400" />
                <span>Taubaté - SP</span>
              </div>
            </div>
          </div>

          <div className="site-card-dark p-8 md:p-10">
            <h3 className="mb-3 text-2xl font-black text-white">Fale com Elcio</h3>
            <p className="mb-8 text-sm text-slate-300">
              Escolha o canal mais rápido para iniciar a conversa.
            </p>
            <div className="flex flex-col gap-4">
              <Link
                href={buildContactHref({ intent: "entender-melhor-opcao", origem: "sobre-cta" })}
                className="site-button-primary"
              >
                Quero ajuda para comparar
              </Link>
              <a
                href={buildWhatsappHref({ origem: "sobre-cta" })}
                target="_blank"
                rel="noopener noreferrer"
                className="site-button-secondary-inverse"
              >
                Falar no WhatsApp
              </a>
              <Link href="/marcas" className="text-center text-sm text-slate-300 hover:text-white underline underline-offset-4">
                Ver todas as empresas representadas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
