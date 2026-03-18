"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
  COMPANY_CARD_CONTAINER_CLASS,
  COMPANY_CARD_IMAGE_CLASS,
  COMPANY_CARD_IMAGE_QUALITY,
  COMPANY_CARD_IMAGE_SIZES,
  COMPANY_COUNT,
  COMPANY_OPTIONS,
  buildContactHref,
  getCompanyCatalogHref,
} from "@/lib/lead-context";

interface PageBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
  active: boolean;
}

export default function MarcasPage() {
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const brandsRef = useRef(null);
  const brandsInView = useInView(brandsRef, { once: true, margin: "-80px" });
  const orderedCompanies = [...COMPANY_OPTIONS].sort((a, b) => a.order - b.order);

  const heroBlock = blocks.find((block) => block.type === "brands-hero")?.content || {};
  const sectionBlock = blocks.find((block) => block.type === "brands-section")?.content || {};
  const partnershipBlock = blocks.find((block) => block.type === "brands-partnership")?.content || {};
  const ctaBlock = blocks.find((block) => block.type === "brands-cta")?.content || {};

  useEffect(() => {
    fetch("/api/pages/marcas")
      .then((response) => response.json())
      .then((data) => setBlocks(data.page?.blocks || []))
      .catch(() => {});
  }, []);

  const titleParts = ((heroBlock.title as string) || "Empresas|Representadas|por Elcio").split("|");

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20 lg:pb-28 bg-[#0a1d37] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.22),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.08),_transparent_30%)]" />
        <div className="site-container relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-400 mb-4">
                {(heroBlock.badge as string) || "Empresas Representadas"}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                {titleParts.map((part, index) => (
                  <span key={`${part}-${index}`}>
                    {part}
                    {index < titleParts.length - 1 && <br />}
                  </span>
                ))}
              </h1>
                <p className="text-slate-200 text-lg leading-relaxed mb-8 max-w-3xl">
                {(heroBlock.description as string) ||
                  `Conheça as ${COMPANY_COUNT} empresas do portfólio de representação comercial do Elcio e encontre a opção ideal para abrir sua conversa comercial.`}
              </p>
              <Button
                size="lg"
                className="bg-amber-500 text-white hover:bg-amber-600 transition-all duration-300 group"
                asChild
              >
                <Link
                  href={buildContactHref({
                    assunto: "consultoria-catalogo",
                    origem: "marcas-hub-hero",
                  })}
                >
                  {(heroBlock.buttonText as string) || "Quero Consultoria + Catálogo"}
                  <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="ml-3 border-white text-white bg-transparent hover:bg-white hover:text-[#0a1d37]"
                asChild
              >
                <Link href="/sobre">Conhecer o Elcio</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={brandsRef} className="py-24 bg-white">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={brandsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-500 mb-4">
              {(sectionBlock.badge as string) || "Portfólio"}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0a1d37]">
              {(sectionBlock.title as string) || "Empresas representadas"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderedCompanies.map((company, index) => (
              <motion.article
                key={company.slug}
                initial={{ opacity: 0, y: 28 }}
                animate={brandsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="h-full flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={COMPANY_CARD_CONTAINER_CLASS}>
                  <Image
                    src={company.coverPublicPath}
                    alt={`Imagem oficial da ${company.name}`}
                    fill
                    priority={index < 2}
                    quality={COMPANY_CARD_IMAGE_QUALITY}
                    sizes={COMPANY_CARD_IMAGE_SIZES}
                    className={COMPANY_CARD_IMAGE_CLASS}
                  />
                  <div className="absolute top-4 left-4 rounded-lg bg-white/95 px-3 py-2 shadow-sm">
                    <Image
                      src={company.logoPublicPath}
                      alt={`Logo da ${company.name}`}
                      width={120}
                      height={36}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-amber-600 font-bold mb-3">
                    Empresa {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-black text-[#0a1d37] mb-3">
                    {company.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    {company.teaser}
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button className="bg-amber-500 text-white hover:bg-amber-600" asChild>
                      <Link href={`/p/${company.slug}`}>
                        Ver página da empresa
                        <HiArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-[#0a1d37] text-[#0a1d37] hover:bg-[#0a1d37] hover:text-white" asChild>
                      <Link
                        href={buildContactHref({
                          assunto: "consultoria-catalogo",
                          empresa: company.slug,
                          origem: `${company.ctaSource}-marcas-grid`,
                        })}
                      >
                        Solicitar consultoria
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100" asChild>
                      <a href={getCompanyCatalogHref(company.slug)} target="_blank" rel="noopener noreferrer">
                        Ver catálogo PDF
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="site-container">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-500 mb-4">
              {(partnershipBlock.badge as string) || "Atendimento Comercial"}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0a1d37] mb-6">
              {(partnershipBlock.title as string) || "Centralize seu primeiro contato"}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {(partnershipBlock.description as string) ||
                "Com o Elcio, você inicia o contato comercial de forma orientada, comparando opções entre empresas representadas e acelerando a tomada de decisão."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a1d37] text-white">
        <div className="site-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-400 mb-4">
              Próximo passo
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              {(ctaBlock.title as string) || "Pronto para avançar com sua demanda?"}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              {(ctaBlock.description as string) ||
                "Clique abaixo e inicie sua conversa com o CTA oficial: consultoria comercial + catálogo técnico."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600" asChild>
                <Link
                  href={buildContactHref({
                    assunto: "consultoria-catalogo",
                    origem: "marcas-hub-cta",
                  })}
                >
                  {(ctaBlock.buttonText as string) || "Solicitar Consultoria + Catálogo"}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-[#0a1d37]"
                asChild
              >
                <Link href={(ctaBlock.secondaryLink as string) || "/sobre"}>
                  {(ctaBlock.secondaryButtonText as string) || "Conhecer o Elcio"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
