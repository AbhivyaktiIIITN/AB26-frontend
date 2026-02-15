import { motion } from "framer-motion";

const abhivyaktiText =
  "https://assets.2026.abhivyaktifest.in/src/assets/branding/abhivyakti text-yellow.webp";

const stageBg =
  "https://assets.2026.abhivyaktifest.in/src/assets/background/background-curtains.webp";

const GalleryHero = () => {
  return (
    <section className="relative h-screen min-h-screen w-full overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-1"
        style={{ backgroundImage: `url(${stageBg})` }}
      />

      {/* Branding */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-full z-4 pointer-events-none">
        <img
          src={abhivyaktiText}
          alt="Abhivyakti"
          className="w-[clamp(260px,32vw,420px)] drop-shadow-[0_0_6px_rgba(221,178,36,0.85)]"
        />
      </div>

      {/* Center Title */}
      <div className="relative z-3 flex h-full items-center justify-center translate-y-[-5%] translate-x-[1%]">
        <motion.h1
          className="team-title text-center font-light text-[#D4AF37]
             leading-[0.95]
             tracking-[0.24em]
             text-[clamp(2.5rem,6vw,7rem)]
             max-w-[90vw]
             text-balance
             drop-shadow-[0_-2px_6px_rgba(212,175,55,0.9)]"
        >
          Gallery
        </motion.h1>
      </div>

      {/* Scroll Button */}
      <div className="absolute bottom-35 left-1/2 -translate-x-1/2 z-5">
        <button
          className="flex items-center justify-center w-12 h-12 rounded-xl
                     border border-white/80 backdrop-blur
                     bg-linear-to-br from-[rgba(255,230,200,0.3)] to-[rgba(212,175,55,0.4)]
                     shadow-lg transition-all duration-300
                     hover:scale-95 hover:brightness-110
                     hover:from-[rgba(255,230,200,0.45)]
                     hover:to-[rgba(212,175,55,0.55)]
                     hover:shadow-[0_0_10px_rgba(255,220,150,0.25)]"
          onClick={() => {
            const targetPosition = window.innerHeight;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 1500;
            let startTime = null;

            const animation = (currentTime) => {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const progress = Math.min(timeElapsed / duration, 1);

              const ease =
                progress < 0.5
                  ? 2 * progress * progress
                  : 1 - Math.pow(-2 * progress + 2, 2) / 2;

              window.scrollTo(0, startPosition + distance * ease);

              if (timeElapsed < duration) {
                requestAnimationFrame(animation);
              }
            };

            requestAnimationFrame(animation);
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M6 9L12 15L18 9"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Bottom gradient backdrop */}
      <div className="absolute bottom-0 left-0 w-full h-32.5 z-2
                      bg-linear-to-t from-black/85 via-black/45 to-transparent" />

      {/* Meta */}
      <div className="absolute bottom-5.5 left-0 w-full z-3
                      grid grid-cols-[1fr_auto_1fr]
                      px-8 text-white text-[18px]
                      font-[Gabarito] drop-shadow-lg
                      max-md:flex max-md:flex-col max-md:gap-1 max-md:bottom-4 max-md:text-center">
        <span className="justify-self-start max-md:justify-self-auto">Abhivyakti’26</span>
        <span className="justify-self-center max-md:justify-self-auto">The Enchanted Circus</span>
        <span className="justify-self-end max-md:justify-self-auto">19–21 March 2026</span>
      </div>

      {/* Fade to content */}
      <div className="absolute bottom-0 left-0 w-full h-37.5 pointer-events-none z-1
                      bg-linear-to-b from-transparent via-black/60 to-black" />
    </section>
  );
};

export default GalleryHero;
