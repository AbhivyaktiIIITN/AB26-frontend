import { motion, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import "./ExploreHero.css";

import bgExplore from "@/assets/background/explore_bg.webp";

import img1 from "@/assets/background/card_1.webp";
import img2 from "@/assets/background/card_2.webp";
import img3 from "@/assets/background/card_3.webp";
import img4 from "@/assets/background/card_4.webp";
import img5 from "@/assets/background/card_5.webp";

const cards = [img1, img2, img3, img4, img5];

/* card entry */
const cardsEnter = {
  hidden: { y: 120, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

/* subtle floating */
const float = (i) => ({
  animate: {
    y: [0, -6 - i * 1.2, 0],
    x: [0, (i % 2 === 0 ? 1 : -1) * 2, 0],
    transition: {
      duration: 4 + i * 0.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.3,
    },
  },
});

/* animated counter */
function Counter({ to, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.6,
      delay,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v);
      },
    });
    return () => controls.stop();
  }, [to, delay]);

  return <span ref={ref}>0</span>;
}

export default function ExploreHero() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const visibleCards = isMobile ? cards.slice(1, 4) : cards;

  return (
    <section className="explore-hero">
      {/* background */}
      <div
        className="explore-bg"
        style={{ backgroundImage: `url(${bgExplore})` }}
      />

      {/* stage */}
      <div className="explore-stage">
        {/* cards + EXPLORE */}
        <motion.div
          className="explore-cards"
          variants={cardsEnter}
          initial="hidden"
          animate="visible"
        >
          {visibleCards.map((img, i) => (
            <div
              className={`card-wrap pos-${isMobile ? i + 1 : i}`}
              key={i}
            >
              <motion.img
                src={img}
                alt=""
                className="explore-card"
                variants={float(i)}
                animate="animate"
              />
            </div>
          ))}

          {/* EXPLORE overlay */}
          <motion.h1
            className="explore-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            EXPLORE
          </motion.h1>
        </motion.div>

        {/* stats */}
        <motion.div
          className="explore-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <div className="stat">
            <span className="stat-num">
              <Counter to={10} delay={1.5} />+
            </span>
            <span className="stat-text">Guests & Artists</span>
          </div>

          <div className="stat">
            <span className="stat-num">
              <Counter to={30} delay={1.6} />+
            </span>
            <span className="stat-text">Events & Competitions</span>
          </div>

          <div className="stat">
            <span className="stat-num">
              <Counter to={10} delay={1.7} />+
            </span>
            <span className="stat-text">Lakh Prize Pool</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
