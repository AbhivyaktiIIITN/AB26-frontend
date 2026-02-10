import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./EventDetailsModal.module.css";
import { FaTimes, FaTrophy } from "react-icons/fa"; // Using react-icons for close and trophy

const TABS = [
    { key: "description", label: "Descriptions" },
    { key: "timelines", label: "Stages & Timelines" },
    { key: "contact", label: "Contact Organizers" },
];

const EventDetailsModal = ({ event, onClose }) => {
    const [activeTab, setActiveTab] = useState("description"); // Default tab

    // Lock body scroll (simple and robust)
    useEffect(() => {
        // Prevent background scroll
        document.body.style.overflow = 'hidden';

        return () => {
            // Restore background scroll
            document.body.style.overflow = '';
        };
    }, []);

    if (!event) return null;

    // Helper to render content based on active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case "description":
                return <p>{event.description}</p>;
            case "timelines":
                return <p>{event.timelines || "No timelines available."}</p>;
            case "contact":
                return <p>{event.contact || "No contact info available."}</p>;
            default:
                return null;
        }
    };

    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                    <FaTimes />
                </button>

                <div className={styles.leftColumn}>
                    <div className={styles.header}>
                        <h1>{event.name}</h1>
                        <div className={styles.subHeader}>
                            <span className={styles.organizerInfo}>
                                {/* Assuming category or logic for subtitle, using organizers for now */}
                                {event.organizers || "Organizers"}
                            </span>

                            {/* Always show if needed or just verify data */}
                            {event.unstop_link && (
                                <a
                                    href={event.unstop_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.unstopLink}
                                >
                                    <div className={styles.unstopIcon}>un</div>
                                    <span>View on Unstop</span>
                                </a>
                            )}
                        </div>
                    </div>

                    <div className={styles.tabs}>
                        {TABS.map((tab) => (
                            <button
                                key={tab.key}
                                className={`${styles.tabButton} ${activeTab === tab.key ? styles.active : ""}`}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className={styles.tabContent}>
                        {renderTabContent()}
                    </div>

                    <div className={styles.actions}>
                        <a href="#" className={styles.actionButton}>Register Here</a>
                        {/* Assuming Problem Statement link logic or placeholder */}
                        <a href="#" className={styles.actionButton}>Problem Statement</a>
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <img
                        src={event.bg_img || "/images/explore/event_card_bg.jpg"}
                        alt={event.name}
                        className={styles.eventImage}
                    />

                    <div className={styles.prizeBox}>
                        <div className={styles.prizeMain}>
                            <FaTrophy className={styles.trophyIconLarge} />
                            <div className={styles.prizeTotal}>
                                <span className={styles.prizeLabel}>Prize worth</span>
                                <span className={styles.prizeValueMain}>RS. {event.price_worth}</span>
                            </div>
                        </div>

                        <div className={styles.separator}></div>

                        <div className={styles.prizeBreakdown}>
                            <div className={styles.breakdownItem}>
                                <span>1st -</span> <span>{event.price_1st}</span>
                            </div>
                            <div className={styles.breakdownItem}>
                                <span>2nd -</span> <span>{event.price_2nd}</span>
                            </div>
                            <div className={styles.breakdownItem}>
                                <span>3rd -</span> <span>{event.price_3rd}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default EventDetailsModal;
