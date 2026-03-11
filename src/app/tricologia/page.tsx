"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  HiArrowRight,
  HiPlay,
  HiX,
  HiChevronLeft,
  HiChevronRight,
  HiCheck,
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineHeart,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

// Types
interface PageBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
  active: boolean;
}

interface PageData {
  heroTitle?: string;
  heroHighlight?: string;
  heroDescription?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroVideo?: string;
  heroOverlay?: number;
  problemTitle?: string;
  problemDescription?: string;
  problemPainPoints?: string[];
  solutionTitle?: string;
  solutionDescription?: string;
  solutionFeatures?: typeof defaultSolutionFeatures;
  productsBadge?: string;
  productsTitle?: string;
  productsDescription?: string;
  products?: typeof defaultProducts;
  techBadge?: string;
  techTitle?: string;
  technologies?: typeof defaultTechnologies;
  ritualBadge?: string;
  ritualTitle?: string;
  ritualDescription?: string;
  ritualNote?: string;
  ritualVideoText?: string;
  ritualVideoUrl?: string;
  ritualSteps?: typeof defaultRitualSteps;
  galleryTitle?: string;
  galleryDescription?: string;
  galleryBadgeText?: string;
  galleryImages?: typeof defaultGalleryImages;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  ctaButtons?: { text: string; link: string; style: string }[];
}

// Products data
const defaultProducts = [
  {
    name: "Heaven",
    tagline: "O Símbolo do Bem-Estar",
    description:
      'Projetada sob o conceito "Washing becomes a wellness ritual". Uma estação horizontal que permite ao cliente relaxar completamente enquanto você realiza tratamentos profundos.',
    highlight: "Ajuste elétrico silencioso e ergonomia perfeita para rituais longos.",
    ideal: "Spas de luxo e Clínicas de Tricologia que buscam o máximo conforto.",
    image: "/images/site/heaven2.jpg",
    cta: "Ver Detalhes da Heaven",
    slug: "heaven",
  },
  {
    name: "Shirobody",
    tagline: "A Multifuncionalidade Holística",
    description:
      "Inspirada na medicina Ayurveda. Sua estrutura permite não apenas tratamentos capilares, mas também faciais e corporais, com inclinação elétrica de até 80°.",
    highlight: "Arco Shirodhara integrado para fluxo contínuo de óleos ou água na testa (terceiro olho).",
    ideal: "Centros de Wellness que integram terapias corporais e capilares.",
    image: "/images/site/Shirobody_showroom.jpg",
    cta: "Conhecer a Shirobody",
    slug: "shirobody",
  },
  {
    name: "Total Body",
    tagline: "A Estação Definitiva",
    description:
      "Equipada com 4 motores, esta cama multifuncional permite massagens, pedicure, manicure, reflexologia e lavagem de cabeça integrada com sistema Pipe-free de hidromassagem.",
    highlight: "Otimização máxima de espaço com versatilidade total.",
    ideal: "Hotéis 5 Estrelas e Spas exclusivos.",
    image: "/images/site/Total-Body-356.jpg",
    cta: "Descobrir a Total Body",
    slug: "total-body",
  },
  {
    name: "Spa Garçon",
    tagline: "Assistente Móvel Inteligente",
    description:
      "Projetado para auxiliar o profissional com produtos e acessórios durante o tratamento, garantindo que o fluxo do ritual de bem-estar ocorra sem interrupções.",
    highlight: "Fluidez operacional e organização ergonômica ao alcance das mãos.",
    ideal: "Terapeutas e Cabeleireiros que priorizam a imersão total do cliente na experiência.",
    image: "/images/site/SPA_GARCON_nuovo_03.png",
    cta: "Conhecer o Spa Garçon",
    slug: "spa-garcon",
  },
];

// Technologies data
const defaultTechnologies = [
  {
    name: "VAPOMIST",
    subtitle: "Infusão a Vapor",
    icon: "💨",
    description: "Não é apenas vapor. É um sistema de névoa ionizada que pode ser enriquecida com óleos essenciais.",
    benefit: "Dilata os poros, purifica o couro cabeludo e potencializa drasticamente a absorção de ativos.",
    hasVideo: true,
  },
  {
    name: "AQUA PEEL",
    subtitle: "Detox Profundo",
    icon: "💧",
    description: "Um sistema avançado de sucção e infusão de água desmineralizada.",
    benefit: 'Remove o excesso de sebo e resíduos de produtos sem agredir a pele, permitindo que o couro cabeludo "respire".',
    hasVideo: false,
  },
  {
    name: "CORRENTE GALVÂNICA",
    subtitle: "Regeneração",
    icon: "⚡",
    description: "O Galvanic Comb utiliza microcorrentes para estimular a atividade celular.",
    benefit: "Melhora a microcirculação e estimula o folículo, sendo essencial para protocolos de queda e fortalecimento.",
    hasVideo: false,
  },
  {
    name: "IGLOO",
    subtitle: "Cúpula Térmica",
    icon: "🌡️",
    description: "Uma cúpula projetada para reter o vapor do Vapomist, criando um microclima de sauna para a cabeça.",
    benefit: "Intensifica a emoliência e o relaxamento durante o ritual.",
    hasVideo: false,
  },
];

