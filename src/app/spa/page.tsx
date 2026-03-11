"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
  HiPlay,
  HiX,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import {
  TbPlane,
  TbMoon,
  TbLeaf,
  TbBuildingSkyscraper,
  TbTrendingUp,
  TbShieldCheck,
} from "react-icons/tb";

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
  heroDescription?: string;
  heroSubDescription?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroVideo?: string;
  heroOverlay?: number;
  conceptBadge?: string;
  conceptTitle?: string;
  conceptDescription?: string;
  conceptHighlight?: string;
  infraBadge?: string;
  infraTitle?: string;
  infraDescription?: string;
  infrastructureProducts?: typeof defaultInfrastructureProducts;
  techBadge?: string;
  techTitle?: string;
  techDescription?: string;
  sensorTechnologies?: typeof defaultSensorTechnologies;
  cabinBadge?: string;
  cabinTitle?: string;
  cabinDescription?: string;
  cabinVideoUrl?: string;
  businessBadge?: string;
  businessTitle?: string;
  businessDescription?: string;
  businessBenefits?: Array<{ title: string; description: string }>;
  ritualsBadge?: string;
  ritualsTitle?: string;
  ritualsDescription?: string;
  rituals?: typeof defaultRituals;
  socialBadge?: string;
  socialTitle?: string;
  socialDescription?: string;
  hotelShowcase?: typeof defaultHotelShowcase;
  ctaBadge?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  ctaButtons?: { text: string; link: string; style: string }[];
  relatedProducts?: typeof defaultRelatedProducts;
}

// ============================================
// DATA
// ============================================

const defaultInfrastructureProducts = [
  {
    name: "Total Body",
    tagline: "Otimização Máxima de Espaço",
    description:
      "Uma maca multifuncional com 4 motores e sistema de hidromassagem Pipe-free (higiene hospitalar). Permite realizar massagens, tratamentos faciais, pedicure e rituais de lavagem na mesma estação.",
    benefit:
      "Transforma salas compactas em suítes completas, permitindo serviços simultâneos e triplicando o faturamento da hora técnica.",
    image: "/images/site/Total-Body-356.jpg",
    slug: "total-body",
  },
  {
    name: "Heaven",
    tagline: "Ergonomia para Terapias Longas",
    description:
      "Desenvolvida com tecnologia que distribui o peso corporal, reduzindo em 92% os pontos de pressão nas costas e pescoço. Possui aquecimento lombar e memoriza a posição ideal de cada hóspede.",
    benefit:
      "O conforto absoluto induz ao relaxamento profundo, ideal para vender terapias de longa duração (60-90 min) focadas em recovery e jet lag.",
    image: "/images/site/heaven2.jpg",
    slug: "heaven",
  },
  {
    name: "Shirobody",
    tagline: "Multifuncionalidade",
    description:
      "Maca projetada para rituais com óleos e água, inspirada na medicina oriental. Possui arco Shirodhara integrado para fluxo contínuo na testa e inclinação elétrica de 80° para faciais.",
    benefit:
      "Possui sistema opcional de recirculação de água, permitindo rituais contínuos sem desperdício, essencial para a hotelaria verde.",
    image: "/images/site/Shirobody_showroom.jpg",
    slug: "shirobody",
  },
];

const defaultSensorTechnologies = [
  {
    name: "Vapomist",
    icon: "💨",
    tagline: "Muito Mais que Vapor",
    description:
      "Sistema de nebulização que envolve o hóspede em uma 'nuvem' de óleos essenciais e calor suave.",
    guestBenefit:
      "Uma experiência olfativa e tátil que induz o relaxamento profundo sem molhar excessivamente o rosto, mantendo o conforto térmico ideal.",
    differential: "Transforma um simples enxágue em um ritual de spa.",
    image: "/images/site/SPA_GARCON_nuovo_03.png",
    slug: "vapomist",
  },
  {
    name: "Igloo",
    icon: "🌡️",
    tagline: "Cúpula de Imersão",
    description:
      "Uma cúpula que se acopla à estação, criando um casulo privativo.",
    guestBenefit:
      "O máximo de privacidade. A cúpula isola acusticamente a cabeça, silenciando o mundo exterior e permitindo uma desconexão total.",
    differential:
      'Permite oferecer tratamentos de "Silêncio Absoluto" e meditação guiada.',
    image: "/images/site/Head-spa-3.jpg",
    slug: "igloo",
  },
];

