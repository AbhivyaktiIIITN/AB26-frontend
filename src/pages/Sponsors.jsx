import ComingSoon from "../components/common/ComingSoon/ComingSoon";
import HeroSection from "../components/sponsors/HeroSection";
import SponsorsTierSection from "../components/sponsors/SponsorsTierSection";

const Sponsors = () => {
  const tierOne = [{ name: "Sponsor 1", logo: null }];

  const tierTwo = [
    { name: "Sponsor 2", logo: null },
    { name: "Sponsor 3", logo: null },
  ];

  const tierThree = [
    { name: "Sponsor 4", logo: null },
    { name: "Sponsor 5", logo: null },
  ];

  return (
    <main className="sponsorsPage bg-black">
      <HeroSection />
      {/* <SponsorsTierSection title="TITLE SPONSER" sponsors={tierOne} />
      <SponsorsTierSection title="PLATINUM SPONSORS" sponsors={tierTwo} />
      <SponsorsTierSection title="GOLD SPONSORS" sponsors={tierThree} /> */}
      <ComingSoon />
    </main>
  );
};

export default Sponsors;
