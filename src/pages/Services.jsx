import { motion } from "framer-motion";
import services from "../data/services";
import { Star, Heart, Camera, Users, Clock, Award } from "lucide-react";

export default function Services() {
  return (
    <div className="bg-[#0D0D0D] text-white overflow-hidden">

      {/* ===== Hero Section (Combined with Intro) ===== */}
      <section
        className="relative min-h-[75vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/services-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0D0D0D]/90" />

        <div className="relative text-center px-6 sm:px-10 z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white"
          >
            Capturing <span className="text-[#D4AF37]">Stories</span> That Last Forever
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-5 text-[#F5EDE3]/80 text-base sm:text-lg md:text-xl leading-relaxed"
          >
            At <span className="text-[#D4AF37] font-semibold">StudioLens</span>, we don’t just take photographs —
            we tell your story through timeless artistry. Every shoot is crafted
            to preserve emotion, elegance, and beauty.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none"
        />
      </section>

      {/* ===== Services Grid ===== */}
      <section className="pt-0 pb-14 px-6 sm:px-10 bg-gradient-to-b from-[#0D0D0D] via-[#111] to-[#0D0D0D] relative -mt-1">
        <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#111]/95 rounded-2xl overflow-hidden border border-[#D4AF37]/20 
              shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]
              transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-56 object-cover transform transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">{s.name}</h3>
                <p className="text-[#F5EDE3]/80 text-sm sm:text-base leading-relaxed mb-5">
                  {s.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] font-semibold rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Why Choose Us ===== */}
      <section className="py-14 bg-[#111]/80 border-t border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#D4AF37]">Why Choose Us?</h2>
          <p className="text-[#F5EDE3]/80 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
            We go beyond photography — creating experiences that reflect authenticity, artistry, and passion.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              { icon: <Camera />, title: "Creative Vision", desc: "Every session is a creative exploration of light and story." },
              { icon: <Users />, title: "Friendly Team", desc: "We make you comfortable and confident during every shoot." },
              { icon: <Clock />, title: "Timely Delivery", desc: "Receive your beautifully edited photos right on time." },
              { icon: <Award />, title: "Premium Equipment", desc: "We use industry-leading cameras and lighting systems." },
              { icon: <Star />, title: "5-Star Rated", desc: "Clients love our precision, creativity, and passion." },
              { icon: <Heart />, title: "Love for Stories", desc: "Every photo is guided by emotion and storytelling." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-5 bg-[#1A1A1A]/70 border border-[#D4AF37]/20 rounded-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-500"
              >
                <div className="text-[#D4AF37] mb-2 flex justify-center">{f.icon}</div>
                <h4 className="text-lg font-semibold text-[#D4AF37]">{f.title}</h4>
                <p className="text-[#F5EDE3]/80 text-sm mt-1">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-14 bg-[#0D0D0D]/90 border-t border-[#D4AF37]/10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#D4AF37]">What Our Clients Say</h2>
        <p className="text-[#F5EDE3]/80 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
          Real stories from people who trusted us with their memories.
        </p>

        <div className="max-w-5xl mx-auto mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {[
            { name: "Riya & Kunal", review: "Our wedding photos are magical! Every image feels cinematic yet intimate." },
            { name: "Arjun Mehta", review: "The pre-wedding shoot exceeded expectations — professional, creative, and fun!" },
            { name: "Aarav Studios", review: "They captured our product launch event beautifully — elegant and powerful imagery!" },
          ].map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#1A1A1A]/70 border border-[#D4AF37]/20 p-6 rounded-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-500"
            >
              <p className="text-[#F5EDE3]/80 italic text-sm mb-4">“{r.review}”</p>
              <h4 className="text-[#D4AF37] font-semibold">{r.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Pricing Plans ===== */}
      <section className="py-14 bg-[#111]/90 border-t border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#D4AF37]">Choose Your Package</h2>
          <p className="text-[#F5EDE3]/80 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
            Transparent pricing, tailored experiences — choose what fits your story best.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              { name: "Silver", price: "$499", desc: "Perfect for small events", features: ["2-hour session", "30 edited photos", "Online gallery"] },
              { name: "Gold", price: "$899", desc: "Ideal for weddings & pre-weddings", features: ["6-hour session", "100 edited photos", "Drone coverage", "Album included"] },
              { name: "Platinum", price: "$1299", desc: "Luxury full-day coverage", features: ["Full-day shoot", "200+ edited photos", "Cinematic video", "Custom album"] },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0D0D0D]/80 border border-[#D4AF37]/30 p-6 rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-500"
              >
                <h3 className="text-2xl font-semibold text-[#D4AF37] mb-1">{p.name}</h3>
                <p className="text-[#F5EDE3]/70 mb-3">{p.desc}</p>
                <p className="text-4xl font-bold text-white mb-5">{p.price}</p>
                <ul className="text-[#F5EDE3]/80 space-y-2 mb-5 text-sm">
                  {p.features.map((f) => <li key={f}>✔️ {f}</li>)}
                </ul>
                <a
                  href="/contact"
                  className="inline-block bg-[#D4AF37] text-[#0D0D0D] font-semibold px-6 py-2 rounded-full hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ Section ===== */}
      <section className="py-14 px-6 bg-[#0D0D0D]/95 border-t border-[#D4AF37]/10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#D4AF37] mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto text-left space-y-5">
          {[
            { q: "How soon will I get my photos?", a: "Final photos are delivered within 10–15 business days depending on project size." },
            { q: "Do you travel for destination shoots?", a: "Absolutely! We travel anywhere in India or abroad for shoots." },
            { q: "Can I customize a package?", a: "Yes, all packages are flexible and tailored to your vision." },
            { q: "Do you offer videography services?", a: "Yes, we offer cinematic video coverage and drone shots." },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#111]/70 border border-[#D4AF37]/20 rounded-xl p-5 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all"
            >
              <h4 className="text-lg font-semibold text-[#D4AF37] mb-1">{faq.q}</h4>
              <p className="text-[#F5EDE3]/80 text-sm leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-14 bg-gradient-to-b from-[#111] to-[#0D0D0D] text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Ready to Capture <span className="text-[#D4AF37]">Your Story?</span>
        </h2>
        <p className="text-[#F5EDE3]/80 max-w-xl mx-auto mt-3 text-base sm:text-lg">
          Let’s turn your special moments into timeless memories.
        </p>
        <a
          href="/contact"
          className="inline-block mt-8 px-8 py-3 bg-[#D4AF37] text-[#0D0D0D] font-semibold rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
        >
          Book Your Session
        </a>
      </section>
    </div>
  );
}
