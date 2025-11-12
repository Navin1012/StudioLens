import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import services from "../../data/services";

export default function ServicesSection() {
  const [loadedImages, setLoadedImages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect device width dynamically
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  // 🎞 Animation Variants (no vertical lift)
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.6,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#0D0D0D] via-[#111] to-[#0D0D0D] overflow-hidden">
      {/* === Background Glow === */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none"></div>

      {/* === Heading === */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.19, 1, 0.22, 1],
        }}
        viewport={{ once: true }}
        className="text-center mb-12 sm:mb-16 relative z-10"
      >
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-wide text-white">
          Our <span className="text-[#D4AF37]">Signature Services</span>
        </h2>
        <p className="text-[#F5EDE3]/80 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-lg leading-relaxed">
          Each frame tells a story — from cinematic weddings to timeless portraits.
          Our artistry captures emotion, elegance, and magic.
        </p>
      </motion.div>

      {/* === Services Grid === */}
      <motion.div
        className="max-w-7xl mx-auto grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: {
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.25,
            },
          },
        }}
      >
        {services.map((service, i) => {
          const isLoaded = loadedImages.includes(i);

          return (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group bg-[#111]/90 rounded-2xl overflow-hidden border border-[#D4AF37]/20
                shadow-[0_0_15px_rgba(212,175,55,0.08)]
                hover:shadow-[0_0_35px_rgba(212,175,55,0.25)]
                hover:border-[#D4AF37]/40
                transition-all duration-700 flex flex-col transform-gpu will-change-transform"
            >
              {/* === Image Section === */}
              <div className="relative overflow-hidden h-56 sm:h-72 md:h-80">
                {!isLoaded && (
                  <div className="absolute inset-0 bg-[#1a1a1a] before:absolute before:inset-0 before:animate-[shimmer_2s_infinite] before:bg-[linear-gradient(110deg,transparent,rgba(212,175,55,0.15),transparent)]" />
                )}

                {/* Actual Image — smooth fade + blur animation */}
                <motion.img
                  src={service.image}
                  alt={service.name}
                  onLoad={() => handleImageLoad(i)}
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                  animate={
                    isLoaded
                      ? {
                          opacity: [0, 0.8, 1],
                          scale: [1.05, 1.02, 1],
                          filter: ["blur(8px)", "blur(3px)", "blur(0px)"],
                          transition: {
                            duration: 1.6,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.1,
                          },
                        }
                      : {}
                  }
                  className={`w-full h-full object-cover transform-gpu transition-transform duration-[1400ms] group-hover:scale-[1.05] ${
                    !isLoaded ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Overlay Gradient + Shine */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent translate-x-[-100%] group-hover:animate-shine"></div>
                </div>

                {/* Label */}
                <div className="absolute bottom-3 left-4 text-[#D4AF37]/80 text-sm uppercase tracking-widest">
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </div>
              </div>

              {/* === Text Section === */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 1.3,
                  delay: 0.3 + i * 0.25,
                  ease: [0.19, 1, 0.22, 1],
                }}
                viewport={{ once: true }}
                className="flex flex-col justify-between flex-grow p-6 sm:p-7 text-center"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide mb-2 sm:mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-[#F5EDE3]/80 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="mt-5 sm:mt-6 inline-block self-center px-6 py-2 border border-[#D4AF37]
                    text-[#D4AF37] font-semibold rounded-full tracking-wide
                    hover:bg-[#D4AF37] hover:text-black
                    transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.15)]
                    hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* === Soft Glow === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute top-0 left-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] -translate-x-1/2 bg-[#D4AF37]/10 blur-[80px] rounded-full"
      ></motion.div>

      {/* === Keyframes === */}
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes shine {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
          .animate-shine {
            animation: shine 1.8s ease-in-out;
          }
        `}
      </style>
    </section>
  );
}
