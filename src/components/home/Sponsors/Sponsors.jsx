import ComingSoon from "../../common/ComingSoon/ComingSoon";
import "../GuestsSpeakers/GuestsSpeakers.css";
import SponsorCard from "./sponsorCard";

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
    <div className="relative pb-20">
      <h1
        className="tracking-wide uppercase ml-20 text-5xl sm:text-6xl md:text-8xl text-[#FDB931]"
        style={{ fontFamily: "'Adqila', serif", fontWeight: 400 }}
      >SPONSORS</h1>
      <br /><br />
      <ComingSoon/>
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
