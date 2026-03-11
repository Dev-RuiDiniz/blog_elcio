"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { HiPlay, HiX, HiArrowRight } from "react-icons/hi";

const defaultProducts = [
  { name: "Shirobody", image: "/images/site/Shirobody_showroom.jpg", description: "Lavatório com tecnologia shiatsu integrada", slug: "shirobody" },
  { name: "Heaven", image: "/images/site/heaven2.jpg", description: "Design e conforto para lavagem de cabelos", slug: "heaven" },
  { name: "Total Body", image: "/images/site/Total-Body-356.jpg", description: "Maca de luxo para tratamentos corporais", slug: "total-body" },
  { name: "SPA Garçon", image: "/images/site/SPA_GARCON_nuovo_03.png", description: "Tratamento capilar com tecnologia de vapor", slug: "spa-garcon" }
];

interface MalettiDesignProps {
  content?: Record<string, unknown>;
}

export function MalettiDesign({ content = {} }: MalettiDesignProps) {
  const badge = (content.badge as string) || "Excelência em Mobiliário";
  const title = (content.title as string) || "Design e Experiências";
  const description = (content.description as string) || "A excelência em móveis para salão de beleza de luxo: Veja o autêntico design italiano em sua máxima performance. Assista e sinta por que o mobiliário de alto padrão Maletti é a escolha perfeita para transformar seu espaço.";
  const videoThumbnail = (content.videoThumbnail as string) || "/images/site/DK3E3179-MOD.jpg";
  const videoUrl = (content.videoUrl as string) || "https://www.youtube.com/embed/dQw4w9WgXcQ";
  const products = (content.products as Array<{ name: string; image: string; description: string; slug?: string; link?: string }>) || defaultProducts;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <section id="design" ref={ref} className="py-24 lg:py-32 bg-white">
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

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video bg-gray-900 mb-20 overflow-hidden group cursor-pointer"
            onClick={() => setShowVideo(true)}
          >
            <Image
              src={videoThumbnail}
              alt="Maletti Design"
              fill
              className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <HiPlay className="w-8 h-8 text-black ml-1" />
              </div>
            </div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-sm uppercase tracking-wider mb-2 opacity-80">Assista</p>
              <h3 className="text-2xl font-serif font-semibold">A Arte do Design Italiano</h3>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold text-black mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
                {(product.link || product.slug) && (
                  <Link
                    href={product.link || `/produtos/${product.slug}`}
                    className="inline-flex items-center text-sm font-medium text-black hover:text-gray-600 transition-colors group/link"
                  >
                    Saiba mais
                    <HiArrowRight className="ml-1 w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
