import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import "./Footer.css";

function Footer() {
  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "Events", href: "#" },
    { label: "Sponsers", href: "#" },
    { label: "Team", href: "#" },
  ];

  return (
    <footer className="footer">
      {/* First: black background section (content) */}
      <div className="footer__black">
        <div className="footer__hero">
          <p className="footer__tagline">
            IIIT NAGPUR'S FLAGSHIP CULTURAL FESTIVAL
          </p>
          <div className="footer__logo">
            <img
              src="/Footer-Content/Abhivyacti image.png"
              alt="Abhivyakti"
              className="footer__logo-img"
            />
            <img
              src="/Footer-Content/2026 image.png"
              alt="2026"
              className="footer__logo-year"
            />
          </div>
          <p className="footer__date">
            19-21 Mar 2026 | THE 7TH EDITION | AN IIITN EVENT
          </p>
        </div>

        <img
          src="/Footer-Content/vector -line.png"
          alt=""
          className="footer__divider"
          aria-hidden="true"
        />
      </div>

      {/* Content overlays carnival image from the top */}
      <div className="footer__carnival-wrapper">
        <div className="footer__carnival" aria-hidden="true">
          <img
            src="/Footer-Content/carnival-bg_2.png"
            alt=""
            className="footer__carnival-img"
          />
        </div>
        <div className="footer__content-wrap">
          <div className="footer__content">
            <div className="footer__address-block">
              <h3 className="footer__heading">ABHIVYAKTI, IIIT NAGPUR</h3>
              <p className="footer__address">
                Survey No. 140, 141/1, Behind Br. Sheshrao Wankhade Shetkari
                Sahkari Soot Girni, Village Waranga, PO Dongargaon (Butibori),
                District Nagpur, Maharashtra – 441108
              </p>
            </div>

            <div className="footer__links-block">
              <div className="footer__links-row">
                <div className="footer__link-group">
                  <h3 className="footer__heading">Quick Links</h3>
                  <nav className="footer__nav" aria-label="Quick links">
                    <ul className="footer__link-list">
                      {quickLinks.map((link) => (
                        <li key={link.label}>
                          <a href={link.href} className="footer__link">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div className="footer__link-group">
                  <h3 className="footer__heading">Contact Us</h3>
                  <ul className="footer__contact-list">
                    <li>
                      <a
                        href="mailto:abhivyakti@iiitn.ac.in"
                        className="footer__link"
                      >
                        abhivyakti@iiitn.ac.in
                      </a>
                    </li>
                    <li>
                      <a href="tel:+917506103104" className="footer__link">
                        +91 7506103104
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="footer__link-group">
                  <h3 className="footer__heading">Follow us</h3>
                  <div className="footer__social">
                    <a
                      href="#"
                      className="footer__social-link"
                      aria-label="Instagram"
                    >
                      <FaInstagram size={24} />
                    </a>
                    <a
                      href="#"
                      className="footer__social-link"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp size={24} />
                    </a>
                    <a
                      href="#"
                      className="footer__social-link"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href="#"
                      className="footer__social-link"
                      aria-label="Twitter"
                    >
                      <FaXTwitter size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="footer__copyright">
            Abhivyakti 2026 @All Rights Reserved
            <br />
            Developed and Managed by{" "}
            <span className="footer__copyright-highlight">Students</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
