"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineCalendar,
  HiOutlineChat,
  HiOutlineDownload,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

// ============================================
// TYPES
// ============================================

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
  heroBadge?: string;
  heroDescription?: string;
  heroButtonText?: string;
  heroImage?: string;
  problemTitle?: string;
  problemDescription?: string;
  problemPainPoints?: string[];
  solutionTitle?: string;
  solutionDescription?: string;
  solutionNote?: string;
  workstationsTitle?: string;
  workstationsBadge?: string;
  workstationsDescription?: string;
  workstations?: typeof defaultWorkstations;
  techTitle?: string;
  techBadge?: string;
  techDescription?: string;
  technologies?: typeof defaultTechnologies;
  journeyTitle?: string;
  journeyBadge?: string;
  journeyDescription?: string;
  journeyResult?: string;
  journeyImage?: string;
  journeySteps?: typeof defaultJourneySteps;
  galleryTitle?: string;
  galleryBadge?: string;
  galleryDescription?: string;
  galleryImages?: { src: string; alt: string }[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaNote?: string;
  ctaSubtitle?: string;
  ctaButtons?: { text: string; link: string; style: string }[];
}

// ============================================
// DEFAULT DATA
// ============================================

const defaultWorkstations = [
  {
    name: "Heaven",
    tagline: "Para Rituais de Longa Duração",
    concept: 'Projetada sob o conceito "Washing becomes a wellness ritual". Uma estação horizontal que elimina pontos de tensão muscular.',
    operational: 'Permite ao terapeuta trabalhar com acesso livre à área cervical enquanto o cliente permanece em repouso absoluto "Zero Gravity".',
    application: "Ideal para vender \"tempo de descanso\" e terapias profundas (60-90min) com valor hora elevado.",
    image: "/images/site/heaven2.jpg",
    slug: "heaven",
  },
  {
    name: "Shirobody",
    tagline: "Para Protocolos Híbridos",
    concept: "A estrutura multifuncional inspirada na medicina Ayurveda. Possui inclinação elétrica de até 80° e arco Shirodhara integrado.",
    operational: "Maximiza a receita permitindo a execução de terapias faciais, corporais e capilares na mesma estação, sem movimentar o cliente.",
    application: 'Perfeita para menus de "Spa Day Express" e serviços cruzados.',
    image: "/images/site/Shirobody_showroom.jpg",
    slug: "shirobody",
  },
  {
    name: "Total Body",
    tagline: "Para Otimização de Tempo",
    concept: "Uma unidade de trabalho completa com 4 motores e sistema de hidromassagem Pipe-free.",
    operational: "Permite a atuação simultânea de múltiplos profissionais (cabeleireiro, manicure, massoterapeuta) com total higiene.",
    application: "Triplique o faturamento da mesma hora técnica realizando múltiplos serviços simultâneos.",
    image: "/images/site/Total-Body-356.jpg",
    slug: "total-body",
  },
];

const defaultTechnologies = [
  {
    name: "Vapomist",
    tagline: "Potencializador de Ativos",
    icon: "💨",
    function: "Sistema móvel de névoa ionizada, enriquecida com óleos essenciais.",
    impact: "Diferente do vapor comum, ele dilata os poros e facilita a permeação profunda de ativos sem molhar excessivamente o cliente, essencial para a eficácia de tratamentos de alto custo.",
    image: "/images/site/SPA_GARCON_nuovo_03.png",
    slug: "vapomist",
  },
  {
    name: "Igloo",
    tagline: "Controle Térmico",
    icon: "🌡️",
    function: "Cúpula de retenção projetada para acoplar nas macas Maletti.",
    impact: 'Cria um microclima controlado (sauna capilar) que intensifica a ação química dos produtos e isola acusticamente o cliente, permitindo cobrar um adicional pela "Privacidade e Imersão".',
    image: "/images/site/Head-spa-3.jpg",
    slug: "igloo",
  },
  {
    name: "Spa Garçom",
    tagline: "O Centro Tecnológico do Ritual",
    icon: "🔬",
    function: "Dispositivo multifuncional que une a tradição italiana à inovação coreana. Integra três tecnologias essenciais em uma única estação: Aqua Peel, Corrente Galvânica com infravermelho e Aerógrafo.",
    impact: "Transforma tratamentos manuais em terapias de vanguarda com resultados tangíveis. Permite criar um percurso completo de regeneração, da limpeza profunda à nutrição folicular.",
    image: "/images/site/SPA_GARCON_nuovo_04.png",
    slug: "spa-garcon",
  },
];

