// src/components/explore/ExploreTabs.jsx

import styles from "./explore.module.css";

const TABS = [
    { key: "proShows", label: "Pro-shows" },
    { key: "competitions", label: "Competitions" },
    { key: "streetActivity", label: "Street - Activity" },
];

const ExploreTabs = ({ activeTab, onTabChange }) => {
    return (
        <nav className={styles.tabsWrapper} aria-label="Explore Sections">
            {TABS.map((tab) => {
                const isActive = activeTab === tab.key;

                return (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => onTabChange(tab.key)}
                        className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}
                        aria-current={isActive ? "true" : "false"}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </nav>
    );
};

export default ExploreTabs;
