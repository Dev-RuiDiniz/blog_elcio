"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { HiArrowRight, HiOutlineDocumentDownload } from "react-icons/hi";
import { Button } from "@/components/ui/button";

interface MalettiCatalogoProps {
  content?: Record<string, unknown>;
}

export function MalettiCatalogo({ content = {} }: MalettiCatalogoProps) {
  const badge = (content.badge as string) || "Material Exclusivo";
  const title = (content.title as string) || "Catálogo Maletti";
  const description = (content.description as string) || "Acesse o Catálogo Maletti e tenha em mãos a ferramenta completa para o seu projeto. Conheça todas as linhas de produtos, especificações técnicas e opções de personalização.";
  const catalogImage = (content.catalogImage as string) || "/images/site/PLANIMETRIA-La-Beautique---Mongolia-Multifunzione.jpg";
  const formTitle = (content.formTitle as string) || "Solicite seu Catálogo";
  const formDescription = (content.formDescription as string) || "Preencha seus dados e receba o catálogo Maletti.";
  const buttonText = (content.buttonText as string) || "Receber Catálogo";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with API
    setSubmitted(true);
  };

  return (
    <section id="catalogo" ref={ref} className="py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              {badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-6">
              {title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {description}
            </p>

            <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
              <Image
                src={catalogImage}
                alt="Catálogo Maletti"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm">Catálogo Digital Completo</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {!submitted ? (
              <div className="bg-white p-8 lg:p-10">
                <h3 className="text-2xl font-serif font-semibold text-black mb-6">
                  {formTitle}
                </h3>
                <p className="text-gray-600 mb-8">
                  {formDescription}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Empresa / Salão
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                      placeholder="Nome do seu negócio"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-black text-white hover:bg-gray-800 transition-all duration-300 group mt-4"
                  >
                    {buttonText}
                    <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            ) : (
              <div className="bg-white p-8 lg:p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-black mb-4">
                  Solicitação Enviada!
                </h3>
                <p className="text-gray-600">
                  Em breve você receberá o catálogo Maletti em seu e-mail. 
                  Nossa equipe também entrará em contato para auxiliá-lo.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
