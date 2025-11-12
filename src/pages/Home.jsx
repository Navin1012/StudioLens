import { Suspense, lazy, useState, useEffect } from "react";

// ✅ Lazy load sections
const HeroSection = lazy(() => import("../components/sections/HeroSection"));
const ServicesSection = lazy(() => import("../components/sections/ServicesSection"));
const PortfolioSection = lazy(() => import("../components/sections/PortfolioSection"));
const AboutSection = lazy(() => import("../components/sections/AboutSection"));
const ContactSection = lazy(() => import("../components/sections/ContactSection"));

// ✅ Elegant Golden Ring Loader (now smoother + responsive)
function Loader({ fading }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center space-y-6 
      bg-[#0D0D0D] transition-opacity duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] 
      ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* 🟡 Spinning golden ring with responsive sizing */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
        <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/25"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-[#D4AF37] animate-spin-slow"></div>
        <div className="absolute inset-0 rounded-full blur-2xl bg-[#D4AF37]/20"></div>
      </div>

      {/* ✨ Shimmer text */}
      <p className="text-[#F5EDE3]/90 text-base sm:text-lg md:text-xl font-medium tracking-wide relative overflow-hidden before:absolute before:inset-0 before:animate-[shine_1.8s_linear_infinite] before:bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)]">
        Loading Awesomeness...
      </p>

      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 2.4s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fading, setFading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 📱 Responsive detection (live updates)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.backgroundColor = "#0D0D0D";

    const preload = async () => {
      try {
        // 1️⃣ Preload all sections
        await Promise.all([
          import("../components/sections/HeroSection"),
          import("../components/sections/ServicesSection"),
          import("../components/sections/PortfolioSection"),
          import("../components/sections/AboutSection"),
          import("../components/sections/ContactSection"),
        ]);

        // 2️⃣ Preload images (services + gallery)
        const [services, gallery] = await Promise.all([
          import("../data/services").then((m) => m.default || []),
          import("../data/gallery").then((m) => m.default || []),
        ]);
        const imageList = [
          ...services.map((s) => s.image).filter(Boolean),
          ...gallery.map((g) => g.img).filter(Boolean),
        ];

        // Load images in batches (less lag on mobile)
        const loadImages = async (batchSize = isMobile ? 5 : 10) => {
          for (let i = 0; i < imageList.length; i += batchSize) {
            const batch = imageList.slice(i, i + batchSize);
            await Promise.all(
              batch.map(
                (src) =>
                  new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = img.onerror = resolve;
                  })
              )
            );
          }
        };

        await loadImages();

        // 3️⃣ Fade out loader with adaptive timing
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setIsLoaded(true);
            document.body.style.overflow = ""; // restore scroll
          }, 700);
        }, isMobile ? 200 : 400);
      } catch (err) {
        console.error("Preload error:", err);
        setIsLoaded(true);
        document.body.style.overflow = "";
      }
    };

    preload();
  }, [isMobile]);

  return (
    <>
      {/* === Loader === */}
      {!isLoaded && <Loader fading={fading} />}

      {/* === Main Content === */}
      <div
        className={`relative z-10 bg-[#0D0D0D] text-white overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
        style={{
          willChange: "opacity, transform",
          transform: "translate3d(0, 0, 0)", // 🧠 GPU acceleration
        }}
      >
        <Suspense fallback={null}>
          <HeroSection />
          <ServicesSection />
          <PortfolioSection />
          <AboutSection />
          <ContactSection />
        </Suspense>
      </div>

      {/* === Persistent dark backdrop === */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-[#0D0D0D] z-[9998] pointer-events-none" />
      )}
    </>
  );
}
