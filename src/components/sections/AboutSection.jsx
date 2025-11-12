import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import aboutImg from "../../assets/about.jpg";

export default function AboutSection() {
  return (
    <section className="relative py-20 sm:py-24 px-5 sm:px-8 md:px-12 bg-gradient-to-b from-[#0D0D0D] via-[#111] to-[#0D0D0D] overflow-hidden">
      {/* === Background Glow === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none"></div>

      {/* === Main Container === */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center relative z-10">
        
        {/* === Image Section === */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative group flex justify-center"
        >
          {/* Glow Frame */}
          <div className="absolute -inset-5 bg-gradient-to-tr from-[#D4AF37]/15 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

          {/* Image */}
          <div className="w-full max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden">
            <LazyLoadImage
              src={aboutImg}
              alt="About Studio"
              effect="blur"
              className="w-full h-full object-cover rounded-2xl transform-gpu transition-transform duration-[1300ms] group-hover:scale-[1.04] shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:shadow-[0_0_60px_rgba(212,175,55,0.35)]"
            />
          </div>

          {/* Light sweep overlay (on hover) */}
          <motion.div
            initial={{ x: "-120%", opacity: 0.2 }}
            whileHover={{ x: "120%", opacity: [0.3, 0.1, 0] }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent pointer-events-none rounded-2xl"
          />
        </motion.div>

        {/* === Text Section === */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-7 sm:space-y-8 text-center lg:text-left"
        >
          {/* Title */}
          <div className="relative inline-block mb-3 sm:mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
              About <span className="text-[#D4AF37]">Our Studio</span>
            </h2>
            <span className="absolute -bottom-2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-24 h-[3px] bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full"></span>
          </div>

          {/* Paragraphs */}
          <div className="space-y-5 sm:space-y-6 text-[#F5EDE3]/90 text-base sm:text-lg leading-relaxed">
            <p>
              We are a{" "}
              <span className="text-[#D4AF37] font-semibold">
                luxury wedding photography studio
              </span>{" "}
              known for capturing raw, emotional, and elegant moments that make
              your celebration unforgettable.
            </p>

            <p>
              With{" "}
              <span className="text-[#D4AF37] font-bold">
                5+ years of experience
              </span>
              , our team blends cinematic artistry and natural light to create
              timeless, heartfelt memories.
            </p>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className="pt-2 sm:pt-4"
          >
            <p className="text-[#D4AF37]/90 font-medium italic text-lg sm:text-xl">
              “We don’t just take pictures — we immortalize your story.”
            </p>
            <div className="mt-3 sm:mt-4 text-[#F5EDE3]/70 text-sm tracking-wide">
              — StudioLens Creative Team
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* === Subtle Floating Glow for Depth === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37]/15 blur-[100px] rounded-full pointer-events-none"
      ></motion.div>
    </section>
  );
}
