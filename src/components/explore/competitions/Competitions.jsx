import { useState, useMemo, useEffect } from "react";
import styles from "./competitions.module.css";
import { exploreData } from "../../../data/exploreData";
import EventCard from "./EventCard";
import EventDetailsModal from "./EventDetailsModal";

const TICKETS = [
    { id: "fine_arts", image: "/images/explore/tickets/fine_arts.webp", name: "Fine Arts" },
    { id: "dance", image: "/images/explore/tickets/dance.webp", name: "Dance" },
    { id: "music", image: "/images/explore/tickets/music.webp", name: "Music" },
    { id: "digital_arts", image: "/images/explore/tickets/digital_art.webp", name: "Digital Art" },
    { id: "speaking_art", image: "/images/explore/tickets/speaking_art.webp", name: "Speaking Art" },
    { id: "dramatics", image: "/images/explore/tickets/dramatics.webp", name: "Dramatics" },
    { id: "AB_events", image: "/images/explore/tickets/spotlight.webp", name: "AB Events" }, // Mapped spotlight image to AB_events
    { id: "esports", image: "/images/explore/tickets/esports.webp", name: "Esports" },
];

const Competitions = () => {
    const [activeTicket, setActiveTicket] = useState(null); // Initially null
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Set initial active ticket for desktop only
    useEffect(() => {
        if (window.innerWidth > 1280) {
            setActiveTicket(TICKETS[0]);
        }
    }, []);

    // Helper to get events for a ticket
    const getEvents = (ticketId) => {
        const competition = exploreData.competitions.find((c) => c.id === ticketId);
        return competition ? competition.events : [];
    };

    const activeCompetitionEvents = useMemo(() => {
        if (!activeTicket) return [];
        return getEvents(activeTicket.id);
    }, [activeTicket]);

    return (
        <div className={styles.container}>
            <div className={styles.ticketList}>
                {TICKETS.map((ticket) => {
                    const isActive = activeTicket?.id === ticket.id;
                    const ticketEvents = getEvents(ticket.id);

                    return (
                        <div key={ticket.id} className={styles.ticketGroup}>
                            <div
                                className={`${styles.ticketWrapper} ${isActive ? styles.active : ""}`}
                                onMouseEnter={() => setActiveTicket(ticket)}
                                onClick={() => setActiveTicket(ticket)}
                            >
                                <img
                                    src={ticket.image}
                                    alt={ticket.name}
                                    className={styles.ticketImage}
                                    draggable={false}
                                />
                            </div>

                            {/* Mobile/Tablet Accordion Panel */}
                            <div className={`${styles.mobileEventsPanel} ${isActive ? styles.show : ""}`}>
                                {isActive && (
                                    <div className={styles.mobileCardsContainer}>
                                        {ticketEvents.length > 0 ? (
                                            ticketEvents.map((event, index) => (
                                                <EventCard
                                                    key={`${ticket.id}-${index}`}
                                                    index={index}
                                                    event={event}
                                                    onMoreInfo={() => setSelectedEvent(event)}
                                                />
                                            ))
                                        ) : (
                                            <p className={styles.placeholderText}>No events found</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop Details Panel */}
            <div className={styles.detailsPanel}>
                {activeTicket ? (
                    <>
                        <div className={styles.cardsContainer}>
                            {activeCompetitionEvents.length > 0 ? (
                                activeCompetitionEvents.map((event, index) => (
                                    <EventCard
                                        key={`${activeTicket.id}-${index}`}
                                        index={index}
                                        event={event}
                                        onMoreInfo={() => setSelectedEvent(event)}
                                    />
                                ))
                            ) : (
                                <p className={styles.placeholderText}>No events found for {activeTicket.name}</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p className={styles.placeholderText}>Hover over a ticket to see details</p>
                )}
            </div>

            {selectedEvent && (
                <EventDetailsModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
};

export default Competitions;