// Ritual steps
const defaultRitualSteps = [
  {
    step: 1,
    title: "Preparação",
    description: "O cliente se acomoda na Maca Heaven com conforto Zero Gravity.",
  },
  {
    step: 2,
    title: "Purificação",
    description: "O Aqua Peel realiza a limpeza profunda do couro cabeludo.",
  },
  {
    step: 3,
    title: "Infusão",
    description: "O Vapomist + Igloo abrem as cutículas e relaxam a musculatura.",
  },
  {
    step: 4,
    title: "Tratamento",
    description: "Aplicação precisa de ampolas com o Aerógrafo Integrado.",
  },
  {
    step: 5,
    title: "Finalização",
    description: "Fluxo de água contínuo (Shirodhara) para o fechamento sensorial do ritual.",
  },
];

// Gallery images
const defaultGalleryImages = [
  { src: "/images/site/Shirobody_showroom.jpg", alt: "Shirobody Showroom" },
  { src: "/images/site/heaven2.jpg", alt: "Heaven" },
  { src: "/images/site/Total-Body-356.jpg", alt: "Total Body" },
  { src: "/images/site/DK3E3179-MOD.jpg", alt: "Maletti Design" },
  { src: "/images/site/Head-spa-1.jpg", alt: "Head Spa" },
  { src: "/images/site/Head-spa-2.jpg", alt: "Head Spa Treatment" },
];

// Pain points
const defaultPainPoints = [
  "O atendimento é longo e cansativo para o paciente?",
  "É difícil justificar um ticket mais alto apenas pelos ativos utilizados?",
  "Falta um diferencial visual que separe sua clínica da concorrência?",
];

// Solution features
const defaultSolutionFeatures = [
  {
    title: 'Ergonomia "Zero Gravity"',
    description: "Conforto absoluto para terapias de longa duração.",
  },
  {
    title: "Estética Premiada",
    description: "Assinada por designers renomados como Giovannoni e Alberto Apostoli.",
  },
  {
    title: "Tecnologia Integrada",
    description: "Vapor, luz e água trabalhando em sinergia.",
  },
];

