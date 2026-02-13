import { motion } from "framer-motion";
import { itemVariants } from "./developer.motion";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const DeveloperMember = ({
  name,
  designation,
  column,
  image,
  github,
  insta,
  linkedin,
  twitter,
}) => {
  const alignment =
    column === "left"
      ? "items-start text-left"
      : column === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <motion.div
      className={`flex flex-col ${alignment} min-w-45`}
      variants={itemVariants}
    >
      {/* Avatar Box */}
      <div
        className="w-37.5 h-37.5 rounded-[42px] bg-[#3a3a3a]
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.6),0_18px_45px_rgba(0,0,0,0.8)]
        flex items-center justify-center overflow-hidden"
      >
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Name */}
      <p className="mt-4 font-oxanium text-[0.9rem] tracking-[0.08em] text-[#e6e6e6]">
        {name}
      </p>

      {/* Role */}
      {designation && (
        <p className="mt-1 text-sm text-gray-400 tracking-wide">
          {designation}
        </p>
      )}

      {/* Social Icons */}
      <div className="flex gap-3 mt-3 text-gray-400 text-lg">
        {github && (
          <a href={github} target="_blank" rel="noreferrer">
            <FaGithub className="hover:text-white transition" />
          </a>
        )}
        {insta && (
          <a href={insta} target="_blank" rel="noreferrer">
            <FaInstagram className="hover:text-white transition" />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noreferrer">
            <FaLinkedin className="hover:text-white transition" />
          </a>
        )}
        {twitter && (
          <a href={twitter} target="_blank" rel="noreferrer">
            <FaXTwitter className="hover:text-white transition" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default DeveloperMember;
