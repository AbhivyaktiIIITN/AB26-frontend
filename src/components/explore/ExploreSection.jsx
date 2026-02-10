// src/components/explore/ExploreSection.jsx

import styles from "./explore.module.css";
import ExploreCard from "./ExploreCard";
import ExploreImage from "./ExploreImage";

const ExploreSection = ({ items }) => {
    // Empty state (e.g. competitions) isse hata dena
    if (!items || items.length === 0) {
        return (
            <section className={styles.section}>
                <div className={styles.sectionInner}>
                    <p className={styles.emptyText}>Coming Soon</p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.sectionInner}>
                {items.map((item) => {
                    const isImageLeft = item.layout === "image-left";

                    return (
                        <div
                            key={item.id}
                            className={`${styles.row} ${isImageLeft ? styles.imageLeft : styles.imageRight
                                }`}
                        >
                            <ExploreImage
                                src={item.image}
                                alt={item.artistName}
                            />

                            <ExploreCard
                                genre={item.genre}
                                artistName={item.artistName}
                                description={item.description}
                                date={item.date}
                                venue={item.venue}
                                time={item.time}
                                buyLink={item.buyLink}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};


export default ExploreSection;
