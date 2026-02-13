import ComingSoon from "../common/ComingSoon/ComingSoon";
import styles from "./passesSection.module.css";
import { motion } from "framer-motion";

const PassesSection = () => {
    const comboPasses = [
        {
            title: "THE FLASH PASS",
            subtitle: "Flexibility on the Go",
            details: [
                { label: "One the Fly", text: "Entry to specific on-spot events, fun zone activities, and mini-games." },
                { label: "Best for", text: "The casual visitors looking for quick fun and impulsive challenges." }
            ],
            price: "Event wise"
        },
        {
            title: "THE MVP PASS",
            subtitle: "The full AB Experience",
            details: [
                { label: "All-Access", text: "Registration fees for All competitions." },
                { label: "The Big Nights", text: "Entry to all Pronites and Pro-shows (3 Days)" },
                { label: "The Swag", text: "Official Abhivyakti '26 Limited Edition Merch." },
                { label: "Best for", text: "The hardcore participants who want to own the stage and the nights." }
            ],
            price: "₹1199"
        },
        {
            title: "HEADLINERS PASS",
            subtitle: "For the fans of the Big Stage",
            details: [
                { label: "The Big Nights", text: "Entry to all Pronites and Pro-shows (Concert, DJ Night, Comedy)" },
                { label: "Best for", text: "The vibe-seekers who are here for the energy and the artists." }
            ],
            price: "₹599"
        }
    ];

    const accommodation = [
        {
            title: "THE CLUB STAY",
            subtitle: "",
            details: [
                { label: "", text: "Private Double or 4-person sharing rooms.\nAir-Conditioned (AC), Attached private washrooms.\nFood charges applicable (Optional add-on)." },
                { label: "Boys Only", text: "" }
            ],
            price: "₹1199"
        },
        {
            title: "THE BASECAMP",
            subtitle: "",
            details: [
                { label: "", text: "Common Hall Arrangement (Floor bedding).\nShared washrooms, Non-AC ventilation.\nFood not included (Available at food stalls/mess)." },
                { label: "Boys Only", text: "" }
            ],
            price: "₹1199"
        },
        {
            title: "THE CLUB STAY",
            subtitle: "",
            details: [
                { label: "", text: "Private Double or 4-person sharing rooms.\nAir-Conditioned (AC), Attached private washrooms.\nFood charges applicable (Optional add-on)." },
                { label: "Girls Only", text: "" }
            ],
            price: "₹1199"
        }
    ];

    const Card = ({ item, className }) => (
        <motion.div
            className={styles.cardWrapper}
            initial="rest"
            whileHover="hover"
            animate="rest"
        >
            <motion.div
                className={styles.cardShadow}
                variants={{
                    rest: { x: 0, y: 0, opacity: 0 },
                    hover: { x: 8, y: 8, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
                }}
            />
            <motion.div
                className={`${styles.card} ${className || ""}`}
                variants={{
                    rest: { x: 0, y: 0 },
                    hover: { x: -8, y: -8, transition: { duration: 0.3, ease: "easeOut" } }
                }}
            >
                <h3 className={styles.cardTitle}>{item.title}</h3>
                {item.subtitle && <p className={styles.cardSubtitle}>{item.subtitle}</p>}

                <div className={styles.cardContent}>
                    {item.details.map((detail, idx) => (
                        <div key={idx} className={styles.infoRow} style={{ gridTemplateColumns: detail.label ? "80px 1fr" : "1fr" }}>
                            {detail.label && <span className={styles.infoLabel}>{detail.label}</span>}
                            <span className={styles.infoText} style={{ whiteSpace: "pre-line" }}>{detail.text}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.cardFooter}>
                    <span className={styles.priceDisplay}>{item.price}</span>
                    <button className={styles.buyBtn}>Buy Now</button>
                </div>
            </motion.div>
        </motion.div>
    );

    return (
        <div className={styles.section}>
            {/* COMBO PASSES */}
            <div>

                <div className={styles.headerGroup}>
                    <div className={styles.subLabel}>Combo Passes</div>
                    <h2 className={styles.mainTitle}><span className={styles.whiteText}>CHOOSE YOUR</span> <br /> EXPERIENCE</h2>
                </div>
                <div className={styles.cardsGrid}>
                    {/* {comboPasses.map((pass, index) => (
                        <Card key={index} item={pass} />
                    ))} */}
                    <ComingSoon />
                </div>

            </div>

            {/* ACCOMMODATION */}
            <div>
                <div className={styles.headerGroup}>
                    <div className={styles.subLabel}>Combo Passes</div>
                    <h2 className={styles.mainTitle}>ACCOMODATION</h2>
                </div>
                <div className={styles.cardsGrid}>
                    {/* {accommodation.map((stay, index) => (
                        <Card key={index} item={stay} className={styles.accommodationCard} />
                    ))} */}
                    <ComingSoon />
                </div>
            </div>
        </div>
    );
};

export default PassesSection;
