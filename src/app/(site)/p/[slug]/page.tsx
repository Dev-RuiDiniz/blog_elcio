import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import { getCompanyPageDetail } from "@/data/companyDetails";
import {
  buildContactHref,
  getCompanyBySlug,
  getIntentDescription,
  getIntentLabel,
  getRelatedCompanies,
  getSolutionHref,
} from "@/lib/lead-context";

function getCompanyPageData(slug: string) {
  const company = getCompanyBySlug(slug);
  const detail = getCompanyPageDetail(slug);

  if (!company || !detail) {
    return null;
  }

  return {
    company,
    detail,
    relatedCompanies: getRelatedCompanies(company.slug, 3),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getCompanyPageData(slug);

  if (!data) {
    return {
      title: "Página não encontrada",
      description: "A página solicitada não foi encontrada.",
    };
  }

  const { company, detail } = data;

  return {
    title: `${company.name} | Hub B2B Elcio`,
    description: detail.seoDescription,
    keywords: [...company.solutionTypes, ...company.primaryApplications, ...company.comparisonTags],
    openGraph: {
      title: `${company.name} | Hub B2B Elcio`,
      description: detail.seoDescription,
      type: "website",
      images: [{ url: company.coverPublicPath }],
    },
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCompanyPageData(slug);

  if (!data) {
    notFound();
  }

  const { company, detail, relatedCompanies } = data;
  const primaryIntent = company.buyerIntents[0];

  return (
    <>
      <section className="relative overflow-hidden bg-[#07111f] pt-40 pb-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.15),_transparent_34%)]" />
        <div className="absolute inset-0 opacity-20">
          <Image src={company.coverPublicPath} alt="" fill priority className="object-cover" />
        </div>

        <div className="site-container relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-4xl">
              <span className="inline-block rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                {company.segment.replace(/-/g, " ")}
              </span>
              <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">{company.name}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-200">
                {detail.heroDescription}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={buildContactHref({
                    intent: primaryIntent,
                    empresa: company.slug,
                    origem: `${company.ctaSource}-hero`,
                  })}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-amber-600"
                >
                  {getIntentLabel(primaryIntent)}
                  <HiArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href={company.pdfPublicPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-white hover:text-[#07111f]"
                >
                  Ver catálogo técnico
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                Quando faz sentido falar com esta empresa
              </p>
              <div className="mt-6 space-y-3">
                {detail.idealFor.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-sm leading-relaxed text-slate-100">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                  Melhor intenção de entrada
                </p>
                <p className="mt-2 text-sm font-semibold text-white">{getIntentLabel(primaryIntent)}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {getIntentDescription(primaryIntent)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="site-container grid gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="site-badge">Posicionamento</span>
            <h2 className="site-heading mt-4">{detail.overviewTitle}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
              {detail.overviewParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
              Sinais de aderência
            </p>
            <div className="mt-6 space-y-3">
              {company.primaryApplications.map((application) => (
                <div key={application} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-4">
                  <HiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <p className="text-sm text-slate-700">{application}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="site-container grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <span className="site-badge">Principais entregas</span>
            <h2 className="mt-4 text-3xl font-black text-[#0a1d37]">O que esta empresa entrega</h2>
            <div className="mt-8 grid gap-4">
              {detail.products.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-[#0a1d37]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <span className="site-badge">Serviços e suporte</span>
            <h2 className="mt-4 text-3xl font-black text-[#0a1d37]">Como a operação é apoiada</h2>
            <div className="mt-8 grid gap-4">
              {detail.services.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-[#0a1d37]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="site-container grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-[#07111f] p-8 text-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
              Diferenciais
            </p>
            <div className="mt-6 space-y-3">
              {detail.differentiators.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                  <p className="text-sm leading-relaxed text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
              Setores e comparação
            </p>
            <h2 className="mt-4 text-3xl font-black text-[#0a1d37]">
              Onde esta empresa entra no hub e com quem comparar
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {detail.sectors.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  {sector}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-500">Cluster principal</p>
              <Link
                href={getSolutionHref(company.segment)}
                className="mt-2 inline-flex items-center gap-2 text-lg font-black text-[#0a1d37] hover:text-amber-600"
              >
                Explorar {company.segment.replace(/-/g, " ")}
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="site-container">
          <div className="max-w-3xl">
            <span className="site-badge">Compare com outras empresas</span>
            <h2 className="site-heading mt-4">
              Se esta não for a única opção, o hub mostra os caminhos mais próximos.
            </h2>
            <p className="site-copy mt-4">
              Estas empresas compartilham cluster, aplicações ou sinais de comparação com {company.name}.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {relatedCompanies.map((relatedCompany) => (
              <article
                key={relatedCompany.slug}
                className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={relatedCompany.coverPublicPath}
                    alt={`Capa da ${relatedCompany.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
                    {relatedCompany.segment.replace(/-/g, " ")}
                  </p>
                  <h3 className="mt-3 text-2xl font-black text-[#0a1d37]">{relatedCompany.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{relatedCompany.teaser}</p>
                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      href={`/p/${relatedCompany.slug}`}
                      className="inline-flex items-center justify-center rounded-xl bg-[#0a1d37] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#112948]"
                    >
                      Ver página da empresa
                    </Link>
                    <Link
                      href={buildContactHref({
                        intent: "entender-melhor-opcao",
                        empresa: relatedCompany.slug,
                        origem: `${company.slug}-compare-${relatedCompany.slug}`,
                      })}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-[#0a1d37] transition-colors hover:bg-slate-50"
                    >
                      Comparar com contexto
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07111f] py-24 text-white">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
              Próximo passo
            </span>
            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              O contato com {company.name} já pode sair com intenção e contexto.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Em vez de abrir uma conversa genérica, o hub prepara a intenção correta, preserva a
              empresa de interesse e mantém o fluxo alinhado ao problema do comprador.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 backdrop-blur-sm">
            <div className="grid gap-4">
              <Link
                href={buildContactHref({
                  intent: primaryIntent,
                  empresa: company.slug,
                  origem: `${company.ctaSource}-cta`,
                })}
                className="inline-flex items-center justify-between rounded-2xl bg-amber-500 px-5 py-4 font-bold text-white transition-colors hover:bg-amber-600"
              >
                {getIntentLabel(primaryIntent)}
                <HiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={buildContactHref({
                  intent: "entender-melhor-opcao",
                  empresa: company.slug,
                  origem: `${company.ctaSource}-cta-compare`,
                })}
                className="inline-flex items-center justify-between rounded-2xl border border-white/20 px-5 py-4 font-bold text-white transition-colors hover:bg-white/10"
              >
                Comparar dentro do hub
                <HiArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={company.pdfPublicPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-2xl border border-white/20 px-5 py-4 font-bold text-white transition-colors hover:bg-white/10"
              >
                Baixar catálogo técnico
                <HiArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
