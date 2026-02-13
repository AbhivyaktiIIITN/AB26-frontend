import { motion } from "framer-motion";

const stageBg = "https://assets.2026.abhivyaktifest.in/src/assets/background/background-curtains.webp";
const abhivyaktiText = "https://assets.2026.abhivyaktifest.in/src/assets/branding/abhivyakti text-yellow.webp";

const ContactHero = () => {
  return (
    <section className="sponsor-hero">
      {/* Background */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${stageBg})`,
        }}
      />

      {/* ABHIVYAKTI branding */}
      <div className="hero-branding">
        <img
          src={abhivyaktiText}
          alt="Abhivyakti"
          className="abhivyakti-text"
        />
      </div>

      {/* Center title */}
      <div className="hero-content">
        <motion.h1
          className="sponsor-title"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          CONTACT
        </motion.h1>
      </div>

      {/* Bottom meta */}
      <div className="hero-meta-backdrop" />
      <div className="hero-meta">
        <span className="meta-left">Abhivyakti’26</span>
        <span className="meta-center">The Enchanted Circus</span>
        <span className="meta-right">19–21 March 2026</span>
      </div>

      {/* Fade to content */}
      <div className="hero-to-content-gradient" />
    </section>
  );
};

export default ContactHero;
