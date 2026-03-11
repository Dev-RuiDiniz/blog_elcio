"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";

interface SectionData {
  title: string;
  subtitle: string;
  image: string;
  content: {
    paragraphs: string[];
    features: string[];
    foundationYear: string;
    button1Text: string;
    button1Link: string;
    button2Text: string;
    button2Link: string;
  };
}

const defaultData: SectionData = {
  title: "A tradição italiana no seu salão",
  subtitle: "Parceria Exclusiva",
  image: "/images/site/Shirobody_showroom.jpg",
  content: {
    paragraphs: [
      "A Maletti é uma das mais prestigiadas fabricantes de mobiliário para salões de beleza do mundo. Fundada em 1965 na Itália, a marca é sinônimo de inovação, qualidade e design sofisticado.",
      "Como distribuidor exclusivo no Brasil, a SHR traz toda a excelência Maletti para o mercado nacional, com garantia de originalidade, suporte técnico especializado e peças de reposição originais.",
    ],
    features: [
      "Produtos 100% originais importados da Itália",
      "Garantia estendida e suporte técnico nacional",
      "Showroom exclusivo para visitação",
      "Consultoria personalizada para seu projeto",
    ],
    foundationYear: "1965",
    button1Text: "Conhecer a Maletti",
    button1Link: "/maletti",
    button2Text: "Agendar Visita",
    button2Link: "/contato",
  },
};

export function MalettiPartnership() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [data, setData] = useState<SectionData>(defaultData);

  useEffect(() => {
    fetch("/api/home-sections?sectionId=maletti-partnership")
      .then((res) => res.json())
      .then((result) => {
        if (result.section) {
          setData({
            title: result.section.title || defaultData.title,
            subtitle: result.section.subtitle || defaultData.subtitle,
            image: result.section.image || defaultData.image,
            content: result.section.content || defaultData.content,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
              <Image
                src={data.image}
                alt="Showroom Maletti"
                fill
                className="object-cover"
              />
              {/* Overlay com logo */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Image
                  src="/images/site/Maletti - Logo bianco.png"
                  alt="Maletti"
                  width={200}
                  height={80}
                  className="opacity-90"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/20" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-white text-black p-6 shadow-2xl"
            >
              <span className="text-4xl font-serif font-bold">{data.content.foundationYear}</span>
              <p className="text-xs uppercase tracking-wider text-gray-600 mt-1">
                Fundação Maletti
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">
              {data.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6 leading-tight">
              {data.title.split(" ").slice(0, 3).join(" ")}
              <br />
              {data.title.split(" ").slice(3).join(" ")}
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
              {data.content.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Features list */}
            <ul className="space-y-3 mb-10">
              {data.content.features.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={data.content.button1Link}>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 transition-all duration-300 group"
                >
                  {data.content.button1Text}
                  <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={data.content.button2Link}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-transparent hover:bg-white/10 transition-all duration-300"
                >
                  {data.content.button2Text}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
