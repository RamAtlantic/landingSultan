"use client";

import { MapPin } from "lucide-react";
import { useUserTracking } from "../app/context/tracking-context";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

declare global {
  interface Window {
    fbq: any;
  }
}

export function HeroSection() {
  const { sendTrackingData } = useUserTracking();
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [localidad, setLocalidad] = useState<string | null>(null);
  const [loadingLocalidad, setLoadingLocalidad] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsVisible(true);
    const fetchLocalidad = async () => {
      try {
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        const ip = ipResponse.data.ip;
        const geoRes = await axios.get(`https://ipinfo.io/${ip}/json`);
        setLocalidad(geoRes.data.city);
      } catch (e: any) {
        console.warn("No se pudo obtener la localidad:", e.message);
      } finally {
        setLoadingLocalidad(false);
      }
    };
    fetchLocalidad();
  }, []);

  const handleWhatsAppClick = async () => {
    setLoadingStates((prevStates) => ({ ...prevStates, whatsapp: true }));
    try {
      window.fbq("track", "StartTrial", {
        content_name: "Botón CTA",
        value: 10,
        currency: "USD",
      });
      try {
        await sendTrackingData();
      } catch (error) {
        console.error("Error enviando datos de tracking:", error);
      }
    } finally {
      window.location.href = process.env.NEXT_PUBLIC_REGISTER_URL || "";
      setLoadingStates((prevStates) => ({ ...prevStates, whatsapp: false }));
    }
  };

  const CircularLoader = () => (
    <motion.div
      className="w-6 h-6 border-2 border-[#E9934D]/30 border-t-[#E9934D] rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.5, // Añadido para corregir el tipo
      },
    },
  };

  // Generar estrellas aleatorias
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
      });
    }
    return stars;
  };

  const stars = generateStars();

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Estrellas flotantes */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-0.5 h-0.5 bg-[#E9934D] rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size / 2}px`,
              height: `${star.size / 2}px`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-36 h-36 bg-gradient-to-r from-[#E9934D]/20 to-red-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-red-600/15 to-[#E9934D]/15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-[#E9934D]/10 to-red-400/10 rounded-full blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-2 py-1">
        <div className="container mx-auto max-w-3xl">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {/* Header Title */}
                <motion.div
                  variants={cardVariants}
                  className="text-center mb-1"
                >
                  <motion.h1 className="text-xl md:text-5xl font-black leading-tight">
                    <motion.span
                      className="block bg-gradient-to-r from-[#107B6B] via-[#E9934D] to-red-600 bg-clip-text text-transparent mb-1 font-black"
                      animate={{
                        backgroundPosition: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                    >
                      CREA TU USUARIO EN SEGUNDOS{" "}
                      <span className="mt-1 font-extrabold">
                        GRATIS
                      </span>
                    </motion.span>
                  </motion.h1>
                  <motion.p
                    className="text-xs md:text-xl font-black text-red-500 mt-1"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    RETIROS EN MENOS DE 10 MINUTOS
                  </motion.p>
                </motion.div>

                {/* Carta Astral Destacada */}
                <motion.div
                  variants={cardVariants}
                  className="bg-gradient-to-br from-[#E9934D]/20 to-red-600/20 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border-2 border-[#E9934D]/50 max-w-2xl mx-auto"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(233, 147, 77, 0.5)",
                  }}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-4xl mb-2"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      ✨🔮✨
                    </motion.div>
                    <motion.h2
                      className="text-lg md:text-3xl font-black text-[#E9934D] mb-2"
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(233, 147, 77, 0.5)",
                          "0 0 20px rgba(233, 147, 77, 0.8)",
                          "0 0 10px rgba(233, 147, 77, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      CARTA ASTRAL DE REGALO 🎁
                    </motion.h2>

                    <p className="text-sm md:text-lg font-bold text-red-400">
                      Descubre tu destino y potencial oculto
                    </p>
                  </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                  variants={cardVariants}
                  className="text-center mt-6"
                >
                  <div className="flex flex-col items-center gap-2">
                    <motion.button
                      onClick={handleWhatsAppClick}
                      disabled={loadingStates["register"]}
                      className="group relative bg-gradient-to-r from-[#E9934D] via-yellow-500 to-[#E9934D] hover:from-yellow-400 hover:to-[#E9934D] disabled:from-[#E9934D]/60 disabled:to-yellow-600/60 text-black font-black py-1 px-3 text-lg lg:text-2xl rounded-full shadow-2xl overflow-hidden min-w-[140px] lg:min-w-[200px] min-h-[40px] lg:min-h-[50px] flex items-center justify-center gap-2 border-2 border-red-500"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 25px 50px -12px rgba(233, 147, 77, 0.8)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-[#E9934D]"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="relative flex items-center gap-2">
                        {loadingStates["register"] ? (
                          <>
                            <CircularLoader />
                            <span className="font-black">CONECTANDO...</span>
                          </>
                        ) : (
                          <>
                            <motion.div className="text-xl mr-1">
                              💰
                            </motion.div>
                            <span className="text-md font-black">
                              QUIERO CARGAR
                            </span>
                            <motion.div className="text-xl ml-1">
                              💰
                            </motion.div>
                          </>
                        )}
                      </div>
                     
                    </motion.button>
                    <div className="text-xs text-gray-400 w-[100vw] text-center">
                        Con tu carga descarga tu <span className="font-extrabold">CARTA ASTRAL</span>
                      </div>
                  </div>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
                  {/* Video Card - Spans 2 columns on desktop */}
                  <motion.div
                    variants={cardVariants}
                    className="lg:col-span-2 bg-black/70 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border-2 border-[#E9934D]/50"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 25px 50px -12px rgba(233, 147, 77, 0.4)",
                    }}
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                      <video
                        src="/sultanAstral.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <motion.div
                        className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-black flex items-center gap-1 border border-[#E9934D]"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <div className="w-1 h-1 bg-[#E9934D] rounded-full animate-pulse" />
                        EN VIVO
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Location Card Grande */}
                 {/*  <motion.div
                    variants={cardVariants}
                    className="bg-gradient-to-br from-[#107B6B]/20 to-[#E9934D]/20 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border-2 border-[#E9934D]/50"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(233, 147, 77, 0.3)",
                    }}
                  >
                    <div className="text-center flex flex-row lg:flex-col items-center justify-center lg:justify-center lg:items-center lg:text-6xl lg:gap-4">
                      <div className="flex items-center justify-center gap-1 mb-1 lg:gap-2 lg:mb-2">
                        <MapPin className="w-3 h-3 text-[#E9934D] lg:w-5 lg:h-5" />
                        {loadingLocalidad ? (
                          <div className="h-3 bg-[#E9934D]/50 rounded animate-pulse w-10 lg:w-20" />
                        ) : (
                          <span className="text-[#107B6B] font-black text-xs lg:text-xl">
                            {localidad || "Argentina"}
                          </span>
                        )}
                      </div>
                      <motion.div className="text-xl ml-1 mb-1 lg:text-6xl lg:ml-0">
                        🇦🇷
                      </motion.div>
                    </div>
                  </motion.div> */}
                </div>

                {/* Sin límite Card */}
                <motion.div
                  variants={cardVariants}
                  className="bg-gradient-to-br from-red-600/20 to-[#E9934D]/20 backdrop-blur-xl rounded-3xl p-2 shadow-xl border-2 border-[#E9934D]/50 max-w-sm mx-auto"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(233, 147, 77, 0.25)",
                  }}
                >
                  <div className="text-center flex justify-center">
                    <motion.h2 className="text-xs lg:text-xl font-black text-center">
                      <span className="text-[#107B6B] font-black">
                        SIN LIMITE DE RETIRO AL DIA
                      </span>
                    </motion.h2>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
