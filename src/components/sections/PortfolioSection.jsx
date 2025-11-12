import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import gallery from "../../data/gallery";

export default function PortfolioSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const loadedRef = useRef(new Set());

  // 📱 Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 🚀 Preload visible images (batch updates)
  useEffect(() => {
    const visible = gallery.slice(0, 6);
    let loadedCount = 0;

    const loadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.decoding = "async";
        img.loading = "lazy";
        img.onload = img.onerror = resolve;
      });

    (async () => {
      for (let i = 0; i < visible.length; i++) {
        await loadImage(visible[i].img);
        loadedRef.current.add(i);
        loadedCount++;
        if (loadedCount % 2 === 0 || loadedCount === visible.length) {
          setIsLoaded(loadedCount === visible.length);
        }
      }
    })();
  }, [isMobile]);

  // 🎬 Image reveal animation
  const revealEffect = {
    initial: { opacity: 0, scale: 1.08, y: 20, filter: "blur(10px)" },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.4,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  // 🎞 Card animation variant
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.1, ease: [0.19, 1, 0.22, 1] },
    },
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#0D0D0D] via-[#111] to-[#0D0D0D] relative overflow-hidden">
      {/* === Background Glow === */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />

      {/* === Heading === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        viewport={{ once: true }}
        className="text-center mb-10 sm:mb-14 relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D4AF37] tracking-wide">
          Portfolio Highlights
        </h2>
        <p className="text-[#F5EDE3]/80 mt-3 max-w-xl mx-auto text-sm sm:text-base md:text-lg">
          A glimpse into our artistry — where emotion meets perfection.
        </p>
      </motion.div>

      {/* === Gallery Grid === */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
          },
        }}
      >
        {gallery.slice(0, 6).map((img, index) => {
          const loaded = loadedRef.current.has(index);

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative group overflow-hidden rounded-xl bg-[#111]/90 border border-[#D4AF37]/10 
              shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]
              transition-all duration-500 transform-gpu"
            >
              {/* 🦴 Placeholder */}
              {!loaded && (
                <div className="w-full h-[250px] sm:h-[320px] md:h-[360px] bg-[#1b1b1b] flex items-center justify-center text-[#D4AF37]/50 text-sm select-none">
                  <motion.div
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-3/4 h-3/4 bg-gradient-to-r from-[#222] via-[#2a2a2a] to-[#222] rounded-lg"
                  />
                </div>
              )}

              {/* 🎞️ Actual Image with Show Effect */}
              <motion.div
                initial="initial"
                animate={loaded ? "animate" : ""}
                variants={revealEffect}
                className="relative"
              >
                <motion.img
                  src={img.img}
                  alt={img.name}
                  decoding="async"
                  loading="lazy"
                  fetchpriority="low"
                  className={`w-full h-[250px] sm:h-[320px] md:h-[360px] object-cover transform-gpu transition-transform duration-[1400ms] group-hover:scale-[1.04] rounded-xl ${
                    !loaded ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* ✨ Golden Sweep Light Effect */}
                {loaded && (
                  <motion.div
                    initial={{ x: "-120%", opacity: 0.4 }}
                    animate={{
                      x: ["-120%", "120%"],
                      opacity: [0.4, 0.1, 0],
                      transition: {
                        duration: 1.8,
                        ease: "easeInOut",
                        delay: 0.2,
                      },
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"
                  />
                )}
              </motion.div>

              {/* === Overlay Caption === */}
              {loaded && (
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                  <p className="text-[#F5EDE3] text-sm sm:text-base px-4 py-3">
                    {img.name}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* === View More Button === */}
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-[#0D0D0D] bg-[#D4AF37] font-semibold px-7 sm:px-9 py-3 sm:py-3.5 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:scale-[1.03] transition-all duration-300"
          >
            View Full Portfolio →
          </Link>
        </motion.div>
      )}
    </section>
  );
}
