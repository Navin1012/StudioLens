import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// 🖼️ Desktop Images
import heroImg1 from "../../assets/hero1.jpg";
import heroImg2 from "../../assets/hero2.jpg";
import heroImg3 from "../../assets/hero3.jpg";
import heroImg4 from "../../assets/hero4.jpg";

// 📱 Mobile Images
import heroMobile1 from "../../assets/hero1-mobile.jpg";
import heroMobile2 from "../../assets/hero2-mobile.jpg";
import heroMobile3 from "../../assets/hero3-mobile.jpg";
import heroMobile4 from "../../assets/hero4-mobile.jpg";

export default function HeroSection() {
  const slides = [
    {
      desktop: heroImg2,
      mobile: heroMobile2,
      title: "Where Love Becomes Art",
      highlight: "Love",
      description:
        "Every glance, every smile, every heartbeat — framed with artistry to tell your love story beautifully.",
    },
    {
      desktop: heroImg1,
      mobile: heroMobile1,
      title: "Crafting Timeless Wedding Tales",
      highlight: "Timeless",
      description:
        "From laughter to tears of joy, we capture the soul of your celebration — moments that live forever.",
    },
    {
      desktop: heroImg4,
      mobile: heroMobile4,
      title: "Every Frame, a Work of Art",
      highlight: "Art",
      description:
        "Through light, emotion, and craft — we turn fleeting moments into cinematic memories you’ll cherish forever.",
    },
    {
      desktop: heroImg3,
      mobile: heroMobile3,
      title: "Your Memories, Our Masterpiece",
      highlight: "Memories",
      description:
        "We don’t just take pictures — we preserve emotions, creating heirlooms that speak for generations.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [nextImage, setNextImage] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [fade, setFade] = useState(false);
  const [textFade, setTextFade] = useState(false);

  const timeoutRef = useRef(null);

  // ✅ Detect device width
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Preload all images (desktop + mobile)
  useEffect(() => {
    let loaded = 0;
    const total = slides.length * 2;
    slides.forEach((slide) => {
      [slide.desktop, slide.mobile].forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loaded++;
          if (loaded === total) setIsReady(true);
        };
      });
    });
  }, []);

  // ✅ Smooth preloading system (with synced text fade)
  useEffect(() => {
    if (!isReady) return;

    const interval = setInterval(() => {
      const nextIndex = (index + 1) % slides.length;
      const nextSrc = isMobile
        ? slides[nextIndex].mobile
        : slides[nextIndex].desktop;

      // Start text fade first
      setTextFade(true);

      // Preload next image before fade
      const img = new Image();
      img.src = nextSrc;
      img.onload = () => {
        setNextImage(nextSrc);
        setFade(true);

        // After fade completes
        timeoutRef.current = setTimeout(() => {
          setIndex(nextIndex);
          setFade(false);
          setNextImage(null);
          setTextFade(false);
        }, 1000);
      };
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutRef.current);
    };
  }, [index, isReady, isMobile]);

  const currentSlide = slides[index];
  const currentImage = isMobile
    ? currentSlide.mobile
    : currentSlide.desktop;

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* ---------- PRELOAD SPINNER ---------- */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D0D]">
          <div className="w-16 h-16 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
        </div>
      )}

      {/* ---------- BACKGROUND LAYERS ---------- */}
      {isReady && (
        <>
          {/* Current image stays visible */}
          <motion.img
            key={`current-${index}`}
            src={currentImage}
            className="absolute inset-0 w-full h-full object-cover brightness-[45%] contrast-[105%] saturate-[110%]"
            initial={{ opacity: 1 }}
            animate={{ opacity: fade ? 0 : 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Next image preloads and fades in */}
          {nextImage && (
            <motion.img
              key={`next-${nextImage}`}
              src={nextImage}
              className="absolute inset-0 w-full h-full object-cover brightness-[45%] contrast-[105%] saturate-[110%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}
        </>
      )}

      {/* ---------- GRADIENT OVERLAY ---------- */}
      {isReady && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
      )}

      {/* ---------- HERO CONTENT ---------- */}
      {isReady && (
        <div className="relative z-10 text-center px-6 sm:px-8 md:px-12 lg:px-20 max-w-5xl">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: textFade ? 0 : 1,
              y: textFade ? 20 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
              {currentSlide.title.split(currentSlide.highlight)[0]}
              <span className="text-[#D4AF37]">
                {" "}
                {currentSlide.highlight}{" "}
              </span>
              {currentSlide.title.split(currentSlide.highlight)[1]}
            </h1>

            <p className="text-[#F5EDE3]/90 max-w-2xl mx-auto mb-10 text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
              {currentSlide.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-[#D4AF37] text-black font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-[#e1c85c] transition-all tracking-wide"
              >
                Book Your Wedding Shoot
              </Link>
              <Link
                to="/portfolio"
                className="border border-[#D4AF37] text-[#D4AF37] font-semibold px-8 py-3 rounded-md hover:bg-[#D4AF37] hover:text-black transition-all tracking-wide"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      {/* ---------- SLIDE PROGRESS BAR ---------- */}
      {isReady && (
        <motion.div
          key={index}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="absolute bottom-0 left-0 h-[3px] bg-[#D4AF37]/80"
        />
      )}
    </section>
  );
}