const defaultRelatedProducts = [
  { name: "Heaven", image: "/images/site/heaven2.jpg", slug: "heaven", category: "Macas" },
  { name: "Shirobody", image: "/images/site/Shirobody_showroom.jpg", slug: "shirobody", category: "Macas" },
  { name: "Total Body", image: "/images/site/Total-Body-356.jpg", slug: "total-body", category: "Macas" },
  { name: "Spa Garçon", image: "/images/site/SPA_GARCON_nuovo_03.png", slug: "spa-garcon", category: "Mobiliário" },
  { name: "Vapomist", image: "/images/site/SPA_GARCON_nuovo_04.png", slug: "vapomist", category: "Tecnologia" },
];

const defaultBusinessBenefits = [
  {
    icon: TbBuildingSkyscraper,
    title: "Diferenciação de Bandeira",
    description:
      "Em um mercado saturado de massagens convencionais, o Head Spa posiciona seu hotel como uma destinação de wellness de vanguarda.",
  },
  {
    icon: TbTrendingUp,
    title: "Retenção e RevPAR",
    description:
      "Spas com infraestrutura multissensorial registram maior taxa de retorno de hóspedes e justificam um ticket médio (RevPAR) superior nas diárias e nos serviços.",
  },
  {
    icon: TbShieldCheck,
    title: "Longevidade do Ativo",
    description:
      'Equipamentos "Made in Italy" projetados para durabilidade extrema e baixo custo de manutenção, garantindo que a estética do seu spa permaneça impecável por anos.',
  },
];

const defaultRituals = [
  {
    icon: TbPlane,
    name: 'Jet Lag Recovery',
    emoji: '✈️',
    focus: "Viajantes Internacionais e Executivos",
    description:
      "Utilize a posição Zero Gravity do Heaven para anular a tensão física da viagem.",
    experience:
      "Enquanto o corpo descansa sem pressão gravitacional, o sistema Vapomist e a massagem craniana reajustam o relógio biológico e aliviam a tensão ocular e mental.",
  },
  {
    icon: TbMoon,
    name: 'Deep Sleep',
    emoji: '💤',
    focus: "Hóspedes com Distúrbios de Sono",
    description: "Combine o isolamento acústico do Igloo com aromaterapia de lavanda.",
    experience:
      "Um protocolo desenhado para desacelerar as ondas cerebrais (Alfa/Teta), preparando o hóspede para uma noite de sono reparador após um dia agitado.",
  },
  {
    icon: TbLeaf,
    name: 'Detox Urbano',
    emoji: '🏙️',
    focus: "Bem-estar e Purificação",
    description: "Utilize a precisão do Spa Garçon.",
    experience:
      "Uma limpeza profunda que remove micropartículas de poluição do couro cabeludo e fios, devolvendo a vitalidade e a leveza, ideal para spas urbanos e day use.",
  },
];

const defaultHotelShowcase = [
  { image: "/images/site/heaven2.jpg", location: "Maldivas", hotel: "Soneva Fushi" },
  { image: "/images/site/Shirobody_showroom.jpg", location: "Paris, França", hotel: "Le Bristol Paris" },
  { image: "/images/site/Total-Body-356.jpg", location: "Dubai, UAE", hotel: "Burj Al Arab" },
  { image: "/images/site/DK3E3179-MOD.jpg", location: "Toscana, Itália", hotel: "Rosewood Castiglion" },
  { image: "/images/site/Head-spa-1.jpg", location: "Bali, Indonésia", hotel: "Aman Villas" },
  { image: "/images/site/Head-spa-2.jpg", location: "São Paulo, Brasil", hotel: "Fasano" },
];

// ============================================
// COMPONENTS
// ============================================

function SectionBadge({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`inline-block text-[11px] uppercase tracking-[0.25em] mb-6 ${light ? "text-stone-300" : "text-stone-500"}`}>
      {children}
    </span>
  );
}

