"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineDownload,
  HiOutlineChat,
  HiOutlineCalendar,
} from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COMPANY_OPTIONS,
  buildContactHref,
  buildWhatsappHref,
  getCompanyNameFromSlug,
  normalizeCompanySlug,
} from "@/lib/lead-context";

const NONE_VALUE = "none";
const DEFAULT_SUBJECT = "consultoria-catalogo";
const ALLOWED_SUBJECTS = new Set([
  "consultoria-catalogo",
  "catalogo",
  "orcamento",
  "duvidas",
  "visita",
  "outros",
]);

function normalizeAssunto(value?: string | null): string {
  if (!value) return DEFAULT_SUBJECT;
  const normalized = value.trim().toLowerCase();
  return ALLOWED_SUBJECTS.has(normalized) ? normalized : DEFAULT_SUBJECT;
}

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  city: z.string().optional(),
  companySlug: z.string().optional(),
  subject: z.string().min(1, "Selecione um assunto"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

const catalogSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  city: z.string().optional(),
  companySlug: z.string().optional(),
  businessType: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;
type CatalogFormData = z.infer<typeof catalogSchema>;

const contactOptions = [
  {
    icon: HiOutlineDownload,
    title: "Receber Catálogo",
    description: "Receba o catálogo e entenda rapidamente as soluções disponíveis.",
    action: "catalog",
  },
  {
    icon: HiOutlineChat,
    title: "Consultoria Comercial",
    description: "Converse com o Elcio para direcionar a melhor opção para sua demanda.",
    action: "contact",
  },
  {
    icon: HiOutlineCalendar,
    title: "Primeiro Atendimento",
    description: "Inicie o contato agora para avançar com próximos passos e orçamento.",
    action: "contact",
  },
];

function ContatoContent() {
  const searchParams = useSearchParams();
  const assuntoParam = normalizeAssunto(searchParams.get("assunto"));
  const empresaParam = normalizeCompanySlug(searchParams.get("empresa"));
  const origemParam = (searchParams.get("origem") || "contato").trim() || "contato";
  const originContext =
    origemParam === "contato" || origemParam.startsWith("contato-")
      ? origemParam
      : `contato-${origemParam}`;
  const orderedCompanies = [...COMPANY_OPTIONS].sort((a, b) => a.order - b.order);

  const [activeForm, setActiveForm] = useState<"contact" | "catalog">(
    assuntoParam === "catalogo" ? "catalog" : "contact"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      companySlug: empresaParam || "",
      subject: assuntoParam === "catalogo" ? DEFAULT_SUBJECT : assuntoParam,
      message: "",
    },
  });

  const catalogForm = useForm<CatalogFormData>({
    resolver: zodResolver(catalogSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      companySlug: empresaParam || "",
      businessType: "",
    },
  });

  useEffect(() => {
    if (assuntoParam === "catalogo") {
      setActiveForm("catalog");
      contactForm.setValue("subject", DEFAULT_SUBJECT);
    }
    if (assuntoParam !== "catalogo") {
      setActiveForm("contact");
      contactForm.setValue("subject", assuntoParam);
    }
  }, [assuntoParam, contactForm]);

  useEffect(() => {
    if (!empresaParam) return;
    contactForm.setValue("companySlug", empresaParam);
    catalogForm.setValue("companySlug", empresaParam);
  }, [empresaParam, contactForm, catalogForm]);

  const selectedCompanySlug = normalizeCompanySlug(
    activeForm === "contact"
      ? contactForm.watch("companySlug")
      : catalogForm.watch("companySlug")
  );

  const selectedCompanyName = getCompanyNameFromSlug(selectedCompanySlug);

  const onContactSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const companySlug = normalizeCompanySlug(data.companySlug) || empresaParam;
      const companyName = getCompanyNameFromSlug(companySlug);
      const normalizedSubject = normalizeAssunto(data.subject);
      const interestType = normalizedSubject === "catalogo" ? DEFAULT_SUBJECT : normalizedSubject;
      const source = `Formulário Contato - ${originContext}`;

      const response = await fetch("/api/kommo/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          source,
          companySlug,
          companyName,
          interestType,
          originPage: originContext,
          message: `Assunto: ${interestType}\nCidade: ${data.city || "Não informada"}\nEmpresa: ${companyName || "Não informada"}\n\n${data.message}`,
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar");
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCatalogSubmit = async (data: CatalogFormData) => {
    setIsSubmitting(true);
    try {
      const companySlug = normalizeCompanySlug(data.companySlug) || empresaParam;
      const companyName = getCompanyNameFromSlug(companySlug);
      const source = `Formulário Catálogo - ${originContext}`;

      const response = await fetch("/api/kommo/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          source,
          companySlug,
          companyName,
          interestType: DEFAULT_SUBJECT,
          originPage: originContext,
          message: `Tipo de Negócio: ${data.businessType || "Não informado"}\nCidade: ${data.city || "Não informada"}\nEmpresa: ${companyName || "Não informada"}\n\nSolicitou catálogo com apoio comercial.`,
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar");
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappHref = buildWhatsappHref({
    assunto: DEFAULT_SUBJECT,
    empresa: selectedCompanySlug,
    origem: originContext,
    extraMessage: selectedCompanyName
      ? `Gostaria de atendimento para ${selectedCompanyName}.`
      : "Gostaria de atendimento comercial.",
  });

  return (
    <>
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4 block">
              Consultoria + Catálogo
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-zinc-900 mb-6">
              Primeiro Contato Comercial
            </h1>
            <p className="text-zinc-600 text-lg leading-relaxed">
              Centralize o atendimento com o Elcio para receber catálogo técnico,
              orientação comercial e encaminhamento rápido da sua demanda.
            </p>
            {(empresaParam || originContext !== "contato") && (
              <p className="text-sm text-zinc-500 mt-4">
                Contexto: {selectedCompanyName || "Empresa não definida"} | Origem: {originContext}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-zinc-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <motion.button
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                onClick={() => {
                  setActiveForm(option.action === "catalog" ? "catalog" : "contact");
                  setSubmitSuccess(false);
                }}
                className="flex items-start gap-4 p-6 bg-white border border-zinc-200 hover:border-zinc-700 hover:shadow-md transition-all text-left group"
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                  <option.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-1">{option.title}</h3>
                  <p className="text-zinc-500 text-sm">{option.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => {
                    setActiveForm("contact");
                    setSubmitSuccess(false);
                  }}
                  className={`px-6 py-3 text-sm font-medium transition-all ${
                    activeForm === "contact"
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  Consultoria Comercial
                </button>
                <button
                  onClick={() => {
                    setActiveForm("catalog");
                    setSubmitSuccess(false);
                  }}
                  className={`px-6 py-3 text-sm font-medium transition-all ${
                    activeForm === "catalog"
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  Receber Catálogo
                </button>
              </div>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-zinc-50 p-12 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-zinc-900 text-white rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-zinc-900 mb-3">
                    Solicitação Enviada
                  </h3>
                  <p className="text-zinc-600 mb-6">
                    Recebemos seus dados e retornaremos com o primeiro atendimento em breve.
                  </p>
                  <Button
                    onClick={() => setSubmitSuccess(false)}
                    variant="outline"
                    className="border-zinc-700 text-zinc-900 hover:bg-zinc-900 hover:text-white"
                  >
                    Enviar nova solicitação
                  </Button>
                </motion.div>
              ) : activeForm === "contact" ? (
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Nome completo *</Label>
                      <Input id="name" {...contactForm.register("name")} className="mt-2 h-12" placeholder="Seu nome" />
                      {contactForm.formState.errors.name && (
                        <p className="text-red-500 text-sm mt-1">{contactForm.formState.errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input id="email" type="email" {...contactForm.register("email")} className="mt-2 h-12" placeholder="seu@email.com" />
                      {contactForm.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{contactForm.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                      <Input id="phone" {...contactForm.register("phone")} className="mt-2 h-12" placeholder="(11) 99999-9999" />
                      {contactForm.formState.errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{contactForm.formState.errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" {...contactForm.register("city")} className="mt-2 h-12" placeholder="São Paulo, SP" />
                    </div>
                  </div>

                  <div>
                    <Label>Empresa de Interesse</Label>
                    <Select
                      value={contactForm.watch("companySlug") || NONE_VALUE}
                      onValueChange={(value) =>
                        contactForm.setValue("companySlug", value === NONE_VALUE ? "" : value)
                      }
                    >
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue placeholder="Selecione uma empresa (opcional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={NONE_VALUE}>Não definir agora</SelectItem>
                        {orderedCompanies.map((company) => (
                          <SelectItem key={company.slug} value={company.slug}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Assunto *</Label>
                    <Select
                      value={contactForm.watch("subject")}
                      onValueChange={(value) => contactForm.setValue("subject", value)}
                    >
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue placeholder="Selecione um assunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultoria-catalogo">Consultoria + Catálogo</SelectItem>
                        <SelectItem value="orcamento">Solicitar Orçamento</SelectItem>
                        <SelectItem value="duvidas">Dúvidas Técnicas</SelectItem>
                        <SelectItem value="visita">Agendar Reunião</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                    {contactForm.formState.errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{contactForm.formState.errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      {...contactForm.register("message")}
                      className="mt-2 min-h-[150px]"
                      placeholder="Conte brevemente seu objetivo e contexto."
                    />
                    {contactForm.formState.errors.message && (
                      <p className="text-red-500 text-sm mt-1">{contactForm.formState.errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Solicitar Consultoria"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={catalogForm.handleSubmit(onCatalogSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="cat-name">Nome completo *</Label>
                      <Input id="cat-name" {...catalogForm.register("name")} className="mt-2 h-12" placeholder="Seu nome" />
                      {catalogForm.formState.errors.name && (
                        <p className="text-red-500 text-sm mt-1">{catalogForm.formState.errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cat-email">E-mail *</Label>
                      <Input id="cat-email" type="email" {...catalogForm.register("email")} className="mt-2 h-12" placeholder="seu@email.com" />
                      {catalogForm.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{catalogForm.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="cat-phone">Telefone/WhatsApp *</Label>
                      <Input id="cat-phone" {...catalogForm.register("phone")} className="mt-2 h-12" placeholder="(11) 99999-9999" />
                      {catalogForm.formState.errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{catalogForm.formState.errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cat-city">Cidade</Label>
                      <Input id="cat-city" {...catalogForm.register("city")} className="mt-2 h-12" placeholder="São Paulo, SP" />
                    </div>
                  </div>

                  <div>
                    <Label>Empresa de Interesse</Label>
                    <Select
                      value={catalogForm.watch("companySlug") || NONE_VALUE}
                      onValueChange={(value) =>
                        catalogForm.setValue("companySlug", value === NONE_VALUE ? "" : value)
                      }
                    >
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue placeholder="Selecione uma empresa (opcional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={NONE_VALUE}>Não definir agora</SelectItem>
                        {orderedCompanies.map((company) => (
                          <SelectItem key={company.slug} value={company.slug}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="businessType">Tipo de Negócio</Label>
                    <Select
                      value={catalogForm.watch("businessType") || NONE_VALUE}
                      onValueChange={(value) =>
                        catalogForm.setValue("businessType", value === NONE_VALUE ? "" : value)
                      }
                    >
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={NONE_VALUE}>Não informar</SelectItem>
                        <SelectItem value="industria">Indústria</SelectItem>
                        <SelectItem value="distribuidor">Distribuidor</SelectItem>
                        <SelectItem value="integrador">Integrador</SelectItem>
                        <SelectItem value="engenharia">Engenharia</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Receber Catálogo"}
                  </Button>

                  <p className="text-xs text-zinc-500 text-center">
                    Ao enviar, você concorda em receber contato comercial para continuidade do atendimento.
                  </p>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="bg-zinc-900 text-white p-10 lg:p-12 h-full">
                <h2 className="text-2xl font-serif font-semibold mb-8">
                  Canal Comercial
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white/10">
                      <HiOutlinePhone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Telefone / WhatsApp</h3>
                      <a href="tel:+550000000000" className="text-zinc-400 hover:text-white transition-colors">
                        (00) 00000-0000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white/10">
                      <HiOutlineMail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">E-mail</h3>
                      <a
                        href="mailto:contato@elcio-representacao.com.br"
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        contato@elcio-representacao.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white/10">
                      <HiOutlineLocationMarker className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Atendimento</h3>
                      <p className="text-zinc-400">
                        Brasil
                        <br />
                        Comercial remoto e sob agendamento
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="font-medium mb-4">Fluxo recomendado</h3>
                  <div className="space-y-2 text-zinc-400 text-sm">
                    <p>1. Informe empresa e contexto</p>
                    <p>2. Receba catálogo e direcionamento</p>
                    <p>3. Avance para proposta comercial</p>
                  </div>
                </div>

                <div className="mt-12 space-y-3">
                  <Button size="lg" className="w-full bg-white text-zinc-900 hover:bg-zinc-100" asChild>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                      Falar no WhatsApp
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full border-white/30 text-white bg-transparent hover:bg-white/10" asChild>
                    <a
                      href={buildContactHref({
                        assunto: DEFAULT_SUBJECT,
                        empresa: selectedCompanySlug,
                        origem: `${originContext}-sidebar`,
                      })}
                    >
                      Reabrir com contexto
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContatoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContatoContent />
    </Suspense>
  );
}
