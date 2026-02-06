import SponsorCard from "./sponserCard";
import "../GuestsSpeakers/GuestsSpeakers.css";

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
    <div className="relative pb-20 bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[url('/images/background.png')] bg-cover bg-center opacity-100 z-0" />
      <div className="absolute inset-0 bg-linear-to-br from-[rgba(26,10,10,0.95)] to-[rgba(45,24,16,0.95)] z-0" />
      
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 mb-8 sm:mb-12">
        <div className="w-full h-8 sm:h-12 bg-contain bg-no-repeat bg-left" />
      </div>

      <div className="relative z-10 w-full flex flex-col gap-8 sm:gap-12">
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
      </div>
    </div>
  );
};

export default Sponsors;
