import ComingSoon from "../../common/ComingSoon/ComingSoon";
import "../GuestsSpeakers/GuestsSpeakers.css";
import SponsorCard from "./sponsorCard";

const sectionConfig = {
  subtitle: "Backing the Experience",
  showSubtitle: true,
};

const Sponsors = () => {
  const topSponsors = [
  { logo: "/sponsors/dabtofab.jpeg", alt: "Dab to Fab" },
  { logo: "/sponsors/woodhouse.jpeg", alt: "Woodhouse" },
  { logo: "/sponsors/vlcc.png", alt: "VLCC" },
  { logo: "/sponsors/skechers.png", alt: "Skechers" },
  { logo: "/sponsors/abhibus.jpeg", alt: "AbhiBus" },
  { logo: "/sponsors/papasinstant.jpeg", alt: "Papa’s Instantly Tasty" },
  { logo: "/sponsors/wildcup.png", alt: "Wildcup" },
  { logo: "/sponsors/snackzilla.jpeg", alt: "Snackzilla" },
  { logo: "/sponsors/summarise.jpeg", alt: "Summarise" },
  { logo: "/sponsors/blastix.png", alt: "Blastix" },
  { logo: "/sponsors/bluntly.jpg", alt: "Bluntly" },
];

  const bottomSponsors = [
    { logo: "/sponsors/woodhouse.jpeg", alt: "Woodhouse" },
    { logo: "/sponsors/vlcc.png", alt: "VLCC" },
    { logo: "/sponsors/skechers.png", alt: "Skechers" },
    { logo: "/sponsors/abhibus.jpeg", alt: "AbhiBus" },
    { logo: "/sponsors/papasinstant.jpeg", alt: "Papa’s Instantly Tasty" },
    { logo: "/sponsors/wildcup.png", alt: "Wildcup" },
    { logo: "/sponsors/snackzilla.jpeg", alt: "Snackzilla" },
    { logo: "/sponsors/summarise.jpeg", alt: "Summarise" },
    { logo: "/sponsors/blastix.png", alt: "Blastix" },
    { logo: "/sponsors/bluntly.jpg", alt: "Bluntly" },
  ];

  return (
    <div className="px-3 pb-15 md:pb-40 md:px-15">
      <div className="section-title">
        {sectionConfig.showSubtitle && (
          <div className="subtitle-line">
            <span className="line"></span>
            <span className="subtitle-text">{sectionConfig.subtitle}</span>
          </div>
        )}

        <h1
          className="tracking-wide uppercase text-5xl sm:text-6xl md:text-8xl"
          style={{ fontFamily: "'Aquila', serif", fontWeight: 400 }}
        >
          <span className="text-[#FDB931]">SPONSORS</span>
        </h1>
      </div>
      {/* <ComingSoon /> */}
      <div className="relative z-10 w-full flex flex-col gap-4 sm:gap-8 mt-6 md:mt-10">
        <div className="w-full overflow-hidden">
          <div className="flex gap-4 sm:gap-8 w-max animate-[marquee-right_30s_linear_infinite]">
            {[...topSponsors, ...topSponsors].map((s, i) => (
              <div key={i}>
                <SponsorCard logo={s.logo} alt={s.alt} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex gap-4 sm:gap-8 w-max animate-[marquee-left_30s_linear_infinite]">
            {[...bottomSponsors, ...bottomSponsors].map((s, i) => (
              <div key={i}>
                <SponsorCard logo={s.logo} alt={s.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
