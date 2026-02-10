import styles from "./EventCard.module.css";
import { FaTrophy } from "react-icons/fa"; // Assuming react-icons is installed, otherwise I'll use text or svg

const EventCard = ({ event, onMoreInfo, index }) => {
    return (
        <div
            className={styles.card}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className={styles.background}></div>
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <div>
                    <h3 className={styles.eventName}>{event.name}</h3>
                    <p className={styles.organizers}>{event.organizers}</p>
                </div>

                <p className={styles.description}>
                    {event.description}
                </p>

                <div className={styles.footer}>
                    <div className={styles.prizeSection}>
                        {/* Use an emoji if icon lib is not guaranteed, or SVG */}
                        <span className={styles.trophyIcon}>🏆</span>
                        <div className={styles.prizeDetails}>
                            <span className={styles.prizeLabel}>Prize worth</span>
                            <span className={styles.prizeValue}>Rs. {event.price_worth}</span>
                        </div>
                    </div>

                    <button className={styles.moreInfoBtn} onClick={onMoreInfo}>
                        More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
