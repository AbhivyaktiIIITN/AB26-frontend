const Home = () => {

  const navLinks = [
    { content: "Home", to: "/" },
    { content: "About", to: "/" },
    { content: "Events", to: "/" },
    { content: "Sponsers", to: "/" },
    { content: "Teams", to: "/" },
    { content: "Contact Us", to: '/' }
  ]

  return (
    <div className="w-full h-full">
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{backgroundImage: "url('/Images/Home/image1.png')"}}
      >
        <div className="w-full h-full bg-linear-to-b from-black to-transparent flex flex-col justify-between">
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
                <a
                  key={i}
                  href={n.to}
                >
                  <span
                    className="text-white"
                  >
                    {n.content}
                  </span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-white">
              <button type="button">
                Sign Up
              </button>
              <button
                type="button"
                className="px-5 py-1.5 bg-linear-to-b from-[#180308] to-[#621121] border border-[#7a7878] rounded-md"
              >
                Login
              </button>
            </div>
          </div>
          <div
            className="px-10 sm:px-15 py-10 w-full h-fit grid place-items-center"
          >
            <div
              className="w-full h-53 max-w-100 sm:max-w-200 bg-contain bg-center bg-no-repeat"
              style={{backgroundImage: "url('/Images/Home/ab.png')"}}
            ></div>
          </div>
          <div className="px-6 py-3 w-full h-fit bg-linear-to-b from-transparent to-[#D4AF37] flex flex-col md:flex-row gap-x-6 gap-y-2.5">
              <div className="w-full md:w-fit flex items-center gap-2.5">
                <div className="w-[calc((100%-170px)/2)] h-0.5 rounded-full bg-white md:hidden"></div>
                <div className="w-fit text-white font-bold whitespace-nowrap">19-21st March 2026</div>
                <div className="w-[calc((100%-150px)/2)] h-0.5 rounded-full bg-white md:hidden"></div>
              </div>
              <div className="w-full flex items-center gap-2">
                <div className="w-[calc((100%-400px)/2)] h-0.5 rounded-full bg-white"></div>
                <div className="text-white font-bold text-center sm:whitespace-nowrap">Indian Institute of Information Technology, Nagpur</div>
                <div className="w-[calc((100%-400px)/2)] h-0.5 rounded-full bg-white"></div>
              </div>
              <div className="w-full md:w-fit h-full grid place-items-center">
                <button
                  type="button"
                  className="mt-2.5 md:mt-0 w-10 aspect-square rounded-2xl bg-contain bg-center bg-no-repeat"
                  style={{backgroundImage: "url('/Images/Home/arrow.png')"}}
                ></button>
              </div>
          </div>
        </div>
      </div>
      <div
        className="w-full h-fit bg-cover bg-center"
        style={{backgroundImage: "url('/Images/Home/image2.jpg')"}}
      >
        <div className="w-full h-full backdrop-blur-xs bg-black/75">
          <div className="px-6 pt-16 pb-4 w-full h-fit bg-linear-to-b from-[#D4AF37] via-[#D4AF37]/35 to-transparent flex items-center gap-3 sm:gap-6">
            <div className="w-10 sm:w-26 h-0.5 rounded-full bg-white"></div>
            <div className="text-white font-bold">
              The Annual Cultural Festival
            </div>
          </div>
          <div className="w-full h-fit px-8 py-3">
            <div
              className="w-full max-w-150 h-16 bg-contain bg-center bg-no-repeat"
              style={{backgroundImage: "url('/Images/Home/aboutab.png')"}}
            ></div>
            <div className="mt-12 w-full flex flex-col md:flex-row justify-evenly items-center gap-6">
              <div className="max-w-100">
                <img
                  src="/Images/Home/magician.png"
                  alt="Magician"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full max-w-180 text-white text-justify">
                Abhivyakti, the annual cultural extravaganza of IIIT Nagpur, is a grand celebration of creativity, artistry, and cultural diversity. True to its name, meaning “expression,” it offers students a vibrant platform to showcase their talents, push boundaries, and foster a spirit of camaraderie and collaboration. As one of the most awaited campus events, it transforms the institute into a lively hub of energy and artistic brilliance. The fest features electrifying concerts, mesmerizing dances, captivating plays, and stunning art exhibitions, inspiring participants to explore their potential and celebrate creativity in unique, memorable ways. Abhivyakti, the annual cultural extravaganza of IIIT Nagpur, is a grand celebration of creativity, artistry, and cultural diversity. True to its name, meaning “expression,” it offers students a vibrant platform to showcase their talents, push boundaries, and foster a spirit of camaraderie and collaboration. As one of the most awaited campus events, it transforms the institute into a lively hub of energy and artistic brilliance. The fest features electrifying concerts, mesmerizing dances, captivating plays, and stunning art exhibitions, inspiring articipants to explore their potential and celebrate creativity in unique, memorable ways.
              </div>
            </div>
          </div>
          <div className="px-8 py-10 grid place-items-center">
            <div className="w-full max-w-200 border border-white/10 p-6 sm:px-14 sm:py-10 rounded-4xl">
              <div className="w-full h-100 overflow-hidden rounded-3xl">
                <iframe width={"100%"} height="100%" src="https://www.youtube.com/embed/droNt6x2P7E" title="&quot;The Greatest Show&quot; Background Animation" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home