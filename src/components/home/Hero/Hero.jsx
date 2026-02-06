import { motion } from "motion/react";
import { useEffect, useState } from "react";

const Hero = () => {
  const scrollHandler = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const [scale, setScale] = useState(window.innerWidth / 800);
  const scaleHandler = () => {
    const r = window.innerWidth / 800;
    return r >= 1 ? 1 : r;
  };

  useEffect(() => {
    const handleResize = () => {
      setScale(scaleHandler());
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="w-full pt-20 h-screen bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="w-full h-full flex flex-col justify-between relative">
        {/* <div className="px-6 py-3 w-full flex items-center justify-between gap-2.5">
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
                <span className="text-white whitespace-nowrap">
                  {n.content}
                </span>
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
        </div> */}
        <div className="px-10 sm:px-15 py-10 w-full h-fit flex flex-col items-center justify-center">
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
          <div className="h-32 w-180 relative" style={{ scale: scale }}>
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
                delay: 4,
              }}
              className="absolute top-7 left-[calc(50%+2px)] z-10"
            >
              <img src="/Images/Home/y.png" alt="" className="h-22.5" />
            </motion.div>
          </div>
          <motion.div
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              duration: 1.5,
              delay: 3,
            }}
            className="text-[#D4AF37] text-4xl md:text-6xl"
          >
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
                <div className="font-bold text-center">
                  Indian Institute of Information Technology, Nagpur
                </div>
                <div className="text-sm text-center md:text-left mt-0.5">
                  An Institute of National Importance
                </div>
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
  );
};

export default Hero;
