import Link from "next/link";
import Image from "next/image";
import { HiArrowRight, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiCheckCircle } from "react-icons/hi";
import { COMPANY_OPTIONS, buildContactHref, buildWhatsappHref } from "@/lib/lead-context";

const orderedCompanies = [...COMPANY_OPTIONS].sort((a, b) => a.order - b.order);

// Logos com composição branca precisam de fundo escuro para garantir visibilidade
const DARK_BG_LOGO_SLUGS = ["fecial", "mercosul-motores"];

const methodSteps = [
  {
    title: "Triagem da Demanda",
    description: "Você informa seu cenário técnico e comercial para estruturar o primeiro direcionamento.",
  },
  {
    title: "Consultoria Inicial",
    description: "Elcio compara opções entre as empresas representadas e orienta a melhor abordagem.",
  },
  {
    title: "Encaminhamento Comercial",
    description: "Sua demanda segue para o canal correto com mais contexto e velocidade de atendimento.",
  },
];

const aboutBullets = [
  "Representação B2B com foco em ferramentas, filtração e acionamentos industriais.",
  "Um único ponto de contato para 6 empresas especializadas.",
  "Triagem técnica e consultiva antes do encaminhamento comercial.",
];

const counters = [
  { value: "6", label: "Empresas Representadas" },
  { value: "1", label: "Ponto Único de Contato" },
  { value: "B2B", label: "Foco Industrial" },
  { value: "SP", label: "Taubaté – São Paulo" },
];

