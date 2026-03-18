"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiArrowRight, HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COMPANY_OPTIONS,
  HUB_INTENT_OPTIONS,
  buildContactHref,
  buildWhatsappHref,
  getCompanyBySlug,
  getCompanyNameFromSlug,
  getIntentDescription,
  getIntentLabel,
  normalizeCompanySlug,
  normalizeIntent,
} from "@/lib/lead-context";

const NONE_VALUE = "none";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  city: z.string().optional(),
  companySlug: z.string().optional(),
  intent: z.string().min(1, "Selecione a intenção"),
  businessType: z.string().optional(),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

function ContactContent() {
  const searchParams = useSearchParams();
  const companyParam = normalizeCompanySlug(searchParams.get("empresa"));
  const originParam = (searchParams.get("origem") || "contato-hub").trim() || "contato-hub";
  const intentParam = normalizeIntent(searchParams.get("intent") || searchParams.get("assunto"));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const orderedCompanies = useMemo(
    () => [...COMPANY_OPTIONS].sort((a, b) => a.order - b.order),
    []
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      companySlug: companyParam || "",
      intent: intentParam,
      businessType: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!companyParam) return;
    form.setValue("companySlug", companyParam);
  }, [companyParam, form]);

  const selectedCompanySlug = normalizeCompanySlug(form.watch("companySlug"));
  const selectedCompany = getCompanyBySlug(selectedCompanySlug);
  const selectedCompanyName = getCompanyNameFromSlug(selectedCompanySlug);
  const selectedIntent = normalizeIntent(form.watch("intent"));

  const whatsappHref = buildWhatsappHref({
    intent: selectedIntent,
    empresa: selectedCompanySlug,
    origem: originParam,
    extraMessage: selectedCompanyName
      ? `Quero avançar com ${selectedCompanyName} no hub B2B.`
      : "Preciso de ajuda para entender a melhor empresa.",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const normalizedCompany = normalizeCompanySlug(data.companySlug);
      const normalizedIntent = normalizeIntent(data.intent);
      const companyName = getCompanyNameFromSlug(normalizedCompany);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          source: `Hub B2B - ${originParam}`,
          companySlug: normalizedCompany,
          companyName,
          interestType: normalizedIntent,
          originPage: originParam,
          message: [
            `Intenção: ${getIntentLabel(normalizedIntent)}`,
            `Empresa: ${companyName || "Não definida"}`,
            `Cidade: ${data.city || "Não informada"}`,
            `Tipo de negócio: ${data.businessType || "Não informado"}`,
            "",
            data.message,
          ].join("\n"),
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar");

      setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar sua solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#07111f] pt-40 pb-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.16),_transparent_34%)]" />
        <div className="site-container relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
              Central de Qualificação
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              Abra o contato com intenção clara, empresa sugerida e mais contexto comercial.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">
              Esta página passa a funcionar como a entrada do hub B2B: primeiro a intenção, depois
              a empresa ideal e então o encaminhamento mais aderente.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
                Intenção: {getIntentLabel(selectedIntent)}
              </span>
              <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
                Empresa: {selectedCompanyName || "Ainda não definida"}
              </span>
              <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
                Origem: {originParam}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
                Intenção selecionada
              </p>
              <h2 className="mt-3 text-3xl font-black text-[#0a1d37]">{getIntentLabel(selectedIntent)}</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">{getIntentDescription(selectedIntent)}</p>
            </div>

            {selectedCompany && (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
                  Empresa já em contexto
                </p>
                <h3 className="mt-3 text-2xl font-black text-[#0a1d37]">{selectedCompany.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{selectedCompany.teaser}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedCompany.solutionTypes.slice(0, 3).map((type) => (
                    <span
                      key={type}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <Link href={`/p/${selectedCompany.slug}`} className="text-sm font-bold text-[#0a1d37] hover:text-amber-600">
                    Ver página da empresa
                  </Link>
                </div>
              </div>
            )}

            <div className="rounded-[2rem] border border-slate-200 bg-[#07111f] p-8 text-white shadow-sm">
              <h3 className="text-2xl font-black">Fluxo recomendado do hub</h3>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p>1. Escolha a intenção comercial.</p>
                <p>2. Selecione a empresa quando já tiver um caminho preferido.</p>
                <p>3. Envie o contexto para o encaminhamento sair com mais direção.</p>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-4 font-bold text-white transition-colors hover:bg-amber-600"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            {submitSuccess ? (
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-white">
                  <HiArrowRight className="h-8 w-8" />
                </div>
                <h2 className="mt-6 text-3xl font-black text-[#0a1d37]">Solicitação enviada</h2>
                <p className="mt-4 text-slate-600">
                  Recebemos sua intenção e o contexto do hub. O retorno seguirá com mais direção
                  comercial.
                </p>
                <Button
                  className="mt-8 bg-[#0a1d37] text-white hover:bg-[#112948]"
                  onClick={() => setSubmitSuccess(false)}
                >
                  Enviar nova solicitação
                </Button>
              </div>
            ) : (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Nome completo *</Label>
                    <Input id="name" {...form.register("name")} className="mt-2 h-12" />
                    {form.formState.errors.name && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input id="email" type="email" {...form.register("email")} className="mt-2 h-12" />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                    <Input id="phone" {...form.register("phone")} className="mt-2 h-12" />
                    {form.formState.errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" {...form.register("city")} className="mt-2 h-12" />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label>Intenção comercial *</Label>
                    <Select value={form.watch("intent")} onValueChange={(value) => form.setValue("intent", value)}>
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue placeholder="Selecione a intenção" />
                      </SelectTrigger>
                      <SelectContent>
                        {HUB_INTENT_OPTIONS.map((intent) => (
                          <SelectItem key={intent.value} value={intent.value}>
                            {intent.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Empresa de interesse</Label>
                    <Select
                      value={form.watch("companySlug") || NONE_VALUE}
                      onValueChange={(value) =>
                        form.setValue("companySlug", value === NONE_VALUE ? "" : value)
                      }
                    >
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue placeholder="Selecione uma empresa (opcional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={NONE_VALUE}>Ainda não sei</SelectItem>
                        {orderedCompanies.map((company) => (
                          <SelectItem key={company.slug} value={company.slug}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="businessType">Tipo de negócio</Label>
                  <Input
                    id="businessType"
                    {...form.register("businessType")}
                    className="mt-2 h-12"
                    placeholder="Indústria, distribuidor, engenharia, integrador..."
                  />
                </div>

                <div>
                  <Label htmlFor="message">Contexto da demanda *</Label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    className="mt-2 min-h-[160px]"
                    placeholder="Explique a necessidade, aplicação, urgência, equipamento ou objetivo comercial."
                  />
                  {form.formState.errors.message && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-amber-500 text-white hover:bg-amber-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar com contexto"}
                </Button>

                <div className="grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
                  {HUB_INTENT_OPTIONS.map((intent) => (
                    <Link
                      key={intent.value}
                      href={buildContactHref({
                        intent: intent.value,
                        empresa: selectedCompanySlug,
                        origem: `contato-switch-${intent.value}`,
                      })}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      {intent.label}
                    </Link>
                  ))}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="site-container grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <HiOutlinePhone className="h-6 w-6 text-amber-500" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Telefone</p>
            <a href="tel:+5512988737347" className="mt-2 block text-lg font-black text-[#0a1d37]">
              +55 12 98873-7347
            </a>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <HiOutlineMail className="h-6 w-6 text-amber-500" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">E-mail</p>
            <a href="mailto:vendas@raemtools.com.br" className="mt-2 block text-lg font-black text-[#0a1d37]">
              vendas@raemtools.com.br
            </a>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <HiOutlineLocationMarker className="h-6 w-6 text-amber-500" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Base</p>
            <p className="mt-2 text-lg font-black text-[#0a1d37]">Taubaté - SP</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContatoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContactContent />
    </Suspense>
  );
}
