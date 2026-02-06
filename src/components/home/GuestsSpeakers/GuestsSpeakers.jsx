import { useEffect, useState } from "react";
import "./GuestsSpeakers.css";

const GuestsSpeakers = () => {
  // ========================================
  // SECTION CONFIGURATION
  // ========================================
  const sectionConfig = {
    subtitle: "Voices That Inspire",
    showSubtitle: true,
  };

  // ========================================
  // SPEAKER DATA
  // ========================================
  const speakers = [
    {
      id: 1,
      name: "GUEST NAME",
      designation: "DESIGNATION",
      image: "/images/speakers/speaker1.png",
    },
    {
      id: 2,
      name: "GUEST NAME",
      designation: "DESIGNATION",
      image: "/images/speakers/speaker2.png",
    },
    {
      id: 3,
      name: "GUEST NAME",
      designation: "DESIGNATION",
      image: "/images/speakers/speaker3.png",
    },
    {
      id: 4,
      name: "GUEST NAME",
      designation: "DESIGNATION",
      image: "/images/speakers/speaker4.png",
    },
  ];

  // ========================================
  // CAROUSEL STATE
  // ========================================
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [gapSize, setGapSize] = useState(130);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const getCircularSpeakers = () => {
    if (speakers.length <= cardsPerView) return speakers;
    return [...speakers, ...speakers, ...speakers];
  };

  const circularSpeakers = getCircularSpeakers();
  const actualStartIndex = speakers.length;

  const calculateGap = (width) => {
    if (width <= 768) return 20; // Standard mobile gap
    if (width <= 1200) return 40;
    return 130;
  };

  useEffect(() => {
    const calculateLayout = () => {
      const width = window.innerWidth;
      let cards = 3;
      const currentGap = calculateGap(width);

      // Responsive Breakpoints
      if (width <= 768) {
        cards = 1;
      } else if (width <= 1200) {
        cards = 2;
      } else {
        cards = 3;
      }

      setCardsPerView(cards);
      setGapSize(currentGap);

      const wrapper = document.querySelector(".cards-wrapper");
      if (wrapper) {
        const wrapperWidth = wrapper.offsetWidth;

        // UPDATED: Dynamic Padding Calculation
        // Mobile: 0 padding so card takes 100% width (No side bleed)
        // Desktop: 40px padding (20px each side) to prevent hover clipping
        const paddingOffset = width <= 768 ? 0 : 40;

        const totalGapSpace = currentGap * (cards - 1);
        const cardW = (wrapperWidth - paddingOffset - totalGapSpace) / cards;

        setCardWidth(cardW);
      }
    };

    calculateLayout();
    setCurrentIndex(actualStartIndex);

    window.addEventListener("resize", calculateLayout);
    return () => window.removeEventListener("resize", calculateLayout);
  }, []);

  useEffect(() => {
    if (!isTransitioning) return;

    const checkPosition = () => {
      if (currentIndex <= 0) {
        setIsTransitioning(false);
        setCurrentIndex(actualStartIndex);
      } else if (currentIndex >= actualStartIndex + speakers.length) {
        setIsTransitioning(false);
        setCurrentIndex(actualStartIndex);
      }
    };

    const timer = setTimeout(checkPosition, 650);
    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, actualStartIndex, speakers.length]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const goToPrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <section className="guests-speakers-section">
      <div className="background-overlay"></div>

      <div className="section-container">
        <div className="section-title">
          {sectionConfig.showSubtitle && (
            <div className="subtitle-line">
              <span className="line"></span>
              <span className="subtitle-text">{sectionConfig.subtitle}</span>
            </div>
          )}
          <h2 className="title-white">GUESTS &</h2>
          <h2 className="title-gold">SPEAKERS</h2>
        </div>

        <div className="carousel-container">
          <button className="nav-arrow left-arrow" onClick={goToPrevious}>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="cards-wrapper">
            <div
              className="cards-track"
              style={{
                gap: `${gapSize}px`,
                transform: `translateX(-${currentIndex * (cardWidth + gapSize)}px)`,
                transition: isTransitioning
                  ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              }}
            >
              {circularSpeakers.map((speaker, index) => (
                <div
                  key={`${speaker.id}-${index}`}
                  className="card-item"
                  style={{ width: cardWidth, flexBasis: cardWidth }}
                >
                  <div className="playing-card">
                    <div className="card-inner">
                      <img
                        className="card-template-bg"
                        src="/images/card-template.png"
                        alt=""
                      />

                      <div className="speaker-photo-layer">
                        <img src={speaker.image} alt={speaker.name} />
                      </div>

                      <div className="designation-text">
                        {speaker.designation}
                      </div>
                      <div className="guest-name-text">{speaker.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="nav-arrow right-arrow" onClick={goToNext}>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GuestsSpeakers;
