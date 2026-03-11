"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";

const defaultImages = [
  "/images/site/Head-spa-1.jpg",
  "/images/site/Head-spa-2.jpg",
  "/images/site/Head-spa-3.jpg",
  "/images/site/Head-spa-4.jpg",
  "/images/site/Head-spa-5.jpg",
  "/images/site/Head-spa-6.jpg",
];

const defaultBenefits = [
  { title: "Diferenciação", description: "Destaque-se no mercado oferecendo uma experiência única e exclusiva aos seus clientes." },
  { title: "Ticket Médio", description: "Aumente a rentabilidade do seu negócio com serviços premium de alto valor agregado." },
  { title: "Fidelização", description: "Conquiste e fidelize um público de alto padrão que busca experiências exclusivas." }
];

interface MalettiHeadSpaProps {
  content?: Record<string, unknown>;
}

export function MalettiHeadSpa({ content = {} }: MalettiHeadSpaProps) {
  const badge = (content.badge as string) || "Tendência Mundial";
  const title = (content.title as string) || "Maletti Head SPA";
  const description = (content.description as string) || "As Estações Maletti Head SPA transformam o cuidado capilar em um ritual de bem-estar e resultados, promovendo a saúde do couro cabeludo através de uma experiência holística.";
  const buttonText = (content.buttonText as string) || "Conhecer Estações Head SPA";
  const buttonLink = (content.buttonLink as string) || "https://www.shrhair.com.br/produtos?categoria=head-spa";
  const headSpaImages = (content.images as string[]) || defaultImages;
  const benefits = (content.benefits as Array<{ title: string; description: string }>) || defaultBenefits;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="head-spa" ref={ref} className="py-24 lg:py-32 bg-gray-50">
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

        {/* Head SPA Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {headSpaImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square bg-gray-200 overflow-hidden group"
            >
              <Image
                src={img}
                alt={`Head SPA ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-white p-8 text-center"
            >
              <h3 className="text-2xl font-serif font-semibold text-black mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 transition-all duration-300 group"
            asChild
          >
            <Link href={buttonLink}>
              {buttonText}
              <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
