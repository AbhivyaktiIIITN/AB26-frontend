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
      <div
        // className={styles.sponsorBox}
        className="
        w-28 h-28 sm:w-40 sm:h-40
        rounded-4xl
        bg-white/10
        backdrop-blur-md
        border border-white/20
        flex items-center justify-center
        cursor-pointer
      "
      >
        {logo && <img src={logo} alt={name}
          className="w-[80%] h-[80%] object-contain rounded-2xl sm:rounded-3xl" />}
      </div>

      <p className={styles.cardLabel}>{name}</p>
    </motion.div>
  );
};

export default SponsorCard;
