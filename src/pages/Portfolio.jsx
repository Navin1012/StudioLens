import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gallery from "../data/gallery";

export default function Portfolio() {
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("All");
  const [visibleImages, setVisibleImages] = useState({});
  const observerRef = useRef(null);

  const categories = ["All", "Wedding", "Pre-Wedding", "Engagement"];

  /* -----------------------------
      FILTERED IMAGES
  ----------------------------- */
  const filteredImages =
    category === "All"
      ? gallery
      : gallery.filter((item) => item.category === category);

  /* -----------------------------
      INTERSECTION OBSERVER (Lazy)
  ----------------------------- */
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.src;
            setVisibleImages((prev) => ({
              ...prev,
              [key]: true,
            }));
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current = obs;

    return () => obs.disconnect();
  }, []);

  /* -----------------------------
     LIGHTBOX CLOSE
  ----------------------------- */
  const closeLightbox = useCallback(() => setSelected(null), []);
/* -----------------------------
   RE-OBSERVE ON CATEGORY CHANGE
------------------------------*/
useEffect(() => {
  const items = document.querySelectorAll("[data-src]");

  items.forEach((el) => {
    if (observerRef.current) {
      observerRef.current.observe(el);
    }
  });
}, [category]);

  return (
    <section className="py-14 px-6 bg-[#0D0D0D]">

      {/* SECTION HEADING */}
      <motion.div

        className="text-center mb-14 mt-12"
      >
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white">
          Our{" "}
          <span className="text-[#D4AF37] relative inline-block">
            Portfolio
          </span>
        </h2>

        <p className="text-[#F5EDE3]/80 max-w-2xl mx-auto mt-4 text-lg sm:text-xl">
          Discover beautifully crafted visuals that capture unforgettable moments.
        </p>
      </motion.div>

      {/* FILTERS */}
      <div className="mb-12">

        {/* MOBILE FILTER (Scrollable) */}
        <div className="md:hidden px-2">
          <div
            className="
      flex overflow-x-auto no-scrollbar gap-3 px-3 py-2 
      bg-[#1A1A1A] border border-[#D4AF37]/40 rounded-full
      shadow-[0_0_20px_rgba(212,175,55,0.2)]
    "
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`
          px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
          ${category === cat
                    ? "bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                    : "text-[#D4AF37] bg-[#262626] hover:bg-[#D4AF37]/20"
                  }
        `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>


        {/* DESKTOP FILTER */}
        <div className="hidden md:flex justify-center">
          <div className="
            flex gap-3 bg-[#1A1A1A] border border-[#D4AF37]/40 
            rounded-full px-4 py-3 shadow-[0_0_20px_rgba(212,175,55,0.2)]
          ">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`
                  px-6 py-2 rounded-full font-medium text-sm transition-all
                  ${category === cat
                    ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                    : "text-[#D4AF37] hover:bg-[#D4AF37]/20"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MASONRY GALLERY */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {filteredImages.map((img) => (
          <div
            key={img.img}
            data-src={img.img}
            ref={(el) => {
              if (el && observerRef.current) {
                observerRef.current.observe(el);
              }
            }}
            className="relative cursor-pointer rounded-xl overflow-hidden"
            onClick={() => setSelected(img.img)}
          >
            {/* Lazy + Blur Preview */}
            <img
              src={visibleImages[img.img] ? img.img : img.blur}
              alt={img.name}
              className={`
                w-full rounded-xl transition-all duration-[900ms]
                ${visibleImages[img.img]
                  ? "blur-0 scale-100"
                  : "blur-xl scale-105"
                }
              `}
            />

            {/* Overlay text */}
            {visibleImages[img.img] && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition duration-500 flex items-end">
                <p className="text-[#F5EDE3] text-base px-4 py-3">{img.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-[0_0_45px_rgba(212,175,55,0.5)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
