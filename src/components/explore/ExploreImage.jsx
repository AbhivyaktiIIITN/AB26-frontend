// src/components/explore/ExploreImage.jsx

import styles from "./explore.module.css";

const ExploreImage = ({ src, alt, link }) => {
    const handleClick = () => {
        if (link) {
            window.open(link, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className={styles.imageWrapper}>
            <img
                src={src}
                alt={alt}
                className={styles.image}
                loading="lazy"
                onClick={handleClick}
                style={{ cursor: link ? "pointer" : "default" }}
            />
        </div>
    );
};

export default ExploreImage;