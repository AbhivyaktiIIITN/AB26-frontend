import ExploreCard from "./ExploreCards";

const Explore = () => {
  const EventLinks = [
    { text: "Dance", link: "/" },
    { text: "Dramatic", link: "/" },
    { text: "Music", link: "/" },
    { text: "Speaking Arts", link: "/" },
    { text: "Fine Arts", link: "/" },
    { text: "Digital Arts", link: "/" },
    { text: "Dance", link: "/" },
    { text: "Dramatic", link: "/" },
    { text: "Music", link: "/" },
    { text: "Speaking Arts", link: "/" },
    { text: "Fine Arts", link: "/" },
    { text: "Digital Arts", link: "/" },
  ];

  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat h-fit overflow-x-hidden"
      style={{ backgroundImage: "url('/Images/Home/red-royal-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      <div className="relative px-4 sm:px-10 lg:px-20 py-12 sm:py-20 flex flex-col items-center gap-10 sm:gap-14">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 sm:w-12 h-0.5 bg-white/80 rounded-full" />
          <span className="text-white text-xs sm:text-base tracking-widest uppercase font-light">
            On Stage and Beyond
          </span>
          <div className="w-8 sm:w-12 h-0.5 bg-white/80 rounded-full" />
        </div>

        <div
          className="w-full h-8 sm:h-12 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Images/Home/EXPLORE.png')" }}
        />

        <div className="w-full max-w-275 mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-24 md:gap-10 lg:gap-16 place-items-center mt-10">
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

        <div className="relative w-screen bg-linear-to-r from-[#5a2a0a] via-[#c66a26] to-[#5a2a0a] py-4 mt-10 overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] items-center gap-12 text-[#f5e6d8] font-['Playfair_Display'] text-xl tracking-wide">
            {[...EventLinks, ...EventLinks, ...EventLinks].map(
              (event, index) => (
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
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
