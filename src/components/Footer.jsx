import { motion } from "framer-motion";
import { useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  ArrowUp,
  Heart,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const currentYear = new Date().getFullYear();

  // === Animation Variants ===
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const socialIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1 + 0.6,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }),
    hover: {
      scale: 1.15,
      rotate: 5,
      y: -4,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(212,175,55,0.4)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const scrollTopVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { delay: 1, type: "spring", stiffness: 200 },
    },
    hover: {
      scale: 1.1,
      y: -6,
      transition: { duration: 0.3 },
    },
  };

  // === Data ===
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Wedding Photography",
    "Pre-Wedding Shoots",
    "Engagement Sessions",
    "Portrait Photography",
    "Commercial Shoots",
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", url: "#" },
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", url: "#" },
    { icon: <Twitter className="w-5 h-5" />, name: "Twitter", url: "#" },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-[#0D0D0D] border-t border-[#D4AF37]/20 relative overflow-hidden"
    >
      {/* === Soft Golden Background Glow === */}
      <div className="absolute top-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#D4AF37]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      {/* === Main Content === */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12">
          {/* === Brand Column === */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 mb-4"
            >
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 0 25px rgba(212,175,55,0.6)",
                }}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F5EDE3] shadow-lg"
              >
                <Camera className="w-6 h-6 text-[#0D0D0D]" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white">StudioLens</h3>
                <p className="text-[#F5EDE3]/70 text-sm">Premium Photography</p>
              </div>
            </motion.div>

            <p className="text-[#F5EDE3]/80 leading-relaxed text-sm sm:text-base">
              Capturing life's most precious moments with artistry and excellence.
            </p>

            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-3 text-[#F5EDE3]/80">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-[#F5EDE3]/80">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>hello@studiolens.com</span>
              </div>
              <div className="flex items-center gap-3 text-[#F5EDE3]/80">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>123 Photography Lane, City</span>
              </div>
            </div>
          </motion.div>

          {/* === Quick Links (Hidden on Mobile) === */}
          <motion.div
            variants={itemVariants}
            className="space-y-4 hidden sm:block"
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li key={link.name}>
                  <motion.a
                    href={link.path}
                    className="text-[#F5EDE3]/70 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* === Services === */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <motion.li key={service}>
                  <motion.a
                    href="#"
                    className="text-[#F5EDE3]/70 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {service}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* === Newsletter + Socials === */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Stay Updated
            </h4>
            <p className="text-[#F5EDE3]/80 text-sm">
              Subscribe for offers and tips straight to your inbox.
            </p>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] p-4 rounded-xl text-center text-sm sm:text-base"
              >
                ✅ Thank you for subscribing!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white placeholder-[#F5EDE3]/40 focus:outline-none focus:border-[#D4AF37] transition-all text-sm sm:text-base"
                  required
                />
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F5EDE3] text-[#0D0D0D] font-semibold py-3 rounded-xl overflow-hidden relative"
                >
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                  <span className="relative z-10">Subscribe</span>
                </motion.button>
              </form>
            )}

            {/* === Social Links === */}
            <div className="pt-4">
              <p className="text-[#F5EDE3]/80 text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    custom={index}
                    variants={socialIconVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="w-10 h-10 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* === Bottom Bar === */}
        <motion.div
          variants={itemVariants}
          className="border-t border-[#D4AF37]/20 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-3 sm:gap-4"
        >
          {/* Left Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 text-[#F5EDE3]/70 text-sm sm:text-base"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <span>© {currentYear} StudioLens. All rights reserved.</span>

            <motion.span
              animate={isHovered ? { color: "#D4AF37" } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-1"
            >
              Made with
              <motion.span
                animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.span>

              {/* 💛 Clickable Link to Portfolio (New Tab) */}
              <a
                href="https://navinchaudhary.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#D4AF37] hover:underline hover:decoration-[#D4AF37] transition-colors duration-300"
              >
                Navin Chaudhary
              </a>
            </motion.span>
          </motion.div>

          {/* Right Section */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-sm text-[#F5EDE3]/70 mt-3 md:mt-0">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>

      </div>

      {/* === Scroll-to-Top Button === */}
      <motion.button
        variants={scrollTopVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F5EDE3] text-[#0D0D0D] rounded-xl shadow-2xl shadow-[#D4AF37]/30 flex items-center justify-center z-40"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </motion.footer>
  );
}
