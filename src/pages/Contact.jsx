import { useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import ContactHero from "../components/contact/ContactHero";

// Contact data extracted from Footer
const contactData = {
  address: {
    label: "ABHIVYAKTI, IIIT NAGPUR",
    full: "Survey No. 140, 141/1, Behind Br. Sheshrao Wankhade Shetkari Sahkari Soot Girni, Village Waranga, PO Dongargaon (Butibori), District Nagpur, Maharashtra – 441108",
  },
  email: "abhivyakti@iiitn.ac.in",
  phone: "+91 7506103104",
  socialLinks: [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/abhivyakti_iiitn/",
      label: "Instagram",
    },
    {
      icon: FaWhatsapp,
      href: "https://whatsapp.com/channel/0029Vb76UV4It5rz4wHKru17",
      label: "WhatsApp",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/abhivyakti-iiitn/",
      label: "LinkedIn",
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/AIiitn",
      label: "Twitter",
    },
  ],
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Form submitted:", formData);
      setSubmitMessage("Thank you! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitMessage(""), 5000);
    } catch (error) {
      setSubmitMessage("Error submitting form. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <ContactHero />
      <div className="w-full px-60 mx-auto bg-black">
        <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          CONTACT US
        </h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Contact Information */}
          <div className="space-y-8">
            <h2
              style={{ fontFamily: "var(--font-besta-baru)" }}
              className="text-3xl tracking-wider font-bold text-white mb-8"
            >
              GET IN TOUCH
            </h2>

            {/* Address */}
            <div>
              <h3 className="text-sm font-semibold text-yellow-200 mb-2">
                ADDRESS
              </h3>
              <p className="text-white">{contactData.address.label}</p>
              <p className="text-gray-400 text-sm mt-2">
                {contactData.address.full}
              </p>
            </div>

            {/* Email */}
            <div>
              <h3 className="text-sm font-semibold text-yellow-200 mb-2">
                EMAIL
              </h3>
              <a
                href={`mailto:${contactData.email}`}
                className="text-red-500 hover:text-yellow-200"
              >
                {contactData.email}
              </a>
            </div>

            {/* Phone */}
            <div>
              <h3 className="text-sm font-semibold text-yellow-200 mb-2">
                PHONE
              </h3>
              <a
                href={`tel:${contactData.phone}`}
                className="text-red-500 hover:text-yellow-200"
              >
                {contactData.phone}
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-semibold text-yellow-200 mb-4">
                FOLLOW US
              </h3>
              <div className="flex gap-4">
                {contactData.socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-200 transition"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <social.icon size={28} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <h2
              style={{ fontFamily: "var(--font-besta-baru)" }}
              className=" text-3xl font-bold text-white tracking-wider mb-8"
            >
              SEND US A MESSAGE
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-yellow-200 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-red-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-yellow-200 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-red-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-yellow-200 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-red-500"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-yellow-200 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-red-500"
                  placeholder="Tell us more..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white font-semibold py-2 rounded transition"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>

              {submitMessage && (
                <p className="text-center text-green-400 text-sm">
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
