// src/pages/Explore.jsx

import { useEffect, useRef, useState } from "react";

import ExploreHero from "@/components/explore/ExploreHero";
import ComingSoon from "../components/common/ComingSoon/ComingSoon";
import ExploreTabs from "../components/explore/ExploreTabs";
import Competitions from "../components/explore/competitions/Competitions";

const VALID_TABS = ["proShows", "competitions", "streetActivity"];

const Explore = () => {
  const [activeTab, setActiveTab] = useState("proShows");
  const tabsRef = useRef(null);

  // Scroll to top on page load
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 0.5 });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, []);

  // Initialize from URL hash on mount and scroll to tabs
  useEffect(() => {
    const hashTab = window.location.hash.replace("#", "");
    if (hashTab && VALID_TABS.includes(hashTab)) {
      setActiveTab(hashTab);
    }
  }, []);

  // Update URL hash when tab changes
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    window.location.hash = tabKey;
  };

  return (
    <main>
      {/* Hero Section */}
      <ExploreHero />

      {/* Black background content */}
      <section style={{ background: "#000", minHeight: "100vh" }}>
        <ExploreTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === "competitions" ? (
          <Competitions />
        ) : (
          // <ExploreSection
          //     items={exploreData[activeTab]}
          // />
          <ComingSoon />
        )}
      </section>
    </main>
  );
};

export default Explore;