const defaultJourneySteps = [
  {
    step: 1,
    title: "Recepção Premium",
    description: 'Cliente acomodado na ergonomia "Zero Gravity" (Percepção de conforto imediata).',
  },
  {
    step: 2,
    title: "Dermo-Purificação",
    description: "Uso do Aqua Peel para limpeza profunda e sucção de impurezas (Serviço cobrado à parte ou agregado ao pacote).",
  },
  {
    step: 3,
    title: "Infusão Terapêutica",
    description: "Aplicação de máscara nobre potencializada pelo Vapomist + Igloo (O momento visual que encanta e justifica o preço).",
  },
  {
    step: 4,
    title: "Estimulação",
    description: "Uso de Corrente Galvânica para estimular o folículo e melhorar a circulação.",
  },
  {
    step: 5,
    title: "Finalização Zen",
    description: "Fluxo contínuo Shirodhara para fidelização emocional.",
  },
];

const defaultGalleryImages = [
  { src: "/images/site/Shirobody_showroom.jpg", alt: "Shirobody Showroom" },
  { src: "/images/site/heaven2.jpg", alt: "Heaven" },
  { src: "/images/site/Total-Body-356.jpg", alt: "Total Body" },
  { src: "/images/site/DK3E3179-MOD.jpg", alt: "Maletti Design" },
  { src: "/images/site/Head-spa-1.jpg", alt: "Head Spa" },
  { src: "/images/site/Head-spa-2.jpg", alt: "Head Spa Treatment" },
];

const defaultPainPoints = [
  "Você sente que sua estrutura atual limita a percepção de valor dos seus tratamentos?",
  "Falta um diferencial tecnológico visível que separe o seu salão da concorrência?",
];

// ============================================
// COMPONENTS
// ============================================

