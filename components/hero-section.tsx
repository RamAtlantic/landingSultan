"use client";
import {
  ArrowRight,
  MessageCircle,
  CreditCard,
  MapPin,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";
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
      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
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
      },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/15 to-yellow-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-2xl"
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
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-2">
        <div className="container mx-auto max-w-6xl">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Header Title */}
                <motion.div
                  variants={cardVariants}
                  className="text-center mb-2"
                >
                  <motion.h1 className="text-2xl md:text-7xl font-black leading-tight">
                    <motion.span
                      className="block bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-800 bg-clip-text text-transparent mb-2"
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
                      <span className="text-emerald-500 mt-2">GRATIS</span>
                    </motion.span>
                  </motion.h1>
                  <motion.p
                    className="text-xs md:text-2xl font-bold text-emerald-600 mt-2"
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

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Video Card - Spans 2 columns on desktop */}
                  <motion.div
                    variants={cardVariants}
                    className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                      <motion.div
                        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        EN VIVO
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Location Card Grande */}
                  <motion.div
                    variants={cardVariants}
                    className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-blue-200/50"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                    }}
                  >
                    <div className="text-center flex flex-row lg:flex-col items-center justify-center lg:justify-center lg:items-center lg:text-6xl lg:gap-4">
                      <div className="flex items-center justify-center gap-2 mb-2 lg:gap-4 lg:mb-4">
                        <MapPin className="w-5 h-5 text-blue-600 lg:w-10 lg:h-10" />
                        {loadingLocalidad ? (
                          <div className="h-5 bg-blue-200 rounded animate-pulse w-20 lg:w-40" />
                        ) : (
                          <span className="text-slate-700 font-semibold text-xs lg:text-2xl font-anton">
                            {localidad || "Argentina"}
                          </span>
                        )}
                      </div>
                      <motion.div className="text-2xl ml-2 mb-2 lg:text-8xl lg:ml-0">
                        🇦🇷
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                  variants={cardVariants}
                  className="text-center mt-12"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                      <motion.p
                        className="text-slate-600 text-xs"
                        animate={{
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        CARGA Y TE REGALAMOS TU{" "}
                        <span className="font-bold">CARTA ASTRAL</span>
                      </motion.p>
                      <img
                        src="https://static.whatsapp.net/rsrc.php/v4/yz/r/ujTY9i_Jhs1.png"
                        alt="WhatsApp"
                        className="w-4 h-4 mb-1"
                      />
                    </div>

                    <motion.button
                      onClick={handleWhatsAppClick}
                      disabled={loadingStates["register"]}
                      className="group relative bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-400 hover:to-green-400 disabled:from-yellow-600 disabled:to-green-600 text-white font-black py-6 px-12 text-xl lg:text-3xl rounded-full shadow-2xl overflow-hidden min-w-[280px] lg:min-w-[400px] min-h-[80px] lg:min-h-[100px] flex items-center justify-center gap-4"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.5)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="relative flex items-center gap-4">
                        {loadingStates["register"] ? (
                          <>
                            <CircularLoader />
                            <span>CONECTANDO...</span>
                          </>
                        ) : (
                          <>
                            <motion.div className="text-2xl mr-1">
                              💰
                            </motion.div>
                            <span className="text-lg">Comenzar YA!</span>
                          </>
                        )}
                      </div>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Sin límite Card */}
                <motion.div
                  variants={cardVariants}
                  className="bg-transparent backdrop-blur-xl rounded-3xl p-2 shadow-xl border border-orange-200/50 max-w-md mx-auto"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(249, 115, 22, 0.15)",
                  }}
                >
                  <div className="text-center flex justify-center">
                    <motion.h2 className="text-sm lg:text-2xl font-black text-center">
                      <span className="text-[#295445]">
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
