"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  COMPANY_OPTIONS,
  buildContactHref,
  buildWhatsappHref,
  getCompanyNameFromSlug,
  normalizeCompanySlug,
} from "@/lib/lead-context";

interface SectionData {
  title: string;
  subtitle: string;
  description: string;
  content: {
    phone: string;
    phoneRaw: string;
    whatsappMessage: string;
    buttonText: string;
    consultorButtonText: string;
  };
}

interface LeadForm {
  name: string;
  email: string;
  phone: string;
  companySlug: string;
}

const NONE_VALUE = "none";

const defaultData: SectionData = {
  title: "Consultoria + Catálogo",
  subtitle: "Primeiro Contato",
  description:
    "Fale com o Elcio, receba apoio comercial e tenha acesso ao catálogo mais aderente à sua necessidade.",
  content: {
    phone: "(11) 98198-2279",
    phoneRaw: "+5511981982279",
    whatsappMessage: "Olá! Quero consultoria e catálogo.",
    buttonText: "Solicitar Consultoria + Catálogo",
    consultorButtonText: "Falar no WhatsApp",
  },
};

export function CatalogCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [data, setData] = useState<SectionData>(defaultData);
  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: "",
    email: "",
    phone: "",
    companySlug: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/home-sections?sectionId=catalog-cta")
      .then((res) => res.json())
      .then((result) => {
        if (result.section) {
          setData({
            title: result.section.title || defaultData.title,
            subtitle: result.section.subtitle || defaultData.subtitle,
            description: result.section.description || defaultData.description,
            content: result.section.content || defaultData.content,
          });
        }
      })
      .catch(() => {});
  }, []);

  const selectedCompanySlug = normalizeCompanySlug(leadForm.companySlug);
  const selectedCompanyName = getCompanyNameFromSlug(selectedCompanySlug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.phone) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/kommo/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          message: "Solicitou consultoria + catálogo pela home.",
          source: "CTA Home",
          companySlug: selectedCompanySlug,
          companyName: selectedCompanyName,
          interestType: "consultoria-catalogo",
          originPage: "home",
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar");

      setSubmitSuccess(true);
      setLeadForm({ name: "", email: "", phone: "", companySlug: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              {data.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-6">
              {data.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {data.description}
            </p>
          </motion.div>

          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-50 p-12 text-center max-w-xl mx-auto mb-12"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-black text-white rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-black mb-3">
                Solicitação enviada
              </h3>
              <p className="text-gray-600 mb-6">
                Recebemos seus dados e retornaremos em breve com o primeiro atendimento.
              </p>
              <Button
                onClick={() => setSubmitSuccess(false)}
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
              >
                Voltar
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-3 max-w-2xl mx-auto mb-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="Nome completo"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="h-12 px-4 border-gray-200 focus:border-black focus:ring-black"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="h-12 px-4 border-gray-200 focus:border-black focus:ring-black"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="Telefone / WhatsApp"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="h-12 px-4 border-gray-200 focus:border-black focus:ring-black"
                    required
                  />
                  <select
                    value={leadForm.companySlug || NONE_VALUE}
                    onChange={(e) =>
                      setLeadForm((prev) => ({
                        ...prev,
                        companySlug: e.target.value === NONE_VALUE ? "" : e.target.value,
                      }))
                    }
                    className="h-12 px-4 border border-gray-200 bg-white text-sm"
                  >
                    <option value={NONE_VALUE}>Empresa de interesse (opcional)</option>
                    {COMPANY_OPTIONS.map((company) => (
                      <option key={company.slug} value={company.slug}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 bg-black text-white hover:bg-gray-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : data.content.buttonText}
                </Button>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white" asChild>
                  <a
                    href={buildWhatsappHref({
                      assunto: "consultoria-catalogo",
                      empresa: selectedCompanySlug,
                      origem: "home-cta",
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.content.consultorButtonText}
                  </a>
                </Button>
                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white" asChild>
                  <a
                    href={buildContactHref({
                      assunto: "consultoria-catalogo",
                      empresa: selectedCompanySlug,
                      origem: "home-cta",
                    })}
                  >
                    Formulário completo
                  </a>
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
