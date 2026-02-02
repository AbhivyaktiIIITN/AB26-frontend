import { motion } from "framer-motion";
import styles from "./sponsors.module.css";
import SponsorCard from "./SponsorCard";
import { sectionVariants } from "./sponsors.motion";

const SponsorsTierSection = ({ title = "TITLE SPONSER", sponsors = [] }) => {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.inner}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
      >
        <div className={styles.titleRow}>
          <span className={styles.line} />
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.gridWrapper}>
          <div
            className={styles.grid}
            style={{
              gridTemplateColumns: `repeat(${Math.min(
                sponsors.length,
                4
              )}, 1fr)`,
            }}
          >
            {sponsors.map((sponsor, index) => (
              <SponsorCard
                key={index}
                logo={sponsor.logo}
                name={sponsor.name}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SponsorsTierSection;
