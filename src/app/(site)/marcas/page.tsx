"use client";

import Link from "next/link";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
import {
  COMPANY_CARD_CONTAINER_CLASS,
  COMPANY_CARD_IMAGE_CLASS,
  COMPANY_CARD_IMAGE_QUALITY,
  COMPANY_CARD_IMAGE_SIZES,
  COMPANY_COUNT,
  COMPANY_OPTIONS,
} from "@/lib/lead-context";

const orderedCompanies = [...COMPANY_OPTIONS].sort((a, b) => a.order - b.order);

export default function MarcasPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#07111f] pt-40 pb-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),_transparent_36%)]" />
        <div className="site-container relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
              Empresas Representadas
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              Um portfólio B2B com {COMPANY_COUNT} empresas industriais apresentadas com clareza.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">
              Esta página reúne as empresas representadas pelo Elcio em uma vitrine direta, limpa e
              objetiva para facilitar a leitura do portfólio.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f4ef] py-24">
        <div className="site-container">
          <div className="mb-14 max-w-3xl">
            <span className="site-badge">Portfólio</span>
            <h2 className="site-heading mt-4">As empresas do hub em uma visualização mais limpa.</h2>
            <p className="site-copy mt-4">
              Cada página individual aprofunda a proposta, a atuação e os diferenciais de cada
              empresa representada.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {orderedCompanies.map((company) => (
              <article
                key={company.slug}
                className="group overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
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
                </div>

                <div className="flex h-full flex-col p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-amber-600">
                    {company.segment.replace(/-/g, " ")}
                  </p>
                  <h3 className="mt-3 text-3xl font-black leading-tight text-[#0a1d37]">
                    {company.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{company.teaser}</p>

                  <div className="mt-8 pt-2">
                    <Link
                      href={`/p/${company.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0a1d37] transition-colors hover:text-amber-600"
                    >
                      Ver página da empresa
                      <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
