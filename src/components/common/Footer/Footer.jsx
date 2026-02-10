import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Sponsers", href: "/sponsors" },
    { label: "Team", href: "/teams" },
  ];

  return (
    <footer className="font-[Gabarito] text-white w-full flex flex-col overflow-x-hidden">
      {/* First: black background section */}
      <div className="bg-black px-4 sm:px-5 md:px-8 lg:px-12 xl:px-18 pb-5 sm:pb-0">
        <div className="flex flex-col items-start gap-5 sm:gap-7 md:gap-8 lg:gap-9 xl:gap-10 pt-9 sm:pt-12 md:pt-14 max-w-306.75 ml-[5%]">
          <p className="text-sm sm:text-base md:text-lg font-normal leading-tight tracking-widest">
            IIIT NAGPUR'S FLAGSHIP CULTURAL FESTIVAL
          </p>
          <div className="flex items-end justify-start lg:justify-center gap-2.5 sm:gap-4.5 md:gap-5 lg:gap-9 w-full max-w-306.75 min-h-20 sm:min-h-24 md:min-h-25 lg:min-h-28 xl:min-h-30">
            <img
              src="/Footer-Content/Abhivyacti image.png"
              alt="Abhivyakti"
              className="max-w-[55%] sm:max-w-full h-auto max-h-16 sm:max-h-20 md:max-h-21 lg:max-h-22 xl:max-h-37 object-contain shrink-0"
            />
            <img
              src="/Footer-Content/2026 image.png"
              alt="2026"
              className="h-auto max-h-11 md:max-h-12 xl:max-h-13 w-auto max-w-12 sm:max-w-none object-contain self-end shrink-0"
            />
          </div>
          <p className="text-sm sm:text-base md:text-lg font-normal leading-tight tracking-widest">
            19-21 Mar 2026 <span className="text-yellow-500">|</span> THE 7TH EDITION <span className="text-yellow-500">|</span> AN IIITN EVENT
          </p>
        </div>

        <img
          src="/Footer-Content/vector -line.png"
          alt=""
          className="w-[90%] h-auto object-contain mx-[5%] mt-7 sm:mt-9 block shrink-0"
          aria-hidden="true"
        />
      </div>

      {/* Content overlays carnival image from the top */}
      <div className="relative  w-full h-[72vh] min-h-95 sm:min-h-105 md:min-h-120 overflow-hidden">
        <div className="absolute inset-0 leading-none" aria-hidden="true">
          <img
            src="/Footer-Content/carnival-bg_2.png"
            alt=""
            className="size-full object-cover object-center"
          />
        </div>
        <div className="absolute bg-linear-to-b from-black to-20% to-transparent inset-x-0 top-0 w-full px-4 sm:px-5 md:px-8 lg:px-12 xl:px-26 py-4 sm:py-5 md:py-9 lg:py-11 xl:py-12 z-1 pointer-events-none flex flex-col justify-start items-stretch h-full overflow-y-auto overflow-x-hidden">
          <div className="pointer-events-auto flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-10 xl:gap-22 max-w-306.75 items-start mx-auto w-full">
            <div className="flex flex-col w-full md:w-auto md:max-w-95 xl:w-109 shrink-0">
              <h3 className="text-sm sm:text-base md:text-lg font-normal leading-tight tracking-widest min-h-7">
                ABHIVYAKTI, IIIT NAGPUR
              </h3>
              <p className="text-2.5 sm:text-2.75 md:text-xs font-normal leading-tight sm:leading-snug tracking-widest text-neutral-300 mt-2 max-w-full md:max-w-109">
                Survey No. 140, 141/1, Behind Br. Sheshrao Wankhade Shetkari
                Sahkari Soot Girni, Village Waranga, PO Dongargaon (Butibori),
                District Nagpur, Maharashtra – 441108
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-5 md:gap-8 lg:gap-10 min-w-0">
              <div className="flex flex-col md:flex-row gap-5 md:gap-7 lg:gap-10 flex-wrap">
                <div className="flex flex-col gap-3.5 w-full md:w-auto md:min-w-35 xl:w-32">
                  <h3 className="text-sm sm:text-base md:text-lg font-normal leading-tight tracking-widest min-h-7">
                    Quick Links
                  </h3>
                  <nav aria-label="Quick links">
                    <ul className="flex flex-col gap-2">
                      {quickLinks.map((link) => (
                        <li key={link.label}>
                          <Link
                            to={link.href}
                            className="relative group inline-block text-xs sm:text-sm md:text-base font-normal leading-tight tracking-widest text-neutral-300 no-underline transition-colors duration-300 hover:text-white"
                          >
                            {link.label}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 ease-out group-hover:w-full"></span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div className="flex flex-col gap-3.5 w-full md:w-auto md:min-w-35 xl:w-47">
                  <h3 className="text-sm sm:text-base md:text-lg font-normal leading-tight tracking-widest min-h-7">
                    Contact Us
                  </h3>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <a
                        href="mailto:abhivyakti@iiitn.ac.in"
                        className="text-xs sm:text-sm md:text-base font-normal leading-tight tracking-widest text-neutral-300 no-underline transition-colors duration-200 hover:text-white"
                      >
                        abhivyakti@iiitn.ac.in
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+917506103104"
                        className="text-xs sm:text-sm md:text-base font-normal leading-tight tracking-widest text-neutral-300 no-underline transition-colors duration-200 hover:text-white"
                      >
                        +91 7506103104
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3.5 w-full md:w-auto md:min-w-35 xl:w-47">
                  <h3 className="text-sm sm:text-base md:text-lg font-normal leading-tight tracking-widest min-h-7">
                    Follow us
                  </h3>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/abhivyakti_iiitn/"
                      className="inline-flex items-center justify-center text-neutral-300 transition-colors duration-200 hover:text-white"
                      aria-label="Instagram"
                      target="_blank"
                    >
                      <FaInstagram size={24} />
                    </a>
                    <a
                      href="https://whatsapp.com/channel/0029Vb76UV4It5rz4wHKru17"
                      className="inline-flex items-center justify-center text-neutral-300 transition-colors duration-200 hover:text-white"
                      aria-label="WhatsApp"
                      target="_blank"
                    >
                      <FaWhatsapp size={24} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/abhivyakti-iiitn/"
                      className="inline-flex items-center justify-center text-neutral-300 transition-colors duration-200 hover:text-white"
                      aria-label="LinkedIn"
                      target="_blank"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href="https://x.com/AIiitn"
                      className="inline-flex items-center justify-center text-neutral-300 transition-colors duration-200 hover:text-white"
                      aria-label="Twitter"
                      target="_blank"
                    >
                      <FaXTwitter size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="pointer-events-auto text-xs sm:text-sm font-normal leading-tight text-white/80  sm:mt-[5%] text-left sm:text-center">
            Abhivyakti 2026 @All Rights Reserved
            <br />
            Developed and Managed by{" "}
            <Link
              to={"/developers"}
              className="bg-linear-to-r from-rose-600 to-rose-950 bg-clip-text text-transparent cursor-pointer"
            >
              Students
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
