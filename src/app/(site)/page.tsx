import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { COMPANY_OPTIONS, buildContactHref, buildWhatsappHref } from "@/lib/lead-context";

const orderedCompanies = [...COMPANY_OPTIONS].sort((a, b) => a.order - b.order);

const methodSteps = [
  {
    title: "1. Triagem da Demanda",
    description: "Você informa seu cenário técnico e comercial para estruturar o primeiro direcionamento.",
  },
  {
    title: "2. Consultoria Inicial",
    description: "Elcio compara opções entre as empresas representadas e orienta a melhor abordagem.",
  },
  {
    title: "3. Encaminhamento Comercial",
    description: "Sua demanda segue para o canal correto com mais contexto e velocidade de atendimento.",
  },
];

const valuePoints = [
  { label: "Empresas Representadas", value: "6" },
  { label: "Ponto Único de Contato", value: "1" },
  { label: "Foco", value: "B2B Industrial" },
];

export default function Home() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-4 block">
              Representação Comercial
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-black mb-6 leading-tight">
              Elcio conecta sua demanda à empresa certa.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl">
              Atendimento consultivo para reduzir ruído comercial, acelerar o primeiro contato e direcionar o catálogo técnico mais aderente ao seu contexto.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800" asChild>
                <Link href={buildContactHref({ assunto: "consultoria-catalogo", origem: "home-hero" })}>
                  Solicitar Consultoria + Catálogo
                  <HiArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white" asChild>
                <Link href="/marcas">Conhecer as 6 empresas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3 block">Empresas Representadas</span>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-black">Portfólio comercial consolidado</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderedCompanies.map((company) => (
              <article key={company.slug} className="border border-gray-100 bg-gray-50/70 p-8 flex flex-col">
                <h3 className="text-2xl font-serif font-semibold text-black mb-3">{company.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{company.teaser}</p>
                <div className="flex flex-col gap-3">
                  <Button className="bg-black text-white hover:bg-gray-800" asChild>
                    <Link href={`/p/${company.slug}`}>Ver página da empresa</Link>
                  </Button>
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white" asChild>
                    <Link
                      href={buildContactHref({
                        assunto: "consultoria-catalogo",
                        empresa: company.slug,
                        origem: `${company.ctaSource}-home-grid`,
                      })}
                    >
                      Abrir atendimento
                    </Link>
                  </Button>
                  <a
                    href={company.pdfPublicPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:text-black underline"
                  >
                    Baixar catálogo técnico
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-10">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3 block">Método de Atendimento</span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-black">Processo comercial em três etapas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {methodSteps.map((step) => (
              <article key={step.title} className="bg-white border border-gray-100 p-7">
                <h3 className="text-xl font-serif font-semibold text-black mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3 block">Prova de Valor</span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-black mb-6">
              Menos ruído, mais clareza para avançar no comercial
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              A proposta é simplificar sua jornada de decisão e reduzir retrabalho no primeiro contato com fornecedores.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {valuePoints.map((item) => (
                <div key={item.label} className="border border-gray-100 bg-gray-50 p-6">
                  <p className="text-3xl font-serif font-semibold text-black mb-2">{item.value}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800" asChild>
                <Link href={buildContactHref({ assunto: "consultoria-catalogo", origem: "home-cta-final" })}>
                  Quero Consultoria + Catálogo
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white" asChild>
                <a href={buildWhatsappHref({ origem: "home-cta-final" })} target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