function SectionTitle({ 
  badge, 
  title, 
  description,
  light = false 
}: { 
  badge?: string; 
  title: string; 
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-16">
      {badge && (
        <span className={`text-xs uppercase tracking-[0.3em] mb-4 block ${light ? "text-gray-400" : "text-gray-500"}`}>
          {badge}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-6 ${light ? "text-white" : "text-black"}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg leading-relaxed max-w-3xl mx-auto ${light ? "text-gray-300" : "text-gray-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function WorkstationCard({ station, index }: { station: typeof defaultWorkstations[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-gray-100">
        <Image
          src={station.image}
          alt={station.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-500 block mb-1">
            {station.tagline}
          </span>
          <h3 className="text-2xl font-serif font-semibold text-black">
            {station.name}
          </h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {station.concept}
        </p>
        <div className="bg-gray-50 p-4 space-y-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
              Conceito Operacional
            </span>
            <p className="text-sm text-gray-700">{station.operational}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
              Aplicação High Ticket
            </span>
            <p className="text-sm text-gray-700">{station.application}</p>
          </div>
        </div>
        <Link
          href={`/produtos/${station.slug}`}
          className="inline-flex items-center text-sm font-medium text-black hover:text-gray-600 transition-colors group/link"
        >
          Saiba mais
          <HiArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

function TechCard({ tech, index }: { tech: typeof defaultTechnologies[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white border border-gray-100 group hover:border-gray-300 transition-colors"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
        <Image
          src={tech.image}
          alt={tech.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{tech.icon}</span>
          <div>
            <h3 className="text-xl font-semibold text-black">{tech.name}</h3>
            <span className="text-xs uppercase tracking-wider text-gray-500">{tech.tagline}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
              Função Técnica
            </span>
            <p className="text-sm text-gray-700">{tech.function}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
              Impacto no Serviço
            </span>
            <p className="text-sm text-gray-600">{tech.impact}</p>
          </div>
        </div>
        <Link
          href={`https://shrhair.com.br/`}
          className="inline-flex items-center text-sm font-medium text-black hover:text-gray-600 transition-colors group/link"
        >
          Saiba mais
          <HiArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

function JourneyStep({ item, index, total }: { item: typeof defaultJourneySteps[0]; index: number; total: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-serif font-bold">{item.step}</span>
        </div>
        {index < total - 1 && (
          <div className="w-px h-full bg-gray-200 my-2" />
        )}
      </div>
      <div className="pb-8">
        <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function SalaoDeBelezaPage() {
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [pageData, setPageData] = useState<PageData>({});
  
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const journeyRef = useRef(null);
  const galleryRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const problemInView = useInView(problemRef, { once: true, margin: "-100px" });
  const journeyInView = useInView(journeyRef, { once: true, margin: "-100px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" });

  // Carregar dados da API
  useEffect(() => {
    fetch("/api/pages/salao-de-beleza")
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
  const workstations = pageData.workstations || defaultWorkstations;
  const technologies = pageData.technologies || defaultTechnologies;
  const journeySteps = pageData.journeySteps || defaultJourneySteps;
  const galleryImages = pageData.galleryImages || defaultGalleryImages;
  const painPoints = pageData.problemPainPoints || defaultPainPoints;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/images/site/malliti-preto.png" alt="Maletti" width={100} height={40} />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="https://shrhair.com.br/produtos"
              className="hidden sm:inline-flex text-sm text-gray-600 hover:text-black transition-colors"
            >
              Ver Produtos
            </Link>
            <a
              href="https://wa.me/5511981982279?text=Olá! Gostaria de saber mais sobre os equipamentos Maletti para meu salão."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span className="hidden sm:inline">Falar com Consultor</span>
            </a>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 block">
                Head SPA Premium
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-black mb-6 leading-tight">
                O Padrão Ouro do Head SPA:{" "}
                <span className="text-gray-500">Design Italiano e Tecnologia de Wellness.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                A infraestrutura mais desejada do mundo. Crie rituais sensoriais únicos que encantam seus clientes e justificam seu alto valor.
              </p>
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors group"
              >
                Conhecer a Coleção Maletti
                <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] bg-gray-100"
            >
              <Image
                src="/images/site/Shirobody_showroom.jpg"
                alt="Maletti Head SPA"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEMATIZAÇÃO */}
      <section ref={problemRef} className="py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-black mb-8 text-center">
              Por que salões comuns têm dificuldade em cobrar valores premium?
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 text-center">
              No mercado de luxo, o cliente não paga apenas pelo serviço, ele paga pela{" "}
              <strong className="text-black">infraestrutura e pela exclusividade</strong>. 
              Quando o ambiente não reflete o valor cobrado, o cliente resiste ao preço.
            </p>

            <div className="bg-white p-8 mb-12 border border-gray-200">
              <ul className="space-y-4">
                {painPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={problemInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="text-black font-bold mt-1">•</span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-black text-white p-10"
            >
              <h3 className="text-2xl font-serif font-semibold mb-4">
                A Solução Maletti
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Traga para o seu salão a fusão entre <strong className="text-white">85 anos de herança italiana</strong> e 
                a inovação da <strong className="text-white">tecnologia coreana</strong>. A base definitiva para criar 
                experiências sensoriais inesquecíveis e manter sua liderança no mercado de luxo.
              </p>
              <p className="text-gray-400 text-sm">
                É essa combinação que transforma um simples tratamento em um ritual de alto valor agregado.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. ESTAÇÕES DE TRABALHO */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle
            badge="Arquitetura de Alta Performance"
            title="A Base da Sua Estação de Trabalho"
            description="Comece pela estrutura. Selecione a estação que melhor se adapta ao seu menu de serviços e ao tamanho do seu espaço."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {workstations.map((station, index) => (
              <WorkstationCard key={station.name} station={station} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTEGRAÇÃO TECNOLÓGICA */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle
            badge="Ferramentas de Precisão"
            title="Equipe sua Estação com Tecnologia de Ponta"
            description="Para justificar um ticket elevado, sua estação de trabalho deve entregar resultados clínicos e sensoriais superiores. Integre os equipamentos que operacionalizam o serviço de Head SPA."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <TechCard key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. JORNADA DO CLIENTE */}
      <section ref={journeyRef} className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={journeyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 block">
                  Construindo o Menu de R$ 500+
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-black mb-6">
                  Do Diagnóstico ao Relaxamento Absoluto
                </h2>
                <p className="text-gray-600 leading-relaxed mb-10">
                  Veja como transformar insumos comuns em um protocolo de alto valor agregado usando a tecnologia Maletti.
                </p>
              </motion.div>

              <div className="space-y-0">
                {journeySteps.map((item, index) => (
                  <JourneyStep key={item.step} item={item} index={index} total={journeySteps.length} />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={journeyInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 p-6 bg-gray-50 border-l-4 border-black"
              >
                <p className="text-black font-medium">
                  Resultado: Um serviço que seus concorrentes não conseguem copiar e pelo qual seu cliente paga com satisfação.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={journeyInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[3/4] bg-gray-100 sticky top-32"
            >
              <Image
                src="/images/site/Head-spa-1.jpg"
                alt="Head SPA Journey"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. GALERIA */}
      <section ref={galleryRef} className="py-24 lg:py-32 bg-black text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle
            badge="Prova Social"
            title="O Padrão de Referência Mundial"
            description="Junte-se aos salões e clínicas que lideram o mercado de luxo no Brasil e no mundo."
            light
          />

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

            <button
              onClick={() => setCurrentGalleryImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <HiChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <HiChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentGalleryImage ? "bg-white w-8" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-black mb-6">
              {pageData.ctaTitle || "Sua tabela de preços reflete a qualidade do seu negócio?"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {pageData.ctaDescription || "Pare de deixar dinheiro na mesa. Atraia o público que valoriza a excelência e transforme seu salão em uma referência de alto padrão."}
            </p>
            <p className="text-gray-500 mb-10">
              {pageData.ctaNote || "A tecnologia Maletti precisa ser vista para ser compreendida."}
            </p>

            <p className="text-sm uppercase tracking-wider text-gray-400 mb-8">
              {pageData.ctaSubtitle || "Qual o próximo passo para o crescimento do seu faturamento?"}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {(pageData.ctaButtons && pageData.ctaButtons.length > 0) ? (
                pageData.ctaButtons.map((btn, i) => {
                  const isExternal = btn.link?.startsWith("http") || btn.link?.startsWith("https");
                  const styles = btn.style === "primary"
                    ? "flex items-center gap-2 px-6 py-4 bg-black text-white hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
                    : btn.style === "outline"
                    ? "flex items-center gap-2 px-6 py-4 border border-black text-black hover:bg-black hover:text-white transition-colors w-full sm:w-auto justify-center"
                    : "flex items-center gap-2 px-6 py-4 border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors w-full sm:w-auto justify-center";
                  const icons = [<HiOutlineCalendar key="cal" className="w-5 h-5" />, <HiOutlineChat key="chat" className="w-5 h-5" />, <HiOutlineDownload key="dl" className="w-5 h-5" />];
                  if (isExternal) {
                    return <a key={i} href={btn.link} target="_blank" rel="noopener noreferrer" className={styles}>{icons[i] || null}{btn.text}</a>;
                  }
                  return <Link key={i} href={btn.link || "/contato"} className={styles}>{icons[i] || null}{btn.text}</Link>;
                })
              ) : (
                <>
                  <a href="https://wa.me/5511981982279?text=Olá! Gostaria de agendar uma visita ao showroom para conhecer os equipamentos Maletti." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-4 bg-black text-white hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"><HiOutlineCalendar className="w-5 h-5" />Agendar Visita ao Showroom</a>
                  <a href="https://wa.me/5511981982279?text=Olá! Gostaria de uma consultoria sobre os equipamentos Maletti para meu salão." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-4 border border-black text-black hover:bg-black hover:text-white transition-colors w-full sm:w-auto justify-center"><HiOutlineChat className="w-5 h-5" />Consultoria com Especialista</a>
                  <Link href="/contato" className="flex items-center gap-2 px-6 py-4 border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors w-full sm:w-auto justify-center"><HiOutlineDownload className="w-5 h-5" />Baixar Catálogo</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Image src="/logoshr-white.png" alt="SHR" width={80} height={32} />
              <span className="text-gray-600">×</span>
              <Image src="/images/site/Maletti - Logo bianco.png" alt="Maletti" width={100} height={40} />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-1">
                SHR HAIR - Distribuidora Exclusiva Maletti Group no Brasil
              </p>
              <p className="text-gray-500 text-xs">
                Design Italiano. Tecnologia Coreana. Suporte Completo.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
