"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  HiArrowRight,
  HiOutlineSparkles
} from "react-icons/hi";
import { Button } from "@/components/ui/button";

interface PageBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
  active: boolean;
}

export default function SobrePage() {
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  const heroBlock = blocks.find(b => b.type === "about-hero")?.content || {};
  const missionBlock = blocks.find(b => b.type === "about-mission")?.content || {};
  const valuesBlock = blocks.find(b => b.type === "about-values")?.content || {};
  const partnershipBlock = blocks.find(b => b.type === "about-partnership")?.content || {};
  const ctaBlock = blocks.find(b => b.type === "about-cta")?.content || {};

  useEffect(() => {
    fetch("/api/pages/sobre").then(r => r.json()).then(data => setBlocks(data.page?.blocks || [])).catch(console.error);
  }, []);

  const titleParts = ((heroBlock.title as string) || "A arte de|transformar|salões").split("|");
  const values = (valuesBlock.values as Array<{ title: string; description: string }>) || [
    { title: "Excelência", description: "Buscamos a perfeição em cada detalhe, desde o atendimento até a entrega final." },
    { title: "Confiança", description: "Construímos relacionamentos duradouros baseados em transparência e honestidade." },
    { title: "Inovação", description: "Trazemos as últimas tendências e tecnologias do mercado internacional." },
    { title: "Parceria", description: "Trabalhamos lado a lado com nossos clientes para alcançar seus objetivos." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pb-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                {(heroBlock.badge as string) || "Sobre Nós"}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-black mb-6 leading-tight">
                {titleParts.map((part, i) => <span key={i}>{part}{i < titleParts.length - 1 && <br />}</span>)}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {(heroBlock.description as string) || "Há mais de uma década, a SHR é referência no mercado brasileiro de mobiliário para salões de beleza e spas. Como distribuidor exclusivo da Maletti, trazemos o melhor do design italiano para transformar espaços em experiências únicas."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 transition-all duration-300 group"
                  asChild
                >
                  <Link href={(heroBlock.buttonLink as string) || "/produtos"}>
                    {(heroBlock.buttonText as string) || "Conhecer Produtos"}
                    <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                  asChild
                >
                  <Link href={(heroBlock.secondaryLink as string) || "/contato"}>
                    {(heroBlock.secondaryButtonText as string) || "Falar Conosco"}
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {/* Showroom image */}
                <Image
                  src={(heroBlock.image as string) || "/images/site/Shirobody_showroom.jpg"}
                  alt="Showroom SHR"
                  fill
                  className="object-cover"
                />
                {/* Overlay with logo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <Image
                    src="/logoshr-white.png"
                    alt="SHR"
                    width={100}
                    height={40}
                    className="mb-3"
                  />
                  <p className="text-white/80 text-sm">Distribuidor Exclusivo Maletti</p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-white/30" />
              </div>

              {/* Stats overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-8 -right-8 bg-black text-white p-8 shadow-2xl"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-3xl font-serif font-bold">{(heroBlock.stat1Value as string) || "10+"}</span>
                    <p className="text-xs text-gray-400 mt-1">{(heroBlock.stat1Label as string) || "Anos de mercado"}</p>
                  </div>
                  <div>
                    <span className="text-3xl font-serif font-bold">{(heroBlock.stat2Value as string) || "500+"}</span>
                    <p className="text-xs text-gray-400 mt-1">{(heroBlock.stat2Label as string) || "Clientes"}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                {(missionBlock.badge as string) || "Nossa Missão"}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-black mb-8 leading-tight">
                &ldquo;{(missionBlock.quote as string) || "Transformar salões de beleza em espaços de excelência, proporcionando aos profissionais as melhores ferramentas para encantar seus clientes."}&rdquo;
              </h2>
              <p className="text-gray-600 text-lg">
                {(missionBlock.author as string) || "— Equipe SHR"}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              {(valuesBlock.badge as string) || "Nossos Valores"}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black">
              {(valuesBlock.title as string) || "O que nos guia"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {(value as Record<string, unknown>).icon ? (
                    <span className="text-2xl">{(value as Record<string, unknown>).icon as string}</span>
                  ) : (
                    <HiOutlineSparkles className="w-7 h-7" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Maletti Partnership */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                {(partnershipBlock.badge as string) || "Parceria Exclusiva"}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-6">
                {(partnershipBlock.title as string) || "Maletti: Tradição italiana desde 1965"}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {(partnershipBlock.description1 as string) || "A Maletti é uma das mais prestigiadas fabricantes de mobiliário para salões de beleza do mundo. Com mais de 55 anos de história, a marca italiana é sinônimo de inovação, qualidade e design sofisticado."}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {(partnershipBlock.description2 as string) || "Como distribuidor exclusivo no Brasil, a SHR oferece toda a linha de produtos Maletti com garantia de originalidade, suporte técnico especializado e peças de reposição originais."}
              </p>
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 group"
                asChild
              >
                <Link href={(partnershipBlock.buttonLink as string) || "/produtos"}>
                  {(partnershipBlock.buttonText as string) || "Ver Produtos Maletti"}
                  <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-black relative overflow-hidden">
                {/* Product image */}
                <Image
                  src={(partnershipBlock.image as string) || "/images/site/heaven2.jpg"}
                  alt="Maletti Heaven"
                  fill
                  className="object-cover opacity-60"
                />
                {/* Overlay with Maletti logo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <Image
                    src="/images/site/Maletti - Logo bianco.png"
                    alt="Maletti"
                    width={180}
                    height={70}
                    className="mb-4"
                  />
                  <p className="text-white/70 text-sm tracking-widest">SINCE 1965</p>
                </div>
                {/* Decorative corner */}
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/20" />
              </div>
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-white text-black p-6 shadow-2xl"
              >
                <span className="text-3xl font-serif font-bold">{(partnershipBlock.yearsBadge as string) || "55+"}</span>
                <p className="text-xs text-gray-500 mt-1">{(partnershipBlock.yearsBadgeLabel as string) || "Anos de história"}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-black mb-6">
              {(ctaBlock.title as string) || "Pronto para transformar seu salão?"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              {(ctaBlock.description as string) || "Entre em contato conosco e descubra como os produtos Maletti podem elevar o padrão do seu negócio."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
                asChild
              >
                <Link href={(ctaBlock.buttonLink as string) || "/contato"}>
                  {(ctaBlock.buttonText as string) || "Entrar em Contato"}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                asChild
              >
                <a
                  href={(ctaBlock.secondaryLink as string) || "https://wa.me/5511981982279"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {(ctaBlock.secondaryButtonText as string) || "WhatsApp"}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
