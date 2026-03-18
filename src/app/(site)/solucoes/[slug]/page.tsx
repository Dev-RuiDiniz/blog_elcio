import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import {
  buildContactHref,
  getCompaniesBySegment,
  getHubSegmentBySlug,
} from "@/lib/lead-context";

function getSolutionPageData(slug: string) {
  const segment = getHubSegmentBySlug(slug);

  if (!segment) return null;

  const companies = getCompaniesBySegment(slug);

  return {
    segment,
    companies,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getSolutionPageData(slug);

  if (!data) {
    return {
      title: "Página não encontrada",
      description: "A página solicitada não foi encontrada.",
    };
  }

  return {
    title: `${data.segment.title} | Hub B2B Elcio`,
    description: data.segment.description,
    openGraph: {
      title: `${data.segment.title} | Hub B2B Elcio`,
      description: data.segment.description,
      type: "website",
    },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getSolutionPageData(slug);

  if (!data) {
    notFound();
  }

  const { segment, companies } = data;

  return (
    <>
      <section className="relative overflow-hidden bg-[#07111f] pt-40 pb-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.16),_transparent_34%)]" />
        <div className="site-container relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
              Página-ponte do hub
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">{segment.heroTitle}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">
              {segment.heroDescription}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={buildContactHref({
                  intent: "entender-melhor-opcao",
                  origem: `solucao-${segment.slug}-hero`,
                })}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-amber-600"
              >
                Quero orientação neste cluster
                <HiArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/marcas"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-white hover:text-[#07111f]"
              >
                Voltar ao hub completo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="site-container grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="site-badge">Quando este cluster faz sentido</span>
            <h2 className="site-heading mt-4">{segment.title}</h2>
            <p className="site-copy mt-5">{segment.description}</p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
              Ideal para
            </p>
            <div className="mt-6 space-y-3">
              {segment.idealFor.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-4">
                  <HiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="site-container">
          <div className="max-w-3xl">
            <span className="site-badge">Empresas relacionadas</span>
            <h2 className="site-heading mt-4">
              Empresas do portfólio que entram neste cluster
            </h2>
            <p className="site-copy mt-4">
              Use esta página para partir da necessidade e depois aprofundar a empresa mais aderente.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {companies.map((company) => (
              <article key={company.slug} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[16/10]">
                  <Image src={company.coverPublicPath} alt={`Capa da ${company.name}`} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-[#0a1d37]">{company.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{company.teaser}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {company.solutionTypes.slice(0, 3).map((type) => (
                      <span
                        key={type}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      href={`/p/${company.slug}`}
                      className="inline-flex items-center justify-center rounded-xl bg-[#0a1d37] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#112948]"
                    >
                      Ver página da empresa
                    </Link>
                    <Link
                      href={buildContactHref({
                        intent: "entender-melhor-opcao",
                        empresa: company.slug,
                        origem: `solucao-${segment.slug}-${company.slug}`,
                      })}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-[#0a1d37] transition-colors hover:bg-slate-50"
                    >
                      Abrir contato com contexto
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