export default function TricologiaPage() {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [pageData, setPageData] = useState<PageData>({});

  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const productsRef = useRef(null);
  const techRef = useRef(null);
  const ritualRef = useRef(null);
  const galleryRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const problemInView = useInView(problemRef, { once: true, margin: "-100px" });
  const productsInView = useInView(productsRef, { once: true, margin: "-100px" });
  const techInView = useInView(techRef, { once: true, margin: "-100px" });
  const ritualInView = useInView(ritualRef, { once: true, margin: "-100px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" });

  // Carregar dados da API
  useEffect(() => {
    fetch("/api/pages/tricologia")
      .then((r) => r.json())
      .then((data) => {
        if (data.page?.blocks) {
          const content: PageData = {};
          data.page.blocks.forEach((block: PageBlock) => {
            Object.assign(content, block.content);
          });
          setPageData(content);
        }
      })
      .catch(console.error);
  }, []);

  // Dados com fallback para defaults
  const products = pageData.products || defaultProducts;
  const technologies = pageData.technologies || defaultTechnologies;
  const ritualSteps = pageData.ritualSteps || defaultRitualSteps;
  const galleryImages = pageData.galleryImages || defaultGalleryImages;
  const painPoints = pageData.problemPainPoints || defaultPainPoints;
  const solutionFeatures = pageData.solutionFeatures || defaultSolutionFeatures;

  // Auto-rotate gallery
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const openYoutubeVideo = (url: string) => {
    setVideoUrl(url);
    setShowVideo(true);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/images/site/Maletti - Logo bianco.png" alt="Maletti" width={100} height={40} />
          </Link>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              className="bg-white text-black hover:bg-gray-100"
              asChild
            >
              <Link href="https://shrhair.com.br/produtos">Ver Produtos</Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/30 text-white bg-transparent hover:bg-white/10"
              asChild
            >
              <a
                href="https://wa.me/5511981982279?text=Olá! Gostaria de saber mais sobre os equipamentos Maletti para tricologia."
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="mr-2" />
                Contato
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/Vídeo Home.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 leading-tight max-w-5xl mx-auto">
              A união do Design Italiano com a Tecnologia Coreana:{" "}
              <span className="text-gray-300">
                A revolução no tratamento capilar chegou à sua clínica.
              </span>
            </h1>

            <h2 className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Conheça o ecossistema de equipamentos que está redefinindo o padrão mundial de wellness e tricologia.{" "}
              <strong className="text-white">Aumente seu faturamento sem precisar aumentar o número de pacientes.</strong>
            </h2>

            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 transition-all duration-300 group text-lg px-8 py-6"
              asChild
            >
              <Link href="/produtos">
                Explorar a Coleção Completa
                <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. PROBLEMATIZAÇÃO */}
      <section ref={problemRef} className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-black mb-8 text-center">
              Você entrega resultados clínicos, mas o cliente percebe o valor cobrado?
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 text-center">
              Mesmo com a melhor técnica tricológica, muitas clínicas enfrentam o mesmo desafio:{" "}
              <strong className="text-black">
                o paciente vê o tratamento como um processo funcional, e não como uma experiência premium.
              </strong>
            </p>

            {/* Pain Points */}
            <div className="bg-gray-50 p-8 mb-12">
              <ul className="space-y-4">
                {painPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={problemInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 text-gray-700 text-lg"
                  >
                    <span className="text-black font-bold">•</span>
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black text-white p-10"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
                A Solução Maletti
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                Transforme a cadeira de tratamento no lugar mais desejado da sua clínica.{" "}
                <strong className="text-white">Onde a ciência encontra o relaxamento profundo.</strong>
              </p>
              <p className="text-gray-400 mb-8">
                Projetamos cada curva e cada funcionalidade para transformar protocolos técnicos em experiências sensoriais inesquecíveis.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {solutionFeatures.map((feature, index) => (
                  <div key={index} className="border border-white/20 p-6">
                    <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. ESTAÇÕES DE EXCELÊNCIA */}
      <section ref={productsRef} className="py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              {pageData.productsBadge || "Equipamentos Premium"}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-6">
              {pageData.productsTitle || "Estações de Excelência"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              {pageData.productsDescription || 'Projetadas por designers renomados como Giovannoni e Alberto Apostoli, as estações Maletti carregam o selo "Made in Italy" e mais de 85 anos de excelência.'}
            </p>
          </motion.div>

          {/* Products Carousel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-white overflow-hidden">
                  <Image
                    src={products[currentProduct].image}
                    alt={products[currentProduct].name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div>
                  <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                    {products[currentProduct].tagline}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-6">
                    {products[currentProduct].name}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {products[currentProduct].description}
                  </p>

                  <div className="bg-gray-100 p-6 mb-6">
                    <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Destaque</p>
                    <p className="text-black font-medium">{products[currentProduct].highlight}</p>
                  </div>

                  <div className="mb-8">
                    <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Ideal para</p>
                    <p className="text-gray-700">{products[currentProduct].ideal}</p>
                  </div>

                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-gray-800 group"
                    asChild
                  >
                    <Link href={`/produtos/${products[currentProduct].slug}`}>
                      {products[currentProduct].cta}
                      <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setCurrentProduct((prev) => (prev - 1 + products.length) % products.length)}
                className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <HiChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProduct(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentProduct ? "bg-black w-8" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentProduct((prev) => (prev + 1) % products.length)}
                className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <HiChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECNOLOGIA EMBARCADA */}
      <section ref={techRef} className="py-24 lg:py-32 bg-black text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">
              {pageData.techBadge || "A Ciência por Trás do Ritual"}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
              {pageData.techTitle || "Potencialize seus resultados com Tecnologias Exclusivas"}
            </h2>
          </motion.div>

          {/* Tech Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={techInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{tech.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{tech.name}</h3>
                    <p className="text-gray-400 text-sm">{tech.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{tech.description}</p>
                <div className="bg-white/5 p-4">
                  <p className="text-sm text-gray-400 mb-1">O que faz:</p>
                  <p className="text-white">{tech.benefit}</p>
                </div>
                {tech.hasVideo && (
                  <button className="mt-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <HiPlay className="w-5 h-5" />
                    Ver vídeo do {tech.name} em ação
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPERIÊNCIA DO CLIENTE - RITUAL */}
      <section ref={ritualRef} className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ritualInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              {pageData.ritualBadge || "O Ritual Passo a Passo"}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-6">
              {pageData.ritualTitle || "Do Diagnóstico ao Relaxamento Absoluto"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              {pageData.ritualDescription || "Veja como os produtos Maletti se integram para criar um protocolo perfeito:"}
            </p>
          </motion.div>

          {/* Steps */}
          <div className="max-w-4xl mx-auto mb-16">
            {ritualSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={ritualInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-6 mb-8 last:mb-0"
              >
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-serif font-bold">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-black mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ritualInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-lg text-gray-600 mb-6">
              {pageData.ritualNote || "Este é o padrão que define as clínicas de referência mundial."}
            </p>
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 group"
              onClick={() => openYoutubeVideo(pageData.ritualVideoUrl || "https://www.youtube.com/embed/OJi4gck03uQ")}
            >
              <HiPlay className="mr-2 w-5 h-5" />
              {pageData.ritualVideoText || "Assistir ao Ritual Completo"}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 6. GALERIA & INSPIRAÇÃO */}
      <section ref={galleryRef} className="py-24 lg:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
              {pageData.galleryTitle || "Design que transforma ambientes"}
            </h2>
            <p className="text-gray-400 text-lg">
              {pageData.galleryDescription || "Leve a elegância atemporal da Itália para o seu espaço."}
            </p>
          </motion.div>

          {/* Gallery Carousel */}
          <div className="relative aspect-[21/9] overflow-hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGalleryImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={galleryImages[currentGalleryImage].src}
                  alt={galleryImages[currentGalleryImage].alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentGalleryImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
            >
              <HiChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
            >
              <HiChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentGalleryImage ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3">
              <HiOutlineSparkles className="w-5 h-5 text-white" />
              <span className="text-white">
                {pageData.galleryBadgeText || <><strong>Exclusividade no Brasil:</strong> Distribuição oficial e suporte técnico pela SHR HAIR.</>}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-6">
              {pageData.ctaTitle || "Sua clínica está pronta para o próximo nível?"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              {pageData.ctaDescription || "A tecnologia Maletti precisa ser vista e sentida para ser compreendida. Convidamos você a conhecer os detalhes técnicos que farão a diferença no seu protocolo."}
            </p>

            <p className="text-gray-500 mb-8">{pageData.ctaSubtitle || "O que você gostaria de fazer agora?"}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {(pageData.ctaButtons && (pageData.ctaButtons as Array<{text:string;link:string;style:string}>).length > 0) ? (
                (pageData.ctaButtons as Array<{text:string;link:string;style:string}>).map((btn, i) => {
                  const isExternal = btn.link?.startsWith("http");
                  const sendKommoLead = () => {
                    fetch("/api/kommo/leads", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name: "Lead Tricologia", email: "", phone: "", message: `Clicou em "${btn.text}" na página de Tricologia.`, source: "CTA Tricologia" }),
                    }).catch(() => {});
                  };
                  return isExternal ? (
                    <Button key={i} size="lg" variant={btn.style === "outline" ? "outline" : "default"} className={btn.style === "outline" ? "border-black text-black hover:bg-black hover:text-white group px-8" : "bg-black text-white hover:bg-gray-800 group px-8"} asChild>
                      <a href={btn.link} target="_blank" rel="noopener noreferrer" onClick={sendKommoLead}>{btn.text}</a>
                    </Button>
                  ) : (
                    <Button key={i} size="lg" variant={btn.style === "outline" ? "outline" : "default"} className={btn.style === "outline" ? "border-black text-black hover:bg-black hover:text-white group px-8" : "bg-black text-white hover:bg-gray-800 group px-8"} asChild>
                      <Link href={btn.link || "/produtos"} onClick={sendKommoLead}>{btn.text}<HiArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                  );
                })
              ) : (
                <>
                  <Button size="lg" className="bg-black text-white hover:bg-gray-800 group px-8" asChild>
                    <Link href="/produtos" onClick={() => { fetch("/api/kommo/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Lead Tricologia", email: "", phone: "", message: 'Clicou em "Saber Mais Sobre os Produtos" na página de Tricologia.', source: "CTA Tricologia" }) }).catch(() => {}); }}>Saber Mais Sobre os Produtos<HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white group px-8" asChild>
                    <a href="https://wa.me/5511981982279?text=Olá! Gostaria de falar com um consultor técnico sobre os equipamentos Maletti para tricologia." target="_blank" rel="noopener noreferrer" onClick={() => { fetch("/api/kommo/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Lead Tricologia", email: "", phone: "", message: 'Clicou em "Falar com Consultor Técnico" na página de Tricologia.', source: "CTA Tricologia" }) }).catch(() => {}); }}><FaWhatsapp className="mr-2 w-5 h-5" />Falar com Consultor Técnico</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Image src="/logoshr-white.png" alt="SHR" width={80} height={32} />
              <span className="text-gray-500">×</span>
              <Image src="/images/site/Maletti - Logo bianco.png" alt="Maletti" width={100} height={40} />
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SHR HAIR - Distribuidor Exclusivo Maletti no Brasil
            </p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-gray-300 transition-colors"
          >
            <HiX className="w-8 h-8" />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black">
            <iframe
              src={`${videoUrl}?autoplay=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
