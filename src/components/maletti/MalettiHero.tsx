"use client";

import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";

interface MalettiHeroProps {
  onNavigate?: (id: string) => void;
  content?: Record<string, unknown>;
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function MalettiHero({ onNavigate, content = {} }: MalettiHeroProps) {
  const handleNavigate = onNavigate || scrollToSection;
  const title = (content.title as string) || "Transforme Espaços.";
  const titleHighlight = (content.titleHighlight as string) || "Eleve Experiências.";
  const description = (content.description as string) || "Apresentamos a revolução do bem-estar capilar no Brasil. As estações Maletti Head SPA unem o design italiano a uma tecnologia inovadora para criar uma experiência sensorial que redefine o luxo em seu salão, spa ou clínica.";
  const videoUrl = (content.videoUrl as string) || "/Vídeo Home.mp4";
  const buttonText = (content.buttonText as string) || "Solicitar Catálogo";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 leading-tight">
              {title}
              <span className="text-gray-300"> {titleHighlight}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              {description}
            </p>

            <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 transition-all duration-300 group"
                onClick={() => handleNavigate("catalogo")}
              >
                {buttonText}
                <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
          </motion.div>
        </div>
      </section>
  );
}
