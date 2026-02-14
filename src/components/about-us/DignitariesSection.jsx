import { motion } from "framer-motion";
import { itemVariants, sectionVariants } from "../team/team.motion";

const DignitariesSection = () => {
  const dignitaries = [
    {
      designation: "",
      members: [
        {
          name: "Dr. Prem Lal Patel",
          role: "DIRECTOR",
          photo: "/clgdig/director.jpg",
        },
        {
          name: "Shri Kailas N. Dakhale",
          role: "REGISTRAR",
          photo: "/clgdig/registrar.jpg",
        },
      ],
    },

    {
      designation: "Associate DEANS",
      members: [
        {
          name: "Dr Tausif Diwan",
          role: "Academic",
          photo: "/clgdig/acad.jpg",
        },
        {
          name: "Dr Aatish Daryapurkar",
          role: "Planning & Development",
          photo: "/clgdig/pnd.jpg",
        },
        {
          name: "Dr Rashmi Pandhare",
          role: "Research & Development",
          photo: "/clgdig/rnd.jpg",
        },
      ],
    },
    {
      designation: "HODs",
      members: [
        {
          name: "Dr. Nishat A. Ansari",
          role: "CSE",
          photo: "/clgdig/cs.jpg",
        },
        {
          name: "Dr. Harsh Goud",
          role: "ECE",
          photo: "/clgdig/ece.jpg",
        },
        {
          name: "Dr. Prasad V. Joshi",
          role: "Basic Science",
          photo: "/clgdig/bs.jpg",
        },
      ],
    },
    {
      designation: "SAC FACULTY COORDINATORS",
      members: [
        {
          name: "Dr. Tapan Kumar Jain",
          role: "SAC Faculty Coordinator",
          photo: "/clgdig/sacfc.jpg",
        },
        {
          name: "Dr. Kaushlendra Sharma",
          role: "Technical Activities",
          photo: "/clgdig/ta.png",
        },
        {
          name: "Dr. Rahul Semwal",
          role: "Cultural Activities",
          photo: "/clgdig/ca.png",
        },
        {
          name: "Dr. Rajanish Singh",
          role: "Sports Activities",
          photo: "/clgdig/sa.jpg",
        },
      ],
    },
  ];

  return (
    <motion.div
      className="w-full bg-black py-16 flex flex-col items-center gap-10"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Title Row */}
      <div className="relative w-full flex justify-center mb-10">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[calc(100%-160px)] h-0.5"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(123, 15, 31, 0.9) 20%, rgba(123, 15, 31, 1) 50%, rgba(123, 15, 31, 0.9) 80%, transparent 100%)",
            boxShadow: "0 0 6px rgba(123, 15, 31, 0.6)",
          }}
        />
        <h2
          className="text-4xl font-medium text-gray-100 bg-black px-8 z-10"
          style={{
            fontFamily: "var(--font-besta-baru)",
            letterSpacing: "0.19em",
          }}
        >
          COLLEGE DIGNITARIES
        </h2>
      </div>

      {/* Dignitaries Grid */}
      <div className="w-full max-w-6xl px-6 flex flex-col gap-32">
        {dignitaries.map((section, index) => (
          <motion.div
            key={index}
            className="w-full flex flex-col items-center gap-6"
            variants={itemVariants}
          >
            {section.designation && (
              <div className="relative w-full flex justify-center mb-6">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-[calc(100%-160px)] h-0.5"
                  style={{
                    background:
                      "linear-gradient(to right, transparent 0%, rgba(123, 15, 31, 0.9) 20%, rgba(123, 15, 31, 1) 50%, rgba(123, 15, 31, 0.9) 80%, transparent 100%)",
                    boxShadow: "0 0 6px rgba(123, 15, 31, 0.6)",
                  }}
                />
                <div
                  className="text-2xl font-medium text-gray-100 bg-black px-6 z-10 uppercase"
                  style={{
                    fontFamily: "var(--font-besta-baru)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {section.designation}
                </div>
              </div>
            )}

            {/* Members Grid */}
            <div
              className="grid gap-10 w-full justify-items-center"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              }}
            >
              {section.members.map((member, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-6 text-center"
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
                      className="text-xl font-medium text-gray-200"
                      style={{ fontFamily: "Gabarito, system-ui, sans-serif" }}
                    >
                      {member.name}
                    </div>
                    <div
                      className="text-sm font-normal text-gray-400"
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
