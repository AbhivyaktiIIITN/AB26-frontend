import { motion } from "framer-motion";
import "./aboutHero.css";

const stageBg = "https://assets.2026.abhivyaktifest.in/src/assets/background/background-curtains.webp";
const abhivyaktiText = "https://assets.2026.abhivyaktifest.in/src/assets/branding/abhivyakti text-yellow.webp";

const AboutHeroSection = () => {
  return (
    <section className="about-hero">
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
          className="about-title"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          ABOUT US
        </motion.h1>
      </div>

      {/* CTA */}
      <div className="hero-cta">
        <button className="cta-btn">Contact Us</button>
      </div>

      <div className="hero-scroll-container">
        <button
          className="hero-scroll-btn"
          onClick={() => {
            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? 40 : 100; // Less offset on mobile to scroll down more
            const targetPosition = window.innerHeight - offset;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 1500; // 1.5 seconds duration
            let startTime = null;

            const animation = (currentTime) => {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const progress = Math.min(timeElapsed / duration, 1);

              // Easing function (easeInOutQuad)
              const ease =
                progress < 0.5
                  ? 2 * progress * progress
                  : 1 - Math.pow(-2 * progress + 2, 2) / 2;

              window.scrollTo(0, startPosition + distance * ease);

              if (timeElapsed < duration) {
                requestAnimationFrame(animation);
              }
            };

            requestAnimationFrame(animation);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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

      {/* Bottom meta */}
      <div className="hero-meta-backdrop" />
      <div className="hero-meta">
        <span className="meta-left">Abhivyakti’26</span>
        <span className="meta-center">The Enchanted Circus</span>
        <span className="meta-right">19-21 March 2026</span>
      </div>

      {/* Fade to content */}
      <div className="hero-to-content-gradient" />
    </section>
  );
};

export default AboutHeroSection;
