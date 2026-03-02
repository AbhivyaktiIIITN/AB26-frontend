import { motion } from "framer-motion";
import { sectionVariants } from "../team/team.motion";
import styles from "./aboutDescription.module.css";

const DignitariesSection = () => {
  const dignitaries = [
    {
      designation: "COLLEGE DIGNITARIES",
      members: [
        {
          name: "Dr. Prem Lal Patel",
          role: "DIRECTOR",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/director.jpg",
        },
        {
          name: "Shri Kailas N. Dakhale",
          role: "REGISTRAR",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/registrar.jpg",
        },
      ],
    },

    {
      designation: "Associate DEANS",
      members: [
        {
          name: "Dr Tausif Diwan",
          role: "Academic",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/acad.jpg",
        },
        {
          name: "Dr Aatish Daryapurkar",
          role: "Planning & Development",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/pnd.jpg",
        },
        {
          name: "Dr Rashmi Pandhare",
          role: "Research & Development",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/rnd.jpg",
        },
      ],
    },
    {
      designation: "HODs",
      members: [
        {
          name: "Dr. Nishat A. Ansari",
          role: "CSE",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/cs.jpg",
        },
        {
          name: "Dr. Harsh Goud",
          role: "ECE",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/ece.jpg",
        },
        {
          name: "Dr. Prasad V. Joshi",
          role: "Basic Science",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/bs.jpg",
        },
      ],
    },
    {
      designation: "SAC FACULTY COORDINATORS",
      members: [
        {
          name: "Dr. Tapan Kumar Jain",
          role: "SAC Faculty Coordinator",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/sacfc.jpg",
        },
        {
          name: "Dr. Kaushlendra Sharma",
          role: "SAC Faculty Coordinator",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/ta.png",
        },
        {
          name: "Dr. Rahul Semwal",
          role: "SAC Faculty Coordinator",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/ca.png",
        },
        {
          name: "Dr. Rajanish Singh",
          role: "SAC Faculty Coordinator",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/sa.jpg",
        },
      ],
    },
    {
      designation: "SAC FACULTY MEMBERS",
      members: [
        {
          name: "Dr. Preeti",
          role: "SAC Faculty Member",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/preeti.jpg",
        },
        {
          name: "Dr.Madhuri Tayade",
          role: "SAC Faculty Member",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/madhuri.png",
        },
        {
          name: "Mrs. Ruchira Nitin Selote",
          role: "SAC Faculty Member",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/ruchira.png",
        },
        {
          name: "Mrs. Varsha Kushwah",
          role: "SAC Faculty Member",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/varsha.png",
        },
        {
          name: "Mr. Vikrant Dhenge",
          role: "SAC Faculty Member",
          photo: "https://assets.2026.abhivyaktifest.in/clgdig/vikrant.jpg",
        },
      ],
    },
  ];

  return (
    <motion.div
      className={styles.section}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Dignitaries Grid */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col gap-12 sm:gap-16 md:gap-20 items-center">
        {dignitaries.map((section, index) => (
          <motion.div
            key={index}
            className={styles.group}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {section.designation && (
              <div className={styles.titleRow}>
                <span className={styles.line} />
                <h3 className={styles.title}>{section.designation}</h3>
              </div>
            )}

            {/* Members Grid */}
            <div
              className="grid gap-8 md:gap-10 w-full justify-items-center"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              }}
            >
              {section.members.map((member, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 text-center"
                >
                  <div
                    className="rounded overflow-hidden border-2 border-red-700/60 bg-gray-900 flex items-center justify-center"
                    style={{ width: "200px", height: "250px" }}
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      className="text-base md:text-lg font-medium text-gray-200"
                      style={{ fontFamily: "Gabarito, system-ui, sans-serif" }}
                    >
                      {member.name}
                    </div>
                    <div
                      className="text-sm md:text-base font-normal text-gray-400"
                      style={{
                        fontFamily: "Gabarito, system-ui, sans-serif",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DignitariesSection;
