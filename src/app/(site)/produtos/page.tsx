"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { HiArrowRight, HiOutlineViewGrid, HiOutlineViewList, HiOutlineSearch, HiX } from "react-icons/hi";
import { Button } from "@/components/ui/button";

// Função para limpar tags HTML
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductCategory {
  category: Category;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image: string;
  category: Category | null;
  categories?: ProductCategory[];
}

interface PageBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
  active: boolean;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const buscaParam = searchParams.get("busca") || "";
  const categoriaParam = searchParams.get("categoria") || null;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoriaParam);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(buscaParam);
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Debounced search para evitar fetches a cada tecla
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [initialLoad, setInitialLoad] = useState(true);

  // Buscar blocos da página
  const heroBlock = blocks.find(b => b.type === "products-hero")?.content || {};
  const gridBlock = blocks.find(b => b.type === "products-grid")?.content || {};
  const ctaBlock = blocks.find(b => b.type === "products-cta")?.content || {};

  // Sync busca do URL
  useEffect(() => {
    setSearchQuery(buscaParam);
    setDebouncedSearch(buscaParam);
  }, [buscaParam]);

  // Debounce: atrasa a busca 400ms após parar de digitar
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset página ao mudar categoria ou busca
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedSearch]);

  // Carregar categorias e blocos uma vez
  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/pages/produtos").then((r) => r.json()),
    ])
      .then(([catData, pageData]) => {
        setCategories(catData.categories || []);
        setBlocks(pageData.page?.blocks || []);
      })
      .catch(console.error);
  }, []);

  // Carregar produtos com paginação (usa AbortController para evitar race conditions)
  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", "9");
    // Quando busca está ativa, NÃO filtrar por categoria (busca global)
    if (selectedCategory && !debouncedSearch.trim()) params.set("category", selectedCategory);
    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
    
    fetch(`/api/products?${params.toString()}`, { signal: abortController.signal })
      .then((r) => r.json())
      .then((data) => {
        if (!abortController.signal.aborted) {
          setProducts(data.products || []);
          setTotalPages(data.pagination?.totalPages || 1);
          setTotalProducts(data.pagination?.total || 0);
          setInitialLoad(false);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      })
      .finally(() => {
        if (!abortController.signal.aborted) setLoading(false);
      });

    return () => {
      // Não abortar a primeira request (initial load)
      if (!initialLoad) abortController.abort();
    };
  }, [currentPage, selectedCategory, debouncedSearch]);

  // Produtos já filtrados pela API
  const filteredProducts = products;

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              {(heroBlock.badge as string) || "Catálogo"}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-black mb-6">
              {(heroBlock.title as string) || "Nossos Produtos"}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {(heroBlock.description as string) || "Conheça a linha completa de produtos Maletti disponível exclusivamente através da SHR no Brasil. Design italiano, qualidade premium e tecnologia de ponta para transformar seu salão."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-y border-gray-100 sticky top-20 z-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search + Category Pills */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 focus:border-black outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <HiX className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === null
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Todos
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.slug
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* View Toggle & Count */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""}
              </span>
              <div className="flex items-center border border-gray-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid" ? "bg-black text-white" : "text-gray-500 hover:text-black"
                  }`}
                  aria-label="Visualização em grade"
                >
                  <HiOutlineViewGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list" ? "bg-black text-white" : "text-gray-500 hover:text-black"
                  }`}
                  aria-label="Visualização em lista"
                >
                  <HiOutlineViewList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section ref={ref} className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/produtos/${product.slug}`} className="group block bg-white border border-gray-200 p-3 hover:border-gray-300 transition-colors">
                    {/* Image */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${product.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      
                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs uppercase tracking-wider text-gray-700">
                        {product.categories && product.categories.length > 0 
                          ? product.categories[0].category.name
                          : product.category?.name}
                      </span>

                      {/* Quick View */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black shadow-lg">
                          <HiArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-medium text-black mb-2 group-hover:text-gray-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-1">
                        {stripHtml(product.shortDescription)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/produtos/${product.slug}`}
                    className="group flex flex-col md:flex-row gap-6 bg-white p-6 border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    {/* Image */}
                    <div className="relative w-full md:w-64 aspect-square md:aspect-auto md:h-48 bg-gray-100 overflow-hidden flex-shrink-0">
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${product.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center flex-1">
                      <span className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                        {product.categories && product.categories.length > 0 
                          ? product.categories[0].category.name
                          : product.category?.name}
                      </span>
                      <h3 className="text-2xl font-serif font-medium text-black mb-3 group-hover:text-gray-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 leading-relaxed mb-4 line-clamp-3">
                        {stripHtml(product.shortDescription)}
                      </p>
                      <span className="inline-flex items-center text-sm font-medium text-black group-hover:text-gray-600 transition-colors">
                        Ver detalhes
                        <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border border-gray-200 hover:border-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 text-sm transition-colors ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "border border-gray-200 hover:border-black"
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border border-gray-200 hover:border-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Próxima
              </button>
            </div>
          )}

          <p className="text-center text-sm text-gray-500 mt-4">
            Mostrando {filteredProducts.length} de {totalProducts} produtos
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              {(ctaBlock.title as string) || "Precisa de ajuda para escolher?"}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              {(ctaBlock.description as string) || "Nossa equipe de consultores está pronta para ajudar você a encontrar os produtos ideais para o seu salão."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 transition-all duration-300"
                asChild
              >
                <a
                  href={(ctaBlock.whatsappLink as string) || "https://wa.me/5511981982279?text=Olá! Preciso de ajuda para escolher produtos Maletti."}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {(ctaBlock.buttonText as string) || "Falar com Consultor"}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-transparent hover:bg-white/10 transition-all duration-300"
                asChild
              >
                <Link href={(ctaBlock.secondaryLink as string) || "/contato"}>
                  {(ctaBlock.secondaryButtonText as string) || "Solicitar Catálogo"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-16 bg-white min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="h-16 bg-gray-200 rounded w-96 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-full max-w-2xl"></div>
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
