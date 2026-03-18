"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiArrowRight, HiOutlineSearch } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  COMPANY_CARD_CONTAINER_CLASS,
  COMPANY_CARD_IMAGE_CLASS,
  COMPANY_CARD_IMAGE_QUALITY,
  COMPANY_CARD_IMAGE_SIZES,
  COMPANY_COUNT,
  COMPANY_OPTIONS,
  HUB_INTENT_OPTIONS,
  HUB_SEGMENTS,
  type HubSegment,
  buildContactHref,
  getCompanyCatalogHref,
  getIntentLabel,
  getSolutionHref,
} from "@/lib/lead-context";

const orderedCompanies = [...COMPANY_OPTIONS].sort((a, b) => a.order - b.order);

export default function MarcasPage() {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState<HubSegment | "all">("all");

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orderedCompanies.filter((company) => {
      const matchesSegment = segment === "all" || company.segment === segment;
      const matchesSearch =
        !query ||
        company.name.toLowerCase().includes(query) ||
        company.teaser.toLowerCase().includes(query) ||
        company.solutionTypes.some((type) => type.toLowerCase().includes(query)) ||
        company.primaryApplications.some((application) => application.toLowerCase().includes(query));

      return matchesSegment && matchesSearch;
    });
  }, [search, segment]);

  return (
    <>
      <section className="relative overflow-hidden bg-[#07111f] pt-40 pb-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.2),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.16),_transparent_34%)]" />
        <div className="site-container relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
              Hub B2B de Empresas
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              Compare as {COMPANY_COUNT} empresas por solução, aplicação e intenção de compra.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">
              Esta página deixa de ser só um catálogo de logos e passa a operar como o núcleo do hub:
              você filtra por cluster de solução, lê quando falar com cada empresa e entra no contato já
              com contexto.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button className="bg-amber-500 text-white hover:bg-amber-600" asChild>
                <Link
                  href={buildContactHref({
                    intent: "entender-melhor-opcao",
                    origem: "marcas-hub-hero",
                  })}
                >
                  Quero ajuda para comparar
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-[#07111f]"
                asChild
              >
                <Link href="/sobre">Entender como o hub opera</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="site-container">
          <div className="grid gap-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
                Descoberta guiada
              </p>
              <h2 className="mt-3 text-3xl font-black text-[#0a1d37]">
                Comece pela necessidade, não pela marca.
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Filtre por cluster de solução ou pesquise palavras como usinagem, filtragem,
                motores, acionamentos ou manutenção eletrônica.
              </p>
            </div>
            <div className="relative">
              <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Pesquisar por empresa, aplicação ou solução"
                className="h-13 rounded-xl border-slate-200 bg-white pl-12"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setSegment("all")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                segment === "all"
                  ? "bg-[#0a1d37] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Todas as soluções
            </button>
            {HUB_SEGMENTS.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setSegment(item.slug)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  segment === item.slug
                    ? "bg-[#0a1d37] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="site-container">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="site-badge">Leitura por cluster</span>
              <h2 className="site-heading mt-4">
                Quando falar com cada grupo de empresas do portfólio.
              </h2>
              <p className="site-copy mt-4">
                Cada cluster abaixo organiza rapidamente o tipo de cenário em que faz mais sentido
                abrir a conversa.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-2">
            {HUB_SEGMENTS.map((item) => {
              const companies = orderedCompanies.filter((company) => company.segment === item.slug);
              return (
                <article key={item.slug} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-xl">
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
                        {item.label}
                      </p>
                      <h3 className="mt-3 text-3xl font-black text-[#0a1d37]">{item.title}</h3>
                      <p className="mt-4 text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                    <Link
                      href={getSolutionHref(item.slug)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0a1d37] hover:text-amber-600"
                    >
                      Ver página do cluster
                      <HiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.idealFor.map((signal) => (
                      <span
                        key={signal}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {companies.map((company) => (
                      <div key={company.slug} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-black text-[#0a1d37]">{company.name}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{company.teaser}</p>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="site-container">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="site-badge">Empresas do hub</span>
              <h2 className="site-heading mt-4">
                Resultado da filtragem: {filteredCompanies.length} empresa(s).
              </h2>
              <p className="site-copy mt-4">
                Cada card agora mostra não apenas a empresa, mas o cluster, aplicações principais e a
                melhor ação para continuar a jornada.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredCompanies.map((company) => (
              <article
                key={company.slug}
                className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={COMPANY_CARD_CONTAINER_CLASS}>
                  <Image
                    src={company.coverPublicPath}
                    alt={`Imagem oficial da ${company.name}`}
                    fill
                    quality={COMPANY_CARD_IMAGE_QUALITY}
                    sizes={COMPANY_CARD_IMAGE_SIZES}
                    className={COMPANY_CARD_IMAGE_CLASS}
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-[#07111f] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-amber-300">
                    {company.segment.replace(/-/g, " ")}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-8">
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

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                      Melhor entrada
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#0a1d37]">
                      {getIntentLabel(company.buyerIntents[0])}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <Button className="bg-amber-500 text-white hover:bg-amber-600" asChild>
                      <Link href={`/p/${company.slug}`}>
                        Ver página da empresa
                        <HiArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#0a1d37] text-[#0a1d37] hover:bg-[#0a1d37] hover:text-white"
                      asChild
                    >
                      <Link
                        href={buildContactHref({
                          intent: company.buyerIntents[0],
                          empresa: company.slug,
                          origem: `${company.ctaSource}-marcas-hub`,
                        })}
                      >
                        Abrir com contexto
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100" asChild>
                      <a href={getCompanyCatalogHref(company.slug)} target="_blank" rel="noopener noreferrer">
                        Ver catálogo PDF
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1d37] py-24 text-white">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
                Intenções do hub
              </span>
              <h2 className="mt-4 text-3xl font-black md:text-5xl">
                O próximo passo muda conforme a intenção comercial.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
                O hub consolida três entradas controladas para reduzir contatos genéricos e melhorar
                a triagem antes do encaminhamento.
              </p>
            </div>

            <div className="grid gap-4">
              {HUB_INTENT_OPTIONS.map((intent) => (
                <Link
                  key={intent.value}
                  href={buildContactHref({
                    intent: intent.value,
                    origem: `marcas-intent-${intent.value}`,
                  })}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 transition-colors hover:bg-white/10"
                >
                  <p className="text-sm font-black text-white">{intent.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{intent.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
