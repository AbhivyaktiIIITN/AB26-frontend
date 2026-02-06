import About from "./About/About";
import AboutTheme from "./AboutTheme/AboutTheme";
import Explore from "./Explore/Explore";
import GuestsSpeakers from "./GuestsSpeakers/GuestsSpeakers";
import Hero from "./Hero/Hero";
import Sponsors from "./Sponsors/Sponsors";

const Home = () => {
  return (
    <div className="w-full h-full">
      <Hero />
      <About />
      <Explore />
      <GuestsSpeakers />
      <Sponsors />
      <AboutTheme />
    </div>
  );
};

export default Home;
