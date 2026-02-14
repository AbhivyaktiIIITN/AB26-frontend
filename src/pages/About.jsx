// src/pages/About.jsx

import AboutDescription from "../components/about-us/AboutDescription";
import AboutHeroSection from "../components/about-us/AboutHeroSection";
import DignitariesSection from "../components/about-us/DignitariesSection";

const About = () => {
  return (
    <main>
      <AboutHeroSection />
      <AboutDescription />
      <DignitariesSection />
    </main>
  );
};

export default About;
