import { motion } from "framer-motion";
import "./HeroSection.css";
import stageBg from "@/assets/background/background-curtains.png";
import abhivyaktiText from "@/assets/branding/ABHIVYAKTI_text_red.png";

const HeroSection = () => {
  return (
    <section className="sponsor-hero">
        <div className="stage-glow" />

      {/* Background */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${stageBg})` }}
      />

      {/* Theatre vignette */}
      <div className="hero-overlay" />

      {/* Center content */}
      <div className="hero-content">
        <motion.h1
          className="sponsor-title"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          SPONSORS
        </motion.h1>
      </div>

      {/* Bottom Abhivyakti branding */}
      <div className="hero-branding">
        <img
          src={abhivyaktiText}
          alt="Abhivyakti"
          className="abhivyakti-text"
        />
      </div>
    </section>
  );
};

export default HeroSection;
