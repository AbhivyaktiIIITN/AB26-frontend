import HeroSection from "../components/sponsors/HeroSection";
import SponsorsTierSection from "../components/sponsors/SponsorsTierSection";

const Sponsors = () => {

  const titleSponsor = [
    { name: "Dab to Fab", logo: "/sponsors/dabtofab.jpeg" },
  ];

  const coTitleSponsor = [
    { name: "Woodhouse", logo: "/sponsors/woodhouse.jpeg" },
  ];

  const poweredBy = [
    { name: "VLCC", logo: "/sponsors/vlcc.png" }
  ];

  const athleisurePartner = [
    { name: "Skechers", logo: "/sponsors/skechers.png" },
  ];

  const travellingPartner = [
    { name: "AbhiBus", logo: "/sponsors/abhibus.jpeg" },
  ];

  const beveragePartner = [
    { name: "Papa’s Instantly Tasty", logo: "/sponsors/papasinstant.jpeg" },
  ];

  const refreshmentPartner = [
    { name: "Wildcup", logo: "/sponsors/wildcup.png" },
  ];

  const snackingPartner = [
    { name: "Snackzilla", logo: "/sponsors/snackzilla.jpeg" },
  ];

  const mediaPartner = [
    { name: "Summarise", logo: "/sponsors/summarise.jpeg" },
  ];

  const streamingPartner = [
    { name: "Blastix", logo: "/sponsors/blastix.png" },
  ];

  const inKindPartner = [
    { name: "Bluntly", logo: "/sponsors/bluntly.jpg" },
  ];

  return (
    <main className="sponsorsPage bg-black">
      <HeroSection />

      <SponsorsTierSection title="Title Sponsor" sponsors={titleSponsor} />
      <SponsorsTierSection title="Co Title / Platinum Sponsor" sponsors={coTitleSponsor} />
      <SponsorsTierSection title="Powered By" sponsors={poweredBy} />
      <SponsorsTierSection title="Athleisure Partner" sponsors={athleisurePartner} />
      <SponsorsTierSection title="Bus Travel Partner" sponsors={travellingPartner} />
      <SponsorsTierSection title="Beverage Partner" sponsors={beveragePartner} />
      <SponsorsTierSection title="Refreshment Partner" sponsors={refreshmentPartner} />
      <SponsorsTierSection title="Snacking Partner" sponsors={snackingPartner} />
      <SponsorsTierSection title="Media Partner" sponsors={mediaPartner} />
      <SponsorsTierSection title="Streaming Partner" sponsors={streamingPartner} />
      <SponsorsTierSection title="In Kind" sponsors={inKindPartner} />

    </main>
  );
};

export default Sponsors;