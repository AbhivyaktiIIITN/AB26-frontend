// components/sponsors/SponsorCard.jsx

import { motion } from "framer-motion";
import styles from "./sponsors.module.css";
import { itemVariants } from "./sponsors.motion";

const SponsorCard = ({ logo, name = "Sponsors" }) => {
  return (
    <motion.div
      className={styles.sponsorItem}
      variants={itemVariants}
    >
      <div className={styles.sponsorBox}>
        {logo && <img src={logo} alt={name} />}
      </div>

      <p className={styles.cardLabel}>{name}</p>
    </motion.div>
  );
};

export default SponsorCard;
