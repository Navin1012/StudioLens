import { motion } from "framer-motion";
import { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section className="relative py-20 sm:py-24 px-5 sm:px-8 md:px-12 bg-gradient-to-b from-[#0D0D0D] via-[#111] to-[#0D0D0D] border-t border-[#D4AF37]/10 overflow-hidden">
      {/* === Background Glow === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* === Heading === */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white mb-12 sm:mb-16 leading-tight"
        >
          Get In <span className="text-[#D4AF37]">Touch</span>
        </motion.h2>

        {/* === Layout === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-start">
          {/* === Contact Info === */}
          <div className="space-y-7 sm:space-y-8">
            {[
              { icon: <Phone />, title: "Call Us", text: "+1 (555) 123-4567" },
              { icon: <Mail />, title: "Email", text: "hello@studiolens.com" },
              { icon: <MapPin />, title: "Visit", text: "123 Photography Lane" },
              { icon: <Clock />, title: "Hours", text: "Mon-Sun: 7am – 10pm" },
            ].map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.19, 1, 0.22, 1],
                }}
                viewport={{ once: true }}
                className="flex items-center gap-4 bg-[#1A1A1A]/70 backdrop-blur-md border border-[#D4AF37]/20 rounded-2xl p-5 sm:p-6 hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:border-[#D4AF37]/40 transition-all duration-500 transform-gpu"
              >
                <div className="bg-[#D4AF37] text-[#0D0D0D] p-3 sm:p-4 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white">
                    {info.title}
                  </h4>
                  <p className="text-[#F5EDE3]/80 text-sm sm:text-base">
                    {info.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* === Contact Form === */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A]/70 backdrop-blur-md border border-[#D4AF37]/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_25px_rgba(212,175,55,0.15)]"
          >
            {isSubmitted ? (
              // === Success Message ===
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center py-16 sm:py-20"
              >
                <motion.div
                  initial={{ rotate: -20, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                >
                  <Send className="w-8 h-8 text-[#0D0D0D]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#F5EDE3]/80">
                  Thank you for reaching out. We'll contact you soon.
                </p>
              </motion.div>
            ) : (
              // === Contact Form ===
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full bg-[#0D0D0D]/80 border border-[#D4AF37]/30 rounded-xl px-4 py-3 sm:py-4 text-white text-sm sm:text-base focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.3)] outline-none transition-all duration-300"
                />

                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full bg-[#0D0D0D]/80 border border-[#D4AF37]/30 rounded-xl px-4 py-3 sm:py-4 text-white text-sm sm:text-base focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.3)] outline-none transition-all duration-300"
                />

                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows="5"
                  className="w-full bg-[#0D0D0D]/80 border border-[#D4AF37]/30 rounded-xl px-4 py-3 sm:py-4 text-white text-sm sm:text-base focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.3)] outline-none resize-none transition-all duration-300"
                />

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F5EDE3] text-[#0D0D0D] font-bold py-3 sm:py-4 rounded-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* === Ambient Glow for Depth === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] -translate-x-1/2 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none"
      ></motion.div>
    </section>
  );
}
