import ComingSoon from "../../common/ComingSoon/ComingSoon";
import "../GuestsSpeakers/GuestsSpeakers.css";
import SponsorCard from "./sponsorCard";

const sectionConfig = {
    subtitle: "Backing the Experience",
    showSubtitle: true,
  };

const Sponsors = () => {
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
    <div className="px-3 md:px-15">
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
          {/* <span className="text-white">GUESTS & </span>
          <br /> */}
          <span className="text-[#FDB931]">SPONSORS</span>
        </h1>
      </div>
      <br />
      <br />
      <ComingSoon />
      {/* <div className="relative z-10 w-full flex flex-col gap-8 sm:gap-12">
        <div className="w-full overflow-hidden">
          <div className="flex gap-8 sm:gap-15 w-max animate-[marquee-right_30s_linear_infinite]">
            {[...topSponsors, ...topSponsors].map((s, i) => (
              <div key={i} className="scale-75 sm:scale-100">
                <SponsorCard logo={s.logo} alt={s.alt} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex gap-8 sm:gap-10 w-max animate-[marquee-left_30s_linear_infinite]">
            {[...bottomSponsors, ...bottomSponsors].map((s, i) => (
              <div key={i} className="scale-75 sm:scale-100">
                <SponsorCard logo={s.logo} alt={s.alt} />
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sponsors;