function ProductCard({ product, index }: { product: typeof defaultInfrastructureProducts[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group"
    >
      <div className="relative aspect-[4/3] mb-8 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-stone-300 text-xs uppercase tracking-widest">{product.tagline}</span>
          <h3 className="text-white text-3xl font-serif font-semibold mt-1">{product.name}</h3>
        </div>
      </div>
      
      <p className="text-gray-600 leading-relaxed mb-6">
        {product.description}
      </p>
      
      <div className="bg-stone-50 border-l-4 border-stone-400 p-5 mb-6">
        <span className="text-xs uppercase tracking-wider text-stone-600 block mb-2">Para o Hotel</span>
        <p className="text-gray-800 font-medium">{product.benefit}</p>
      </div>
      
      <Link
        href={`https://shrhair.com.br/produtos/${product.slug}`}
        className="inline-flex items-center text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors group/link"
      >
        Saiba mais
        <HiArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}

function TechCard({ tech, index }: { tech: typeof defaultSensorTechnologies[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="bg-white rounded-sm overflow-hidden shadow-xl shadow-black/5 group"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={tech.image}
          alt={tech.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{tech.icon}</span>
          <div>
            <h3 className="text-2xl font-serif font-semibold text-black">{tech.name}</h3>
            <span className="text-sm text-stone-500">{tech.tagline}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{tech.description}</p>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-sm">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
              Para o Hóspede
            </span>
            <p className="text-gray-800 text-sm">{tech.guestBenefit}</p>
          </div>
          <div className="bg-stone-100 p-4 rounded-sm">
            <span className="text-[10px] uppercase tracking-wider text-stone-600 block mb-1">
              Diferencial
            </span>
            <p className="text-gray-800 text-sm font-medium">{tech.differential}</p>
          </div>
        </div>
        
        <Link
          href={`https://shrhair.com.br/produtos/${tech.slug}`}
          className="inline-flex items-center text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors group/link mt-6"
        >
          Saiba mais
          <HiArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

function RitualCard({ ritual, index }: { ritual: typeof defaultRituals[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-stone-50 border border-stone-200 p-8 hover:shadow-lg transition-all duration-500 group rounded-sm"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-stone-400 to-stone-500 rounded-full flex items-center justify-center text-2xl">
          {ritual.emoji}
        </div>
        <div>
          <h3 className="text-xl font-serif font-semibold text-stone-800">Ritual &quot;{ritual.name}&quot;</h3>
          <span className="text-stone-500 text-sm">{ritual.focus}</span>
        </div>
      </div>
      
      <p className="text-stone-600 mb-4">{ritual.description}</p>
      
      <div className="bg-white p-4 rounded-sm border border-stone-100">
        <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-2">A Experiência</span>
        <p className="text-stone-700 text-sm leading-relaxed">{ritual.experience}</p>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN PAGE
// ============================================

interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  category?: { name: string } | null;
}

export default function SpaPage() {
  const [currentShowcase, setCurrentShowcase] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [pageData, setPageData] = useState<PageData>({});

  const heroRef = useRef(null);
  const conceptRef = useRef(null);
  const infrastructureRef = useRef(null);
  const techRef = useRef(null);
  const cabinRef = useRef(null);
  const businessRef = useRef(null);
  const ritualsRef = useRef(null);
  const socialRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const conceptInView = useInView(conceptRef, { once: true, margin: "-100px" });
  const infrastructureInView = useInView(infrastructureRef, { once: true, margin: "-100px" });
  const cabinInView = useInView(cabinRef, { once: true, margin: "-100px" });
  const businessInView = useInView(businessRef, { once: true, margin: "-100px" });
  const socialInView = useInView(socialRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  // Carregar dados da API
  useEffect(() => {
    fetch("/api/pages/spa")
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
      .catch(() => {});
  }, []);

  // Dados com fallback para defaults
  const infrastructureProducts = pageData.infrastructureProducts || defaultInfrastructureProducts;
  const sensorTechnologies = pageData.sensorTechnologies || defaultSensorTechnologies;
  const rituals = pageData.rituals || defaultRituals;
  const hotelShowcase = pageData.hotelShowcase || defaultHotelShowcase;
  const editorRelatedProducts = (pageData.relatedProducts as typeof defaultRelatedProducts) || [];
  
  // businessBenefits precisa manter os ícones React, então merge com defaults
  const benefitIcons = [TbBuildingSkyscraper, TbTrendingUp, TbShieldCheck];
  const businessBenefits = useMemo(() => {
    const dbBenefits = pageData.businessBenefits;
    if (!dbBenefits) return defaultBusinessBenefits;
    return dbBenefits.map((b, i) => ({
      ...b,
      icon: benefitIcons[i] || TbBuildingSkyscraper
    }));
  }, [pageData.businessBenefits]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentShowcase((prev) => (prev + 1) % hotelShowcase.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hotelShowcase.length]);

  // Buscar produtos da API local
  useEffect(() => {
    fetch("/api/products?limit=5")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setApiProducts(data.products.slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/images/site/malliti-preto.png" alt="Maletti" width={100} height={40} />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="https://shrhair.com.br/produtos"
              className="hidden sm:inline-flex text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              Ver Produtos
            </Link>
            <a
              href="https://wa.me/5511981982279?text=Olá! Gostaria de saber mais sobre os equipamentos Maletti para o spa do meu hotel."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-all rounded-sm"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span className="hidden sm:inline">Falar com Especialista</span>
            </a>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/site/heaven2.jpg"
            alt="Luxury Spa"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-stone-400/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-300/10 rounded-full blur-[150px]" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto"
          >
            <SectionBadge light>Nilo Spa Design</SectionBadge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-semibold text-white mb-8 leading-[1.1]">
              O Padrão dos Melhores Spas do Mundo:{" "}
              <span className="bg-gradient-to-r from-stone-300 to-stone-100 bg-clip-text text-transparent">
                Design Italiano e Tecnologia de Ponta.
              </span>
            </h1>

            <h2 className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
              Alinhe seu negócio aos padrões globais de wellness com o design italiano da Maletti e Nilo.
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
              Suítes de bem-estar que unem relaxamento, sustentabilidade e eficácia clínica, 
              garantindo a satisfação do hóspede mais exigente.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://shrhair.com.br/produtos"
                className="flex items-center gap-3 px-8 py-4 bg-white text-stone-800 font-medium hover:bg-stone-100 transition-all group rounded-sm"
              >
                Explorar a Coleção Completa
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/5511981982279?text=Olá! Gostaria de falar com um especialista sobre equipamentos para spa."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 border border-stone-400 text-white hover:bg-white/10 transition-all rounded-sm"
              >
                <FaWhatsapp className="w-5 h-5" />
                Falar com um Especialista
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
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
              className="w-1.5 h-1.5 bg-stone-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. O CONCEITO */}
      <section ref={conceptRef} className="py-28 lg:py-36 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={conceptInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <SectionBadge>{pageData.conceptBadge || "O Conceito"}</SectionBadge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-black mb-8">
              {pageData.conceptTitle || "Explore o potencial da sua infraestrutura."}
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {pageData.conceptDescription || <>O conceito de design multifuncional da Maletti e Nilo transforma uma cabine convencional em uma <strong className="text-black">suíte completa de serviços de alto padrão</strong>.</>}
            </p>

            <div className="bg-stone-50 p-8 md:p-12 rounded-sm border-l-4 border-stone-400">
              <p className="text-lg text-gray-700 leading-relaxed">
                {pageData.conceptHighlight || <>Em um cenário onde <strong className="text-black">78% dos clientes premium</strong> buscam saúde mental integrada à beleza, nossas estações permitem realizar terapias corporais, faciais e rituais de Head Spa no mesmo equipamento. Isso amplia seu menu de experiências e a <strong className="text-black"> rentabilidade por metro quadrado</strong>, oferecendo um atendimento fluido em um único ambiente exclusivo.</>}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. A INFRAESTRUTURA */}
      <section ref={infrastructureRef} className="py-28 lg:py-36 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={infrastructureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <SectionBadge>{pageData.infraBadge || "A Infraestrutura"}</SectionBadge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-black mb-6">
              {pageData.infraTitle || "Design de Assinatura e Performance Clínica."}
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {pageData.infraDescription || "Selecione a estação ideal para criar rituais completos. Unimos a estética premiada de designers renomados a equipamentos projetados para suportar protocolos complexos e longos, garantindo que cada atendimento seja uma experiência de luxo funcional e sem improvisos."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {infrastructureProducts.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECNOLOGIA SENSORIAL */}
      <section ref={techRef} className="py-28 lg:py-36 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <SectionBadge>{pageData.techBadge || "Tecnologia Sensorial"}</SectionBadge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-black mb-6">
              {pageData.techTitle || "A tecnologia deve ser invisível."}
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {pageData.techDescription || "No mercado de hospitalidade de luxo, a tecnologia serve apenas para potencializar o relaxamento absoluto do hóspede."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {sensorTechnologies.map((tech, index) => (
              <TechCard key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. MONTE UMA SPA CABIN COMPLETA */}
      <section ref={cabinRef} className="py-28 lg:py-36 bg-stone-100">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={cabinInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionBadge light>{pageData.cabinBadge || "Spa Cabin"}</SectionBadge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-stone-800 mb-6">
              {pageData.cabinTitle || "Monte uma Spa Cabin Completa"}
            </h2>
            
            <p className="text-stone-600 max-w-2xl mx-auto">
              {pageData.cabinDescription || "Combine os equipamentos para criar a experiência perfeita para seus hóspedes."}
            </p>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={cabinInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video max-w-5xl mx-auto mb-16 overflow-hidden rounded-sm group cursor-pointer"
            onClick={() => setShowVideo(true)}
          >
            <Image
              src="/images/site/Shirobody_showroom.jpg"
              alt="Spa Cabin Video"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <HiPlay className="w-10 h-10 text-white ml-1" />
              </div>
            </div>
          </motion.div>

          {/* Related Products */}
          <div>
            <h3 className="text-center text-stone-500 text-sm uppercase tracking-widest mb-8">
              Produtos Relacionados
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {(editorRelatedProducts.length > 0 ? editorRelatedProducts : apiProducts.length > 0 ? apiProducts : defaultRelatedProducts).map((product, index) => (
                <motion.div
                  key={product.slug || product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={cabinInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={(product as Record<string, string>).link || `/produtos/${product.slug}`}
                    className="block group"
                  >
                    <div className="relative aspect-square mb-3 overflow-hidden rounded-sm bg-white shadow-md">
                      <Image
                        src={product.image || "/images/site/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 block">
                      {(product as Product).category?.name || (product as typeof defaultRelatedProducts[0]).category || "Produto"}
                    </span>
                    <h4 className="text-stone-800 text-sm font-medium group-hover:text-stone-600 transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-xs text-stone-400 group-hover:text-black transition-colors mt-1 inline-block">
                      Saiba mais →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTELIGÊNCIA DE NEGÓCIO */}
      <section ref={businessRef} className="py-28 lg:py-36 bg-stone-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={businessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <SectionBadge light>{pageData.businessBadge || "Inteligência de Negócio"}</SectionBadge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-stone-800 mb-6">
              {pageData.businessTitle || "Valorização do Ativo"}
            </h2>
            
            <p className="text-stone-600 max-w-3xl mx-auto text-lg">
              {pageData.businessDescription || <>Incorporar a Nilo Spa Design não é apenas uma compra de mobiliário, é um <strong className="text-stone-800">investimento na valorização da sua marca</strong> e na retenção do hóspede.</>}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={businessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white border border-stone-200 p-8 hover:shadow-lg transition-all group rounded-sm"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-stone-400 to-stone-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-stone-800 mb-4">{benefit.title}</h3>
                <p className="text-stone-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MENU DE EXPERIÊNCIAS */}
      <section ref={ritualsRef} className="py-28 lg:py-36 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <SectionBadge light>{pageData.ritualsBadge || "Menu de Experiências"}</SectionBadge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-stone-800 mb-6">
              {pageData.ritualsTitle || "Rituais para o Viajante Global"}
            </h2>
            
            <p className="text-stone-600 max-w-3xl mx-auto text-lg">
              {pageData.ritualsDescription || "Desenhe protocolos exclusivos que atendam às necessidades físicas e emocionais do seu perfil de hóspede."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rituals.map((ritual, index) => (
              <RitualCard key={ritual.name} ritual={ritual} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. PROVA SOCIAL */}
      <section ref={socialRef} className="py-28 lg:py-36 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={socialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionBadge>{pageData.socialBadge || "Prova Social"}</SectionBadge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-black mb-6">
              {pageData.socialTitle || "A Escolha dos Melhores Hotéis do Mundo."}
            </h2>
            
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              {pageData.socialDescription || "Junte-se a uma rede global de hospitalidade de luxo que escolheu a Nilo Spa Design para definir o padrão de excelência em bem-estar. De resorts nas Maldivas a hotéis boutique em Paris, nossa assinatura é sinônimo de experiência inesquecível."}
            </p>
          </motion.div>

          {/* Showcase Carousel */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentShowcase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <Image
                  src={hotelShowcase[currentShowcase].image}
                  alt={hotelShowcase[currentShowcase].hotel}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="text-stone-300 text-sm uppercase tracking-widest">
                    {hotelShowcase[currentShowcase].location}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-serif font-semibold">
                    {hotelShowcase[currentShowcase].hotel}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => setCurrentShowcase((prev) => (prev - 1 + hotelShowcase.length) % hotelShowcase.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-colors rounded-full"
            >
              <HiChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setCurrentShowcase((prev) => (prev + 1) % hotelShowcase.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-colors rounded-full"
            >
              <HiChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {hotelShowcase.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentShowcase(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentShowcase ? "bg-stone-500 w-8" : "bg-stone-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section ref={ctaRef} className="py-28 lg:py-36 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <SectionBadge>{pageData.ctaBadge || "Convite ao Projeto"}</SectionBadge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-black mb-6">
              {pageData.ctaTitle || "Redefina a Experiência do seu Hóspede."}
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              {pageData.ctaDescription || "Ofereça o extraordinário. Nossa equipe de consultores e arquitetos está pronta para auxiliar no seu projeto."}
            </p>

            {(pageData.ctaButtons && pageData.ctaButtons.length > 0) ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {pageData.ctaButtons.map((btn, i) => {
                  const isExternal = btn.link?.startsWith("http");
                  const primaryCls = "inline-flex items-center gap-3 px-10 py-5 bg-stone-800 text-white text-lg font-medium hover:bg-stone-700 transition-all rounded-sm group";
                  const outlineCls = "inline-flex items-center gap-3 px-10 py-5 border border-stone-800 text-stone-800 text-lg font-medium hover:bg-stone-800 hover:text-white transition-all rounded-sm group";
                  const cls = btn.style === "outline" ? outlineCls : primaryCls;
                  return isExternal ? (
                    <a key={i} href={btn.link} target="_blank" rel="noopener noreferrer" className={cls}>
                      {i === 0 && <FaWhatsapp className="w-6 h-6" />}
                      {btn.text}
                      <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <Link key={i} href={btn.link || "/contato"} className={cls}>
                      {btn.text}
                      <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <a
                href={pageData.ctaButtonLink || "https://wa.me/5511981982279?text=Olá! Gostaria de falar com um consultor sobre equipamentos para o spa do meu hotel."}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-stone-800 text-white text-lg font-medium hover:bg-stone-700 transition-all rounded-sm group"
              >
                <FaWhatsapp className="w-6 h-6" />
                {pageData.ctaButtonText || "Falar com um Consultor"}
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-800 text-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <Image src="/logoshr-white.png" alt="SHR" width={80} height={32} />
              <span className="text-gray-600">×</span>
              <Image src="/images/site/Maletti - Logo bianco.png" alt="Maletti" width={100} height={40} />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-1">
                SHR HAIR - Distribuidora Exclusiva Maletti Group & Nilo Spa Design no Brasil
              </p>
              <p className="text-gray-500 text-xs">
                Design Italiano. Tecnologia de Ponta. Experiência Inesquecível.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-gray-300 transition-colors"
          >
            <HiX className="w-8 h-8" />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/Qnr4m40PkAY?autoplay=1&start=28"
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
