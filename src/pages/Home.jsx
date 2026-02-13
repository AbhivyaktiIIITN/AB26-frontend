import About from "../components/home/About/About";
import AboutTheme from "../components/home/AboutTheme/AboutTheme";
import Explore from "../components/home/Explore/Explore";
import GuestsSpeakers from "../components/home/GuestsSpeakers/GuestsSpeakers";
import Hero from "../components/home/Hero/Hero";
import Sponsors from "../components/home/Sponsors/Sponsors";

const Home = () => {
  return (
    <div className="w-full h-full">
      <Hero />
      <About />

      {/* Unified Background Section */}
      <div className="relative w-full z-20">
        {/* Shared Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-top bg-repeat-y -z-20"
          style={{ backgroundImage: "url('https://assets.2026.abhivyaktifest.in/images/Home/red-royal-bg.png')", backgroundSize: "100% auto" }}
        />

        {/* Center Vignette (Dark edges, 60% dark center) */}
        <div
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.95) 90%, black 100%)",
            backgroundAttachment: "fixed"
          }}
        />

        {/* Top Fade (Black to Transparent) - Transition from About */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent z-0 pointer-events-none" />

        {/* Bottom Fade (Transparent to Black) - Transition to Footer/End */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

        <div className="relative z-10">
          <Explore />
          <GuestsSpeakers />
          <Sponsors />
          <AboutTheme />
        </div>
      </div>
    </div>
  );
};

export default Home;
