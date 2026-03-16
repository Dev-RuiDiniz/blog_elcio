"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { HiArrowRight, HiOutlineCalendar, HiOutlineEye } from "react-icons/hi";
import {
  COMPANY_OPTIONS,
  buildContactHref,
  buildWhatsappHref,
  getCompanyNameFromSlug,
  normalizeCompanySlug,
} from "@/lib/lead-context";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  cover: string | null;
  published: boolean;
  publishedAt: string | null;
  views: number;
  categories: { category: BlogCategory }[];
  tags: { tag: BlogTag }[];
  createdAt: string;
}

interface BlogSettings {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  hiddenCategories?: string[];
  postOrder?: string;
  postsPerPage?: number;
  showFeatured?: boolean;
  showCta?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaEmailPlaceholder?: string;
  ctaButtonText?: string;
}

interface BlogLeadForm {
  name: string;
  email: string;
  phone: string;
  companySlug: string;
}

const NONE_VALUE = "none";

function BlogContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const categoriaParam = searchParams.get("categoria");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoriaParam);
  const [settings, setSettings] = useState<BlogSettings>({});
  const [leadForm, setLeadForm] = useState<BlogLeadForm>({
    name: "",
    email: "",
    phone: "",
    companySlug: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoriaParam);
  }, [categoriaParam]);

  const fetchData = async () => {
    try {
      let blogSettings: BlogSettings = {};
      try {
        const pageRes = await fetch("/api/pages/blog");
        if (pageRes.ok) {
          const pageData = await pageRes.json();
          const blogBlock = pageData.page?.blocks?.find((b: { type: string }) => b.type === "blog-settings");
          if (blogBlock?.content) {
            blogSettings = blogBlock.content as BlogSettings;
            setSettings(blogSettings);
          }
        }
      } catch {
        // ignore
      }

      const params = new URLSearchParams();
      if (blogSettings.postOrder) params.set("order", blogSettings.postOrder);
      if (blogSettings.postsPerPage) params.set("limit", String(blogSettings.postsPerPage));

      const postsRes = await fetch(`/api/blog?${params.toString()}`);
      const data = await postsRes.json();
      setPosts(data.posts || []);
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const hiddenCategories = settings.hiddenCategories || [];
  const visibleCategories = categories.filter((category) => !hiddenCategories.includes(category.id));

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.categories.some((item) => item.category.slug === selectedCategory))
    : posts;

  const showFeatured = settings.showFeatured !== false;
  const featuredPost = showFeatured ? filteredPosts[0] : null;
  const otherPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts;
  const orderedCompanies = [...COMPANY_OPTIONS].sort((a, b) => a.order - b.order);
  const selectedCompanySlug = normalizeCompanySlug(leadForm.companySlug);
  const selectedCompanyName = getCompanyNameFromSlug(selectedCompanySlug);
  const ctaOrigin = selectedCompanySlug ? `${selectedCompanySlug}-blog-cta` : "blog-cta";
  const heroImage = orderedCompanies[0]?.coverPublicPath || "/images/empresas/dormer-pramet/cover.jpg";

  const handleLeadSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.phone || submitting) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          source: "CTA Blog - Elcio",
          companySlug: selectedCompanySlug,
          companyName: selectedCompanyName,
          interestType: "consultoria-catalogo",
          originPage: ctaOrigin,
          message: selectedCompanyName
            ? `Lead originado no CTA do blog para consultoria + catálogo. Empresa de interesse: ${selectedCompanyName}.`
            : "Lead originado no CTA do blog para consultoria + catálogo.",
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar");

      setLeadSuccess(true);
      setLeadForm({ name: "", email: "", phone: "", companySlug: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section
        ref={heroRef}
        className="relative overflow-hidden px-4 pt-40 pb-24 md:px-10"
      >
        <div className="absolute inset-0 bg-[#0a1d37]" />
        <div className="absolute inset-0 opacity-15">
          <Image src={heroImage} alt="" fill priority className="object-cover" />
        </div>
        <div className="site-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-400 mb-4">
              {settings.heroBadge || "Blog"}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              {settings.heroTitle || "Blog Comercial do Elcio"}
            </h1>
            <p className="max-w-2xl text-lg text-slate-200 leading-relaxed">
              {settings.heroDescription ||
                "Conteúdo de autoridade para acelerar decisões comerciais, comparação de fornecedores e abertura de atendimento técnico."}
            </p>
          </motion.div>
        </div>
      </section>

      {visibleCategories.length > 0 && (
        <section className="sticky top-20 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="site-container">
            <div className="flex items-center gap-2 py-4 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  !selectedCategory
                    ? "bg-[#0a1d37] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Todos
              </button>
              {visibleCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.slug
                      ? "bg-[#0a1d37] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-white">
        <div className="site-container">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#0a1d37] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">Nenhum post encontrado.</p>
            </div>
          ) : (
            <>
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-16"
                >
                  <Link href={`/blog/${featuredPost.slug}`} className="group block rounded-[1.75rem] border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        {(featuredPost.cover || featuredPost.image) && (
                          <Image
                            src={featuredPost.cover || featuredPost.image || ""}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-4">
                          {featuredPost.categories.slice(0, 2).map((item) => (
                            <span
                              key={item.category.id}
                              className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700"
                            >
                              {item.category.name}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black text-[#0a1d37] mb-4 group-hover:text-amber-600 transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-slate-500">
                          <span className="flex items-center gap-2">
                            <HiOutlineCalendar className="w-4 h-4" />
                            {new Date(featuredPost.createdAt).toLocaleDateString(
                              "pt-BR",
                              { day: "numeric", month: "long", year: "numeric" }
                            )}
                          </span>
                          <span className="flex items-center gap-2">
                            <HiOutlineEye className="w-4 h-4" />
                            {featuredPost.views} views
                          </span>
                        </div>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-600">
                          Ler artigo completo
                          <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {otherPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 mb-5">
                          {(post.cover || post.image) && (
                            <Image
                              src={post.cover || post.image || ""}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          {post.categories.slice(0, 1).map((item) => (
                            <span
                              key={item.category.id}
                              className="rounded-full bg-slate-100 px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-bold text-slate-600"
                            >
                              {item.category.name}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-black text-[#0a1d37] mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span>{new Date(post.createdAt).toLocaleDateString("pt-BR")}</span>
                          <span className="flex items-center gap-1 text-amber-600 font-bold group-hover:gap-2 transition-all">
                            Ler mais
                            <HiArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {settings.showCta !== false && (
        <section className="py-20 bg-[#0a1d37] text-white">
          <div className="site-container">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-sm font-bold uppercase tracking-[0.24em] text-amber-400 mb-4">
                Conversão
              </span>
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                {settings.ctaTitle || "Feche sua jornada com Consultoria + Catálogo"}
              </h2>
              <p className="text-slate-300 mb-8">
                {settings.ctaDescription ||
                  "Depois de ler os conteúdos, envie seu contato para receber orientação comercial do Elcio e direcionamento para a empresa mais aderente."}
              </p>
              {selectedCompanyName && (
                <p className="text-sm text-slate-400 mb-6">
                  Empresa selecionada: {selectedCompanyName}
                </p>
              )}

              {leadSuccess ? (
                <div className="max-w-md mx-auto text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-amber-500 text-white rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white font-medium">Solicitação enviada com sucesso.</p>
                  <p className="text-slate-300 text-sm mt-1">
                    Em breve você receberá o primeiro retorno comercial.
                  </p>
                </div>
              ) : (
                <form className="max-w-2xl mx-auto space-y-3" onSubmit={handleLeadSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(event) => setLeadForm((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="Nome completo"
                      className="rounded-xl px-5 py-3 bg-white/10 border border-white/20 text-white placeholder:text-slate-400 outline-none focus:border-amber-400 transition-colors"
                    />
                    <input
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(event) => setLeadForm((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder={settings.ctaEmailPlaceholder || "Seu melhor e-mail"}
                      className="rounded-xl px-5 py-3 bg-white/10 border border-white/20 text-white placeholder:text-slate-400 outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={leadForm.phone}
                      onChange={(event) => setLeadForm((prev) => ({ ...prev, phone: event.target.value }))}
                      placeholder="Telefone / WhatsApp"
                      className="rounded-xl px-5 py-3 bg-white/10 border border-white/20 text-white placeholder:text-slate-400 outline-none focus:border-amber-400 transition-colors"
                    />
                    <select
                      value={leadForm.companySlug || NONE_VALUE}
                      onChange={(event) =>
                        setLeadForm((prev) => ({
                          ...prev,
                          companySlug: event.target.value === NONE_VALUE ? "" : event.target.value,
                        }))
                      }
                      className="rounded-xl px-5 py-3 bg-white/10 border border-white/20 text-white outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value={NONE_VALUE} className="text-slate-900">
                        Empresa de interesse (opcional)
                      </option>
                      {orderedCompanies.map((company) => (
                        <option key={company.slug} value={company.slug} className="text-slate-900">
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto rounded-lg px-8 py-3 bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors disabled:opacity-50"
                  >
                    {submitting ? "Enviando..." : settings.ctaButtonText || "Quero Consultoria + Catálogo"}
                  </button>
                </form>
              )}

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={buildContactHref({
                    assunto: "consultoria-catalogo",
                    empresa: selectedCompanySlug,
                    origem: ctaOrigin,
                  })}
                  className="site-button-secondary-inverse"
                >
                  Ir para formulário completo
                </Link>
                <a
                  href={buildWhatsappHref({
                    assunto: "consultoria-catalogo",
                    empresa: selectedCompanySlug,
                    origem: ctaOrigin,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-button-secondary-inverse"
                >
                  Falar no WhatsApp
                </a>
                <Link
                  href="/marcas"
                  className="site-button-secondary-inverse"
                >
                  Ver as 6 empresas
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-16 bg-white min-h-screen">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="animate-pulse">
              <div className="h-8 bg-zinc-200 rounded w-1/3 mb-4" />
              <div className="h-12 bg-zinc-200 rounded w-2/3 mb-6" />
              <div className="h-4 bg-zinc-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
