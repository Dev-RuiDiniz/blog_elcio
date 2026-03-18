import Link from "next/link";
import Image from "next/image";
import { HiArrowRight, HiOutlineCheckCircle, HiOutlineLocationMarker, HiOutlinePhone, HiOutlineSparkles } from "react-icons/hi";
import {
  COMPANY_COUNT,
  COMPANY_OPTIONS,
  HUB_INTENT_OPTIONS,
  HUB_SEGMENTS,
  buildContactHref,
  buildWhatsappHref,
  getCompaniesBySegment,
  getSolutionHref,
} from "@/lib/lead-context";

const orderedCompanies = [...COMPANY_OPTIONS].sort((a, b) => a.order - b.order);
const highlightCompanies = orderedCompanies.slice(0, 3);

const methodSteps = [
  {
    title: "Você entra pelo problema, não pela marca",
    description:
      "O hub organiza o portfólio por necessidade comercial e técnica para reduzir ruído logo na primeira conversa.",
  },
  {
    title: "Elcio qualifica e compara opções",
    description:
      "A triagem central identifica qual empresa, combinação de empresas ou próximo passo faz mais sentido para o contexto.",
  },
  {
    title: "A conversa já chega com direção",
    description:
      "O contato segue com contexto, intenção e material técnico alinhado ao que o comprador realmente precisa.",
  },
];

const signals = [
  "7 empresas com perfis complementares",
  "Entrada única para descobrir, comparar e acionar a empresa certa",
  "Portfólio organizado por solução, aplicação e intenção de compra",
];

const counters = [
  { value: String(COMPANY_COUNT), label: "Empresas no hub" },
  { value: String(HUB_SEGMENTS.length), label: "Clusters de solução" },
  { value: "1", label: "Canal de entrada" },
  { value: "B2B", label: "Foco industrial" },
];

