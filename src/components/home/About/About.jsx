import { motion } from "motion/react";

const About = () => {
  return (
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
                delay: 2,
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
                    delay: 2.5,
                  }}
                  className="w-full text-white md:text-xl text-justify"
                >
                  Abhivyakti, the annual cultural extravaganza of IIIT Nagpur,
                  is a grand celebration of creativity, artistry, and cultural
                  diversity. True to its name, meaning "expression," it offers
                  students a vibrant platform to showcase their talents, push
                  boundaries, and foster a spirit of camaraderie and
                  collaboration. As one of the most awaited campus events, it
                  transforms the institute into a lively hub of energy and
                  artistic brilliance. The fest features electrifying concerts,
                  mesmerizing dances, captivating plays, and stunning art
                  exhibitions, inspiring participants to explore their potential
                  and celebrate creativity in unique, memorable ways.
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
  );
};

export default About;
