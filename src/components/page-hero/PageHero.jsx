import { motion } from "framer-motion";
import "../../components/sponsors/HeroSection.css";

const abhivyaktiText =
  "https://assets.2026.abhivyaktifest.in/src/assets/branding/abhivyakti text-yellow.webp";

const stageBg =
  "https://assets.2026.abhivyaktifest.in/src/assets/background/background-curtains.webp";

const PageHero = ({ title }) => {
  const scrollToContent = () => {
    const targetPosition = window.innerHeight;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, startPosition + distance * ease);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  return (
    <section className="sponsor-hero">

      {/* Background */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${stageBg})` }}
      />

      {/* Branding */}
      <div className="hero-branding">
        <img
          src={abhivyaktiText}
          alt="Abhivyakti"
          className="abhivyakti-text"
        />
      </div>

      {/* Center Title */}
      <div className="hero-content">
        <motion.h1
          className="sponsor-title"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
      </div>

      {/* Scroll Button */}
      <div className="hero-scroll-container">
        <button className="hero-scroll-btn" onClick={scrollToContent}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M6 9L12 15L18 9"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Bottom gradient backdrop */}
      <div className="hero-meta-backdrop" />

      {/* Meta */}
      <div className="hero-meta">
        <span className="meta-left">Abhivyakti'26</span>
        <span className="meta-center">The Enchanted Circus</span>
        <span className="meta-right">19–21 March 2026</span>
      </div>

      {/* Fade to content */}
      <div className="hero-to-content-gradient" />
    </section>
  );
};

export default PageHero;