const buyerQuestions = [
  "Qual empresa atende melhor qualidade de energia, lubrificação especial ou manutenção industrial?",
  "Quem faz mais sentido para filtragem, ventilação, motores e acionamentos?",
  "Como comparar opções antes de abrir o contato comercial?",
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#07111f] pt-40 pb-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.16),_transparent_34%)]" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src={orderedCompanies[0]?.coverPublicPath || "/images/empresas/ardiri/cover.png"}
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="site-container relative z-10">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                <HiOutlineSparkles className="h-4 w-4" />
                Hub B2B de Soluções Industriais
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                Descubra, compare e acione a empresa industrial certa em um único ponto de entrada.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
                O hub reúne 7 empresas complementares para transformar uma dúvida comercial em
                direção prática: você entra pela necessidade, compara caminhos e sai com contato,
                catálogo e encaminhamento técnico mais claros.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/marcas"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-amber-600"
                >
                  Comparar empresas e soluções
                  <HiArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href={buildContactHref({
                    intent: "entender-melhor-opcao",
                    origem: "home-hero-hub",
                  })}
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-white hover:text-[#07111f]"
                >
                  Quero ajuda para escolher
                </Link>
              </div>

              <ul className="mt-8 grid gap-3 text-sm text-slate-200 md:grid-cols-3">
                {signals.map((signal) => (
                  <li key={signal} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                    {signal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                O que o comprador precisa responder
              </p>
              <div className="mt-6 space-y-4">
                {buyerQuestions.map((question, index) => (
                  <div key={question} className="rounded-2xl border border-white/10 bg-black/10 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Pergunta {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-base font-medium leading-relaxed text-white">{question}</p>
                  </div>
                ))}
              </div>
              <a
                href={buildWhatsappHref({
                  intent: "entender-melhor-opcao",
                  origem: "home-hero-whatsapp",
                  extraMessage: "Preciso de orientação para entender a empresa ideal.",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-white/20 px-5 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Falar pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16">
        <div className="site-container grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {counters.map((counter) => (
            <div key={counter.label}>
              <p className="text-4xl font-black text-[#0a1d37] md:text-5xl">{counter.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {counter.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="site-container">
          <div className="max-w-3xl">
            <span className="site-badge">Como funciona o hub</span>
            <h2 className="site-heading mt-4">
              A entrada é única, mas a decisão passa por intenção, solução e aderência.
            </h2>
            <p className="site-copy mt-5">
              Em vez de obrigar o usuário a conhecer previamente cada marca, o hub organiza o
              portfólio para responder primeiro ao cenário do comprador e depois encaminhar a
              empresa certa.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {methodSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a1d37] text-lg font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-2xl font-black text-[#0a1d37]">{step.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="site-container">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="site-badge">Clusters de solução</span>
              <h2 className="site-heading mt-4">
                O hub agrupa as 7 empresas por necessidade real de compra.
              </h2>
              <p className="site-copy mt-4">
                Cada cluster abaixo organiza empresas com foco semelhante para acelerar a
                descoberta, a comparação e o próximo passo comercial.
              </p>
            </div>
            <Link href="/marcas" className="site-button-secondary">
              Ver todas as empresas
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {HUB_SEGMENTS.map((segment) => {
              const companies = getCompaniesBySegment(segment.slug);

              return (
                <article
                  key={segment.slug}
                  className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
                    {segment.label}
                  </p>
                  <h3 className="mt-3 text-3xl font-black text-[#0a1d37]">{segment.title}</h3>
                  <p className="mt-4 text-slate-600 leading-relaxed">{segment.shortDescription}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {companies.map((company) => (
                      <span
                        key={company.slug}
                        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                      >
                        {company.name}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={getSolutionHref(segment.slug)}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0a1d37] transition-colors hover:text-amber-600"
                  >
                    Explorar este cluster
                    <HiArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1d37] py-24 text-white">
        <div className="site-container">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
                Empresas em destaque
              </span>
              <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                Três exemplos do portfólio que o hub organiza para você.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                Cada empresa agora entra em uma lógica de solução e comparação, e não apenas como
                página isolada.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {highlightCompanies.map((company) => (
              <article
                key={company.slug}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 backdrop-blur-sm"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={company.coverPublicPath}
                    alt={`Capa da ${company.name}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/20 to-transparent" />
                </div>
                <div className="p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                    {company.segment.replace(/-/g, " ")}
                  </p>
                  <h3 className="mt-3 text-2xl font-black">{company.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{company.teaser}</p>

                  <ul className="mt-6 space-y-2">
                    {company.primaryApplications.slice(0, 3).map((application) => (
                      <li key={application} className="flex items-start gap-2 text-sm text-slate-200">
                        <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" />
                        <span>{application}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      href={`/p/${company.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-600"
                    >
                      Ver página da empresa
                    </Link>
                    <Link
                      href={getSolutionHref(company.segment)}
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                    >
                      Comparar dentro do cluster
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="site-container">
          <div className="max-w-3xl">
            <span className="site-badge">Intenções de entrada</span>
            <h2 className="site-heading mt-4">
              O CTA deixa de ser genérico e passa a começar pela intenção de compra.
            </h2>
            <p className="site-copy mt-4">
              O hub trabalha com três entradas controladas para capturar o contexto certo e melhorar
              a qualificação antes do encaminhamento comercial.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {HUB_INTENT_OPTIONS.map((intent) => (
              <article key={intent.value} className="site-card p-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
                  Intenção
                </p>
                <h3 className="mt-3 text-2xl font-black text-[#0a1d37]">{intent.label}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{intent.description}</p>
                <Link
                  href={buildContactHref({
                    intent: intent.value,
                    origem: `home-intent-${intent.value}`,
                  })}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0a1d37] hover:text-amber-600"
                >
                  Iniciar por esta intenção
                  <HiArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="site-container grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="site-badge">Próximo passo</span>
            <h2 className="site-heading mt-4">
              Se a dúvida é “qual empresa atende meu caso?”, o primeiro passo começa aqui.
            </h2>
            <p className="site-copy mt-5">
              O contato agora parte do problema, da intenção e do contexto. Isso evita encaminhamento
              disperso e melhora a qualidade comercial da conversa desde o início.
            </p>

            <div className="mt-8 space-y-4 text-slate-700">
              <div className="flex items-center gap-3">
                <HiOutlinePhone className="h-5 w-5 text-amber-500" />
                <span>+55 12 98873-7347</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineLocationMarker className="h-5 w-5 text-amber-500" />
                <span>Taubaté - SP</span>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
              Entradas rápidas
            </p>
            <div className="mt-6 grid gap-4">
              <Link
                href="/marcas"
                className="inline-flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 font-semibold text-[#0a1d37] transition-colors hover:bg-slate-50"
              >
                Explorar o hub por empresa e cluster
                <HiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={buildContactHref({
                  intent: "entender-melhor-opcao",
                  origem: "home-cta-central",
                })}
                className="inline-flex items-center justify-between rounded-2xl bg-[#0a1d37] px-5 py-4 font-semibold text-white transition-colors hover:bg-[#112948]"
              >
                Quero entender a melhor opção
                <HiArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={buildWhatsappHref({
                  intent: "solicitar-contato-comercial",
                  origem: "home-cta-whatsapp",
                  extraMessage: "Quero abrir um contato comercial com contexto.",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 font-semibold text-[#0a1d37] transition-colors hover:bg-slate-50"
              >
                Falar no WhatsApp
                <HiArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
