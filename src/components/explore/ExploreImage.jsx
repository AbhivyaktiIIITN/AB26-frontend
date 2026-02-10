// src/components/explore/ExploreImage.jsx

import styles from "./explore.module.css";

const ExploreImage = ({ src, alt }) => {
    return (
        <div className={styles.imageWrapper}>
            <img
                src={src}
                alt={alt}
                className={styles.image}
                loading="lazy"
            />
        </div>
    );
};

export default ExploreImage;
