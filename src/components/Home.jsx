import SponsorCard from "./ui/home-page/Sponser-card/sponserCart";
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


  return (
    <div className="w-full h-full">

      {/* Hero section */}
      <section
        className="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/Home/image1.png')" }}
      >
        <div className="w-full h-full bg-linear-to-b from-black to-black/40 flex flex-col justify-between">
          {/* Navbar */}
          <div className="px-6 py-3 w-full flex items-center justify-between gap-2.5">
            <div className="w-16 aspect-square">
              <img
                src="/Images/Home/ablogo.png"
                alt="AB Logo"
                className="invert w-full h-full aspect-square"
              />
            </div>
            <div className="hidden sm:flex items-center gap-4">
              {navLinks.map((n, i) => (
                <a key={i} href={n.to}>
                  <span className="text-white">{n.content}</span>
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
          <div className="px-10 sm:px-15 py-10 w-full h-fit grid place-items-center">
            <div
              className="w-full h-53 max-w-100 sm:max-w-200 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/Images/Home/ab.png')" }}
            ></div>
          </div>
          <div className="p-6 w-full h-fit flex flex-col md:flex-row gap-x-6 gap-y-2.5">
            <div className="w-full md:w-fit flex items-center gap-2.5">
              <div className="w-[calc((100%-170px)/2)] h-0.5 rounded-full bg-white md:hidden"></div>
              <div className="w-fit text-white font-bold whitespace-nowrap">
                19-21st March 2026
              </div>
              <div className="w-[calc((100%-150px)/2)] h-0.5 rounded-full bg-white md:hidden"></div>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="w-[calc((100%-400px)/2)] h-0.5 rounded-full bg-white"></div>
              <div className="text-white sm:whitespace-nowrap">
                <div className="font-bold text-center">Indian Institute of Information Technology, Nagpur</div>
                <div className="text-sm text-center sm:text-left mt-0.5">An Institute of National Importance</div>
              </div>
              <div className="w-[calc((100%-400px)/2)] h-0.5 rounded-full bg-white"></div>
            </div>
            <div className="w-full md:w-fit h-full grid place-items-center">
              <button
                type="button"
                className="mt-2.5 md:mt-0 w-10 aspect-square rounded-2xl bg-contain bg-center bg-no-repeat duration-300 active:scale-75"
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
            <div className="px-6 pt-16 pb-4 w-full h-fit bg-linear-to-b from-[#D4AF37]/35 to-transparent flex items-center gap-3 sm:gap-6">
              <div className="w-10 sm:w-26 h-0.5 rounded-full bg-white"></div>
              <div className="text-white font-bold">
                The Annual Cultural Festival
              </div>
            </div>
            <div className="grow w-full h-fit px-8 py-3 flex flex-col">
              <div
                className="w-full max-w-150 h-16 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/Images/Home/aboutab.png')" }}
              ></div>
              <div className="grow sm:px-3 py-6 w-full flex flex-col md:flex-row justify-evenly items-center gap-6">
                <div className="max-w-110">
                  <img
                    src="/Images/Home/magician.png"
                    alt="Magician"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <div className="w-full max-w-[max(700px,45vw)] tracking-wider text-white md:text-xl text-justify">
                    Abhivyakti, the annual cultural extravaganza of IIIT Nagpur, is a grand celebration of creativity, artistry, and cultural diversity. True to its name, meaning “expression,” it offers students a vibrant platform to showcase their talents, push boundaries, and foster a spirit of camaraderie and collaboration. As one of the most awaited campus events, it transforms the institute into a lively hub of energy and artistic brilliance. The fest features electrifying concerts, mesmerizing dances, captivating plays, and stunning art exhibitions, inspiring participants to explore their potential and celebrate creativity in unique, memorable ways. Abhivyakti, the annual cultural extravaganza of IIIT Nagpur, is a grand celebration of creativity, artistry, and cultural diversity. True to its name, meaning “expression,” it offers students a vibrant platform to showcase their talents, push boundaries, and foster a spirit of camaraderie and collaboration. As one of the most awaited campus events, it transforms the institute into a lively hub of energy and artistic brilliance. The fest features electrifying concerts, mesmerizing dances, captivating plays, and stunning art exhibitions, inspiring participants to explore their potential and celebrate creativity in unique, memorable ways.

                  </div>
                  
                  {/* This is the button which will translate to about page */}
                  <button className="border-2 border-white text-white mt-2 bg-linear-to-b from-black/2  to-red-800 max-w-35 p-2  text-lg  rounded-lg cursor-pointer">Explore Theme</button>
                </div>
              </div>
            </div>
          </div>
          {/* Video section */}
          <div className="px-8 py-10 grid place-items-center">
            <div className="w-full max-w-300 border border-white/10 p-6 sm:px-14 sm:py-10 rounded-4xl">
              <div className="w-full h-150 overflow-hidden rounded-3xl">
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

      {/* Explore and Sponser Section*/}
      <section
        className="relative w-full bg-cover bg-center bg-red-950 bg-no-repeat h-fit"
        style={{ backgroundImage: "url('/Images/Home/red-royal-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        <div className="relative px-6 sm:px-10 lg:px-20 py-20 flex flex-col items-center gap-14">

          <div className="flex items-center gap-4">
            <div className="w-12 h-0.5 bg-white/80 rounded-full" />
            <span className="text-white text-sm sm:text-base tracking-wide">
              On Stage and Beyond
            </span>
            <div className="w-12 h-0.5 bg-white/80 rounded-full" />
          </div>

          <div
            className="w-full max-w-160 h-12 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/Images/Home/EXPLORE.png')" }}
          />

          <div className="w-full max-w-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {[
              { img: "/Images/Home/pro-shows.png", title: "Explore Shows" },
              { img: "/Images/Home/Street-Activities.png", title: "Join The Fun" },
              { img: "/Images/Home/competition.png", title: "Compete Now" }
            ].map((item, i) => (
              <div
                key={i}
                className="group w-full max-w-80 rounded-4xl overflow-hidden bg-[#2a0e12]/80 border border-white/20 shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className="w-full h-56 bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.img}')` }}
                />
                <div className="px-6 py-4 bg-[#7a4a2e] text-center text-white font-semibold tracking-wide">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/*=============== GUEST SECTION IN BETWEEN ================== */}


        {/* Sponsors Section */}
        <div className="relative mt-32">
          <div className="p-2 flex items-center justify-start">
            <div
              className="w-full max-w-160 h-10 mx-auto mb-12 bg-contain  bg-no-repeat"
              style={{ backgroundImage: "url('/Images/Home/SPONSERS.png')" }}
            />
          </div>

          <div className="w-full flex flex-col justify-center items-center gap-12 ">

            {/* Left -> Right */}
            <div className="w-full overflow-hidden flex justify-center">
              <div className="relative flex justify-center w-full">
                <div className="flex gap-15 w-max animate-[marquee-right_30s_linear_infinite]">
                  {[...topSponsors, ...topSponsors].map((s, i) => (
                    <SponsorCard key={`top-${i}`} logo={s.logo} alt={s.alt} />
                  ))}
                </div>
              </div>
            </div>


            {/* Right -> Left */}
            <div className="w-full overflow-hidden   ">
              <div className="flex gap-15 w-max animate-[marquee-left_30s_linear_infinite]">
                {[...bottomSponsors, ...bottomSponsors].map((s, i) => (
                  <SponsorCard
                    key={`bottom-${i}`}
                    logo={s.logo}
                    alt={s.alt}
                  />
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