"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineHeart,
  HiOutlineBadgeCheck
} from "react-icons/hi";

const defaultFeatures = [
  { icon: HiOutlineSparkles, title: "Design Italiano", description: "Cada peça é uma obra de arte que combina estética refinada com funcionalidade superior." },
  { icon: HiOutlineLightBulb, title: "Inovação Tecnológica", description: "Tecnologia de ponta integrada para proporcionar experiências únicas aos seus clientes." },
  { icon: HiOutlineHeart, title: "Experiência Sensorial", description: "Sistemas de massagem, cromoterapia e aromaterapia para o bem-estar completo." }
];

const defaultAwards = [
  { title: "Grand Prix de l'Innovation", location: "Paris, França", year: "2023", description: "Reconhecimento pela inovação em design de mobiliário para salões" },
  { title: "Credit Reputation Award", location: "Itália", year: "2022", description: "Excelência em reputação corporativa e confiabilidade" },
  { title: "Cosmoprof Excellence Award", location: "Bologna, Itália", year: "2024", description: "Melhor design em equipamentos para bem-estar capilar" },
  { title: "MCB Paris Design Award", location: "Paris, França", year: "2023", description: "Destaque em inovação tecnológica aplicada ao design" }
];

const defaultStats = [
  { number: "60+", label: "Anos de história" },
  { number: "90+", label: "Países atendidos" },
  { number: "15", label: "Showrooms no mundo" },
  { number: "500+", label: "Parceiros globais" }
];

interface MalettiEssenciaProps {
  content?: Record<string, unknown>;
}

export function MalettiEssencia({ content = {} }: MalettiEssenciaProps) {
  const badge = (content.badge as string) || "Nossa História";
  const title = (content.title as string) || "A Essência Maletti";
  const description = (content.description as string) || "Nossa essência vai além da criação de móveis para salão de beleza de luxo. É uma tradição que une a arte do design italiano à inovação tecnológica em cada detalhe. O resultado são peças que encantam pelo estilo, entregam performance, conforto absoluto e a experiência de bem-estar que define a sua marca.";
  const showroomImage = (content.showroomImage as string) || "/images/site/Shirobody_showroom.jpg";
  const stats = (content.stats as Array<{ number: string; label: string }>) || defaultStats;
  const features = defaultFeatures;
  const awards = defaultAwards;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="essencia" ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
            {badge}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-black mb-6">
            {title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-black" />
              <h3 className="text-xl font-serif font-semibold text-black mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Global Presence Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-12 border-y border-gray-200"
        >
          {stats.map((item: { number: string; label: string }, index: number) => (
            <div key={index} className="text-center">
              <span className="text-4xl md:text-5xl font-serif font-bold text-black block mb-2">
                {item.number}
              </span>
              <span className="text-gray-600 text-sm uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Liderança Global e Prêmios */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-serif font-semibold text-black mb-4">
              Liderança Global e Reconhecimento
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              A Maletti é líder e referência mundial no setor, com presença como protagonista 
              nas feiras mais importantes do mundo.
            </p>
          </motion.div>

          {/* Awards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-gray-50 p-6 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center">
                    <HiOutlineBadgeCheck className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-serif font-bold text-black">{award.year}</span>
                </div>
                <h4 className="text-lg font-semibold text-black mb-1 group-hover:text-gray-700 transition-colors">
                  {award.title}
                </h4>
                <p className="text-sm text-gray-500 mb-2">{award.location}</p>
                <p className="text-gray-600 text-sm">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Showroom Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative aspect-[21/9] bg-gray-100 overflow-hidden"
        >
          <Image
            src={showroomImage}
            alt="Showroom Maletti"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="p-8 lg:p-16 max-w-xl">
              <p className="text-white/80 text-sm uppercase tracking-wider mb-2">Showrooms Internacionais</p>
              <h4 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-4">
                Experiência Premium em Todo o Mundo
              </h4>
              <p className="text-white/70">
                Visite um dos nossos showrooms e descubra a excelência Maletti pessoalmente.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
