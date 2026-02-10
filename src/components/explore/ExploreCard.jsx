import styles from "./explore.module.css";
import { Link } from "react-router-dom";

const ExploreCard = ({
    genre,
    artistName,
    description,
    date,
    venue,
    time,
    buyLink,
}) => {
    return (
        <article className={styles.card}>
            <span className={styles.genre}>{genre}</span>

            <h3 className={styles.artistName}>{artistName}</h3>

            <p className={styles.description}>{description}</p>

            <div className={styles.meta}>
                <span className={styles.metaItem}>{date}</span>
                <span className={styles.metaItem}>{venue}</span>
                <span className={styles.metaItem}>{time}</span>
            </div>

            <Link to={buyLink} className={styles.button}>Buy Passes</Link>
        </article>
    );
};

export default ExploreCard;