export default function Home() {
  return (
    <>
      {/* ===== 1. HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden pt-40">
        <div className="absolute inset-0 z-0 bg-[#0a1d37]" />
        <div className="absolute inset-0 z-0 opacity-15">
          <Image
            src="/images/empresas/dormer-pramet/cover.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto pb-20">
          <span className="inline-block text-amber-400 font-bold uppercase tracking-widest text-sm mb-6">
            Representação Comercial B2B
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Elcio conecta sua demanda à empresa certa.
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Atendimento consultivo para reduzir ruído comercial, acelerar o primeiro contato e direcionar o catálogo técnico mais aderente ao seu contexto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={buildContactHref({ assunto: "consultoria-catalogo", origem: "home-hero" })}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              Solicitar Consultoria + Catálogo
              <HiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/marcas"
              className="border-2 border-white text-white hover:bg-white hover:text-[#0a1d37] px-8 py-4 rounded-lg font-bold transition-all"
            >
              Conhecer as 6 empresas
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 2. SOBRE ===== */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto" id="sobre">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Esquerda: Card claro com stats + foto à direita */}
          <div className="relative">
            {/* Decoração de fundo */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500/20 rounded-lg -z-10" />

            {/* Card principal */}
            <div className="bg-slate-100 rounded-xl shadow-2xl overflow-hidden flex min-h-[340px]">

              {/* Lado esquerdo: Badge ER + stats */}
              <div className="flex flex-col justify-between p-8 flex-1">
                <div className="w-14 h-14 rounded-full border-2 border-[#0a1d37] flex items-center justify-center text-base font-bold text-[#0a1d37] mb-6 flex-shrink-0">
                  ER
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-4xl font-black text-amber-500 leading-none">6</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Empresas representadas</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-[#0a1d37] leading-none">1</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Ponto único de contato</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-amber-500 leading-none">B2B</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Foco industrial</p>
                  </div>
                </div>
              </div>

              {/* Lado direito: Foto da equipe — 50% do card */}
              <div className="relative w-1/2 flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80"
                  alt="Equipe de representação comercial"
                  fill
                  className="object-cover object-center"
                />
                {/* Gradiente suave para integrar com o fundo cinza */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-100/40 to-transparent" />
              </div>
            </div>

            {/* Badge flutuante */}
            <div className="absolute -bottom-5 -right-5 bg-amber-500 px-5 py-3 rounded-lg shadow-xl hidden lg:flex items-center gap-2">
              <HiOutlineLocationMarker className="text-white w-4 h-4" />
              <p className="text-white font-bold text-sm">Taubaté – SP</p>
            </div>
          </div>

          {/* Direita: Texto */}
          <div>
            <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">Sobre o Serviço</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1d37] mt-2 mb-6">
              Sua demanda em boas mãos
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Atuamos como o braço consultivo entre sua necessidade técnica e as empresas representadas. Nossa missão é triar a demanda, orientar o catálogo mais aderente e encaminhar o contato com velocidade.
            </p>
            <ul className="space-y-4">
              {aboutBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <HiCheckCircle className="text-amber-500 w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 3. EMPRESAS REPRESENTADAS (dark) ===== */}
      <section className="bg-[#0a1d37] py-20 px-4 md:px-10" id="empresas">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm">Portfólio</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
              Empresas Representadas
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderedCompanies.map((company) => (
              <article
                key={company.slug}
                className="bg-slate-100 border border-slate-200 p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all group flex flex-col"
              >
                {/* Fundo adaptativo: escuro para logos de composição branca, branco para os demais */}
                <div className={`${DARK_BG_LOGO_SLUGS.includes(company.slug) ? "bg-[#0a1d37]" : "bg-white"} rounded-lg border border-slate-200 shadow-sm p-3 mb-6 flex items-center justify-center h-16 flex-shrink-0`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={company.logoPublicPath}
                      alt={`Logo da ${company.name}`}
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0a1d37] mb-3">{company.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{company.teaser}</p>
                <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-4">
                  <Link
                    href={`/p/${company.slug}`}
                    className="text-sm text-amber-500 hover:text-amber-600 font-semibold flex items-center gap-1 transition-colors"
                  >
                    Ver página da empresa <HiArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={buildContactHref({ assunto: "consultoria-catalogo", empresa: company.slug, origem: "home-empresas" })}
                    className="text-sm text-slate-500 hover:text-[#0a1d37] transition-colors"
                  >
                    Abrir atendimento
                  </Link>
                  <a
                    href={company.pdfPublicPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    Baixar catálogo técnico
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. MÉTODO / POR QUE NÓS ===== */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto" id="metodo">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">Método de Atendimento</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1d37] mt-2 mb-8">
              Processo comercial em três etapas
            </h2>
            <div className="space-y-8">
              {methodSteps.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-md">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0a1d37] mb-1">{step.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-[#0a1d37]/5 rounded-xl p-10 border border-[#0a1d37]/10">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-bold">Prova de Valor</p>
              <h3 className="text-2xl font-black text-[#0a1d37] mb-4">
                Menos ruído, mais clareza para avançar no comercial
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                A proposta é simplificar sua jornada de decisão e reduzir retrabalho no primeiro contato com fornecedores industriais.
              </p>
              <div className="space-y-3">
                <Link
                  href={buildContactHref({ assunto: "consultoria-catalogo", origem: "home-metodo" })}
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Iniciar Consultoria <HiArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={buildWhatsappHref({ origem: "home-metodo" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#0a1d37] text-[#0a1d37] hover:bg-[#0a1d37] hover:text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. CONTADORES ===== */}
      <section className="bg-[#0a1d37]/5 py-16 border-y border-[#0a1d37]/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {counters.map((c) => (
            <div key={c.label}>
              <p className="text-4xl md:text-5xl font-black text-[#0a1d37] mb-2">{c.value}</p>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-tighter">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 6. CAROUSEL DE LOGOS ===== */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">
            Marcas Representadas
          </p>
          <div className="overflow-hidden relative">
            <div className="logo-carousel-track">
              {[...orderedCompanies, ...orderedCompanies].map((company, idx) => (
                <div key={`${company.slug}-${idx}`} className="logo-carousel-item">
                  <div className={`${DARK_BG_LOGO_SLUGS.includes(company.slug) ? "bg-[#0a1d37] rounded px-2 py-1" : ""}`}>
                    <Image
                      src={company.logoPublicPath}
                      alt={`Logo da ${company.name}`}
                      width={140}
                      height={48}
                      className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. CTA / CONTATO (dark) ===== */}
      <section className="bg-[#0a1d37] py-20 px-4 md:px-10" id="contato">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-white mb-6 leading-tight">
              Pronto para direcionar sua demanda industrial?
            </h2>
            <p className="text-slate-300 mb-10 text-lg leading-relaxed">
              Entre em contato e descubra qual das 6 empresas representadas tem o catálogo técnico mais aderente ao seu contexto.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <HiOutlineMail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">E-mail</p>
                  <a href="mailto:vendas@raemtools.com.br" className="text-white font-bold hover:text-amber-400 transition-colors">
                    vendas@raemtools.com.br
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <HiOutlinePhone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">WhatsApp / Telefone</p>
                  <a href="tel:+5512988737347" className="text-white font-bold hover:text-amber-400 transition-colors">
                    +55 12 98873-7347
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <HiOutlineLocationMarker className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Localização</p>
                  <p className="text-white font-bold">Taubaté – São Paulo, SP</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Fale Conosco</h3>
            <p className="text-slate-400 text-sm mb-8">
              Escolha a forma mais rápida de iniciar o atendimento consultivo.
            </p>
            <div className="flex flex-col gap-4">
              <Link
                href={buildContactHref({ assunto: "consultoria-catalogo", origem: "home-contato" })}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg transition-colors shadow-lg text-center text-lg flex items-center justify-center gap-2"
              >
                Consultoria + Catálogo <HiArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={buildWhatsappHref({ origem: "home-contato" })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-lg transition-colors text-center text-lg"
              >
                Falar no WhatsApp
              </a>
              <Link
                href="/marcas"
                className="w-full text-slate-400 hover:text-white font-medium py-3 text-center text-sm transition-colors underline underline-offset-4"
              >
                Ver todas as 6 empresas →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
