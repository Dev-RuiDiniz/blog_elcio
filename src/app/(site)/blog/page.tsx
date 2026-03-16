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
        className="relative pt-32 pb-20 bg-gradient-to-b from-zinc-100 to-white"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-4 block">
              {settings.heroBadge || "Blog"}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-zinc-900 mb-6">
              {settings.heroTitle || "Blog Comercial do Elcio"}
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed">
              {settings.heroDescription ||
                "Conteúdo de autoridade para acelerar decisões comerciais, comparação de fornecedores e abertura de atendimento técnico."}
            </p>
          </motion.div>
        </div>
      </section>

      {visibleCategories.length > 0 && (
        <section className="border-b border-zinc-200 sticky top-20 bg-white z-30">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-2 py-4 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  !selectedCategory
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
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
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-zinc-700 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">Nenhum post encontrado.</p>
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
                  <Link href={`/blog/${featuredPost.slug}`} className="group block">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                        {(featuredPost.cover || featuredPost.image) && (
                          <Image
                            src={featuredPost.cover || featuredPost.image || ""}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          {featuredPost.categories.slice(0, 2).map((item) => (
                            <span
                              key={item.category.id}
                              className="px-3 py-1 text-xs font-medium bg-zinc-900 text-white"
                            >
                              {item.category.name}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-zinc-900 mb-4 group-hover:text-zinc-700 transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-zinc-600 leading-relaxed mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-zinc-500">
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
                      className="group"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 mb-5">
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
                              className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium bg-zinc-100 text-zinc-600"
                            >
                              {item.category.name}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-3 group-hover:text-zinc-700 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-zinc-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-zinc-500">
                          <span>{new Date(post.createdAt).toLocaleDateString("pt-BR")}</span>
                          <span className="flex items-center gap-1 text-zinc-900 font-medium group-hover:gap-2 transition-all">
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
        <section className="py-20 bg-zinc-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                {settings.ctaTitle || "Feche sua jornada com Consultoria + Catálogo"}
              </h2>
              <p className="text-zinc-400 mb-8">
                {settings.ctaDescription ||
                  "Depois de ler os conteúdos, envie seu contato para receber orientação comercial do Elcio e direcionamento para a empresa mais aderente."}
              </p>
              {selectedCompanyName && (
                <p className="text-sm text-zinc-500 mb-6">
                  Empresa selecionada: {selectedCompanyName}
                </p>
              )}

              {leadSuccess ? (
                <div className="max-w-md mx-auto text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-white text-zinc-900 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white font-medium">Solicitação enviada com sucesso.</p>
                  <p className="text-zinc-400 text-sm mt-1">
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
                      className="px-5 py-3 bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 outline-none focus:border-white/40 transition-colors"
                    />
                    <input
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(event) => setLeadForm((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder={settings.ctaEmailPlaceholder || "Seu melhor e-mail"}
                      className="px-5 py-3 bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={leadForm.phone}
                      onChange={(event) => setLeadForm((prev) => ({ ...prev, phone: event.target.value }))}
                      placeholder="Telefone / WhatsApp"
                      className="px-5 py-3 bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 outline-none focus:border-white/40 transition-colors"
                    />
                    <select
                      value={leadForm.companySlug || NONE_VALUE}
                      onChange={(event) =>
                        setLeadForm((prev) => ({
                          ...prev,
                          companySlug: event.target.value === NONE_VALUE ? "" : event.target.value,
                        }))
                      }
                      className="px-5 py-3 bg-white/10 border border-white/20 text-white outline-none focus:border-white/40 transition-colors"
                    >
                      <option value={NONE_VALUE} className="text-zinc-900">
                        Empresa de interesse (opcional)
                      </option>
                      {orderedCompanies.map((company) => (
                        <option key={company.slug} value={company.slug} className="text-zinc-900">
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto px-8 py-3 bg-white text-zinc-900 font-medium hover:bg-zinc-100 transition-colors disabled:opacity-50"
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
                  className="px-6 py-3 border border-white/30 hover:bg-white/10 transition-colors"
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
                  className="px-6 py-3 border border-white/30 hover:bg-white/10 transition-colors"
                >
                  Falar no WhatsApp
                </a>
                <Link
                  href="/marcas"
                  className="px-6 py-3 border border-white/30 hover:bg-white/10 transition-colors"
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
