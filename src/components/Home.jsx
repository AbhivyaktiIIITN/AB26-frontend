import { useEffect, useState } from "react"
import { motion } from "motion/react"
import ExploreCard from "./ui/home-page/Explore/ExploreCards";
import SponsorCard from "./ui/home-page/Sponser-card/sponserCard";

const Home = () => {

  const navLinks = [
    { content: "Home", to: "/" },
    { content: "About", to: "/" },
    { content: "Events", to: "/" },
    { content: "Sponsers", to: "/" },
    { content: "Teams", to: "/" },
    { content: "Contact Us", to: '/' }
  ]

  const scrollHandler = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    })
  }

  const [scale, setScale] = useState(window.innerWidth / 800)
  const scaleHandler = () => {
    const r = window.innerWidth / 800
    return r >= 1 ? 1 : r
  }
  useEffect(() => {
    const handleResize = () => {
      setScale(scaleHandler());
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const topSponsors = [
    { logo: "/Images/Sponsors/s1.png", alt: "Sponsor 1" },
    { logo: "/Images/Sponsors/s2.png", alt: "Sponsor 2" },
    { logo: "/Images/Sponsors/s3.png", alt: "Sponsor 3" },
    { logo: "/Images/Sponsors/s3.png", alt: "Sponsor 3" },
    { logo: "/Images/Sponsors/s3.png", alt: "Sponsor 3" },
    { logo: "/Images/Sponsors/s3.png", alt: "Sponsor 3" },
    { logo: "/Images/Sponsors/s3.png", alt: "Sponsor 3" },
    { logo: "/Images/Sponsors/s3.png", alt: "Sponsor 3" },
  ];

  const bottomSponsors = [
    { logo: "/Images/Sponsors/s4.png", alt: "Sponsor 4" },
    { logo: "/Images/Sponsors/s4.png", alt: "Sponsor 4" },
    { logo: "/Images/Sponsors/s4.png", alt: "Sponsor 4" },
    { logo: "/Images/Sponsors/s4.png", alt: "Sponsor 4" },
    { logo: "/Images/Sponsors/s5.png", alt: "Sponsor 5" },
    { logo: "/Images/Sponsors/s6.png", alt: "Sponsor 6" },
    { logo: "/Images/Sponsors/s6.png", alt: "Sponsor 6" },
    { logo: "/Images/Sponsors/s6.png", alt: "Sponsor 6" },
  ];

  const EventLinks = [
    {
      text: 'Dance',
      link: '/'
    },

    {
      text: 'Dramatic',
      link: '/'
    },
    {
      text: 'Music',
      link: '/'
    },
    {
      text: 'Speaking Arts',
      link: '/'
    },
    {
      text: 'Fine Arts',
      link: '/'
    },
    {
      text: 'Digital Arts',
      link: '/'
    },
    {
      text: 'Dance',
      link: '/'
    },

    {
      text: 'Dramatic',
      link: '/'
    },
    {
      text: 'Music',
      link: '/'
    },
    {
      text: 'Speaking Arts',
      link: '/'
    },
    {
      text: 'Fine Arts',
      link: '/'
    },
    {
      text: 'Digital Arts',
      link: '/'
    },
  ]


  return (
    <div className="w-full h-full">

      {/* Hero section */}
      <section
        className="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/Home/image1.png')" }}
      >
        <div className="w-full h-full bg-linear-to-b from-black/90 to-black/60 flex flex-col justify-between">
          {/* Navbar */}
          <div className="px-6 py-3 w-full flex items-center justify-between gap-2.5">
            <div className="w-16 aspect-square">
              <img
                src="/Images/Home/ablogo.png"
                alt="AB Logo"
                className="invert w-full h-full aspect-square"
              />
            </div>
            <div className="hidden md:flex items-center gap-4">
              {navLinks.map((n, i) => (
                <a key={i} href={n.to}>
                  <span className="text-white whitespace-nowrap">{n.content}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-white">
              <button type="button">Sign Up</button>
              <button
                type="button"
                className="px-6 py-1.5 bg-linear-to-b from-[#180308] to-[#440c17] border border-[#4d4d4d] rounded-lg"
              >
                Login
              </button>
            </div>
          </div>
          <div className="px-10 sm:px-15 py-10 w-full h-fit flex flex-col items-center justify-center"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 1 } },
              }}
              className="flex gap-2.5 text-[#D4AF37] text-xl md:text-3xl translate-y-4"
            >
              {["THE", "ENCHANTED", "CIRCUS"].map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { duration: 1.5 } },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
            <div
              className="h-32 w-180 relative"
              style={{ scale: scale }}
            >
              <div
                className="h-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/Images/Home/ab.png')" }}
              ></div>
              <motion.div
                animate={{
                  opacity: [0, 1, 1, 1, 0],
                  filter: [
                    "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
                    "drop-shadow(0px 10px 25px rgba(212,175,55))",
                    "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  delay: 4
                }}
                className="absolute top-7 left-[calc(50%+2px)] z-10"
              >
                <img
                  src="/Images/Home/y.png"
                  alt=""
                  className="h-22.5"
                />
              </motion.div>
            </div>
            <motion.div
              animate={{
                opacity: [0, 1]
              }}
              transition={{
                duration: 1.5,
                delay: 3
              }}
              className="text-[#D4AF37] text-4xl md:text-6xl">
              2026
            </motion.div>
          </div>
          <div className="p-6 w-full h-fit flex flex-col md:flex-row gap-x-6 gap-y-3">
            <div className="w-full md:w-fit flex justify-center items-center gap-2">
              <div className="flex flex-col md:flex-row md:gap-4 items-center">
                <div className="h-10 aspect-square">
                  <img
                    src="/Images/Home/iiitn.png"
                    alt="IIITN"
                    className="h-full aspect-square"
                  />
                </div>
                <div className="text-white sm:whitespace-nowrap">
                  <div className="font-bold text-center">Indian Institute of Information Technology, Nagpur</div>
                  <div className="text-sm text-center md:text-left mt-0.5">An Institute of National Importance</div>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-2.5">
              <div className="w-[calc((100%-150px)/2)] h-0.5 rounded-full bg-white"></div>
              <div className="w-fit text-white font-bold whitespace-nowrap">
                19-21st March 2026
              </div>
              <div className="w-[calc((100%-150px)/2)] h-0.5 rounded-full bg-white"></div>
            </div>
            <div className="w-full md:w-fit h-full grid place-items-center">
              <button
                type="button"
                className="mt-2.5 md:mt-0 w-10 aspect-square rounded-2xl bg-contain bg-center bg-no-repeat duration-300 active:scale-85"
                onClick={scrollHandler}
                style={{ backgroundImage: "url('/Images/Home/arrow.png')" }}
              ></button>
            </div>
          </div>
        </div>
      </section>

      {/* About section */}
      <section
        className="w-full h-fit bg-cover bg-center relative"
        style={{ backgroundImage: "url('/Images/Home/image2.jpg')" }}
      >
        <div className="w-full h-full backdrop-blur-xs bg-black/75">
          <div className="w-full min-h-screen flex flex-col">
            <div className="px-6 pt-16 pb-4 w-full h-fit bg-linear-to-b from-[#D4AF37]/35 to-transparent flex items-center gap-3 sm:gap-4">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-10 sm:w-26 h-0.5 rounded-full bg-white origin-left"
              />
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.5 } },
                }}
                className="flex gap-1.5"
              >
                {["The", "Annual", "Cultural", "Festival"].map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { duration: 1 } },
                    }}
                    className="text-white font-bold"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            <div className="grow w-full h-fit px-8 flex flex-col">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 1,
                  delay: 2
                }}
                className="w-full max-w-150 h-16 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/Images/Home/aboutab.png')" }}
              ></motion.div>
              <div className="grow sm:px-3 py-6 w-full flex flex-col md:flex-row justify-evenly items-center gap-6">
                <div className="max-w-110">
                  <img
                    src="/Images/Home/magician.png"
                    alt="Magician"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full max-w-[max(700px,45vw)]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 1.5,
                      delay: 2.5
                    }}
                    className="w-full text-white md:text-xl text-justify"
                  >
                    Abhivyakti, the annual cultural extravaganza of IIIT Nagpur, is a grand celebration of creativity, artistry, and cultural diversity. True to its name, meaning “expression,” it offers students a vibrant platform to showcase their talents, push boundaries, and foster a spirit of camaraderie and collaboration. As one of the most awaited campus events, it transforms the institute into a lively hub of energy and artistic brilliance. The fest features electrifying concerts, mesmerizing dances, captivating plays, and stunning art exhibitions, inspiring participants to explore their potential and celebrate creativity in unique, memorable ways.
                  </motion.div>
                  <div className="mt-6 w-full md:w-fit grid place-items-center">
                    <button
                      type="button"
                      className="px-5 py-1.5 border border-[#676767] bg-linear-to-b from-[#3e1b08] to-[#602410] text-white rounded-md"
                    >
                      Explore Theme
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Video section */}
          <div className="px-8 py-10 grid place-items-center">
            <div className="w-full max-w-200 border border-white/10 p-6 sm:px-14 sm:py-10 rounded-4xl">
              <div className="w-full h-100 overflow-hidden rounded-3xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/droNt6x2P7E"
                  title='"The Greatest Show" Background Animation'
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore and Sponsor Section */}
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat h-fit overflow-x-hidden"
        style={{ backgroundImage: "url('/Images/Home/red-royal-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="relative px-4 sm:px-10 lg:px-20 py-12 sm:py-20 flex flex-col items-center gap-10 sm:gap-14">

          {/* Subtitle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 sm:w-12 h-0.5 bg-white/80 rounded-full" />
            <span className="text-white text-xs sm:text-base tracking-widest uppercase font-light">
              On Stage and Beyond
            </span>
            <div className="w-8 sm:w-12 h-0.5 bg-white/80 rounded-full" />
          </div>

          {/* Section Title Image */}
          <div
            className="w-full h-8 sm:h-12 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/Images/Home/EXPLORE.png')" }}
          />

          {/* Explore Cards Grid */}

          <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-24 md:gap-10 lg:gap-16 place-items-center mt-10">
            <ExploreCard
              bg="/Images/Home/CARD-BACKGROUND.jpg"
              text="/Images/Home/PRO-SHOW.png"
              asset="/Images/Home/PRO-SHOW-1.png"
              cta="Explore Shows"
              assetClass="bottom-[50px] sm:bottom-[55px] w-[200px] sm:w-[250px]"
            />

            <ExploreCard
              bg="/Images/Home/CARD-BACKGROUND.jpg"
              text="/Images/Home/Competition.png"
              asset="/Images/Home/dancer.png"
              cta="Compete Now"
              assetClass="bottom-[20px] sm:bottom-[25px] w-[110px] sm:w-[130px]"
            />

            <ExploreCard
              bg="/Images/Home/CARD-BACKGROUND.jpg"
              text="/Images/Home/STREET-ACTIVITY.png"
              asset="/Images/Home/STREET-ACTIVITY-IMAGE.png"
              cta="Join the Fun"
              assetClass="bottom-[35px] sm:bottom-[40px] w-[100px] sm:w-[110px]"
            />
          </div>

          {/* EVENT MARQUEE  */}
          <div className="relative w-screen  bg-linear-to-r from-[#5a2a0a] via-[#c66a26] to-[#5a2a0a] py-4 mt-10 overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] items-center gap-12 text-[#f5e6d8] font-['Playfair_Display'] text-xl tracking-wide">
              {[...EventLinks, ...EventLinks, ...EventLinks].map((event, index) => (
                <div key={index} className="flex items-center gap-12">
                  <span className="cursor-pointer hover:opacity-80 transition whitespace-nowrap">
                    {event.text}
                  </span>
                  <img
                    src="/Images/Home/sparkel.png"
                    alt="separator"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* =====================IN BEWTWEEENNN SECTIONNNs========================= */}

        {/* Sponsors Section */}
        <div className="relative mt-20 sm:mt-32 pb-20">
          <div className="w-full px-6 sm:px-10 lg:px-20 mb-8 sm:mb-12">
            <div
              className="w-full h-8 sm:h-12 bg-contain bg-no-repeat bg-left"
              style={{ backgroundImage: "url('/Images/Home/SPONSERS.png')" }}
            />
          </div>

          <div className="w-full flex flex-col gap-8 sm:gap-12">
            {/* Row 1 */}
            <div className="w-full overflow-hidden">
              <div className="flex gap-8 sm:gap-15 w-max animate-[marquee-right_30s_linear_infinite]">
                {[...topSponsors, ...topSponsors].map((s, i) => (
                  <div key={i} className="scale-75 sm:scale-100">
                    <SponsorCard logo={s.logo} alt={s.alt} />
                  </div>
                ))}
              </div>
            </div>
            {/* Row 2 */}
            <div className="w-full overflow-hidden">
              <div className="flex gap-8 sm:gap-10 w-max animate-[marquee-left_30s_linear_infinite]">
                {[...bottomSponsors, ...bottomSponsors].map((s, i) => (
                  <div key={i} className="scale-75 sm:scale-100">
                    <SponsorCard logo={s.logo} alt={s.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home