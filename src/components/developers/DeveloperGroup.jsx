import DeveloperMember from "./DeveloperMember";

const TeamGroup = ({ title, members }) => {
  const leads = members.filter(m =>
    /^lead$/i.test(m.designation.trim())
  );

  const coLeads = members.filter(m =>
    /co[-\s]?lead/i.test(m.designation)
  );

  const others = members.filter(
    m =>
      !/^lead$/i.test(m.designation.trim()) &&
      !/co[-\s]?lead/i.test(m.designation)
  );

  const renderRow = (row, key) => (
    <div
      key={key}
      className="flex justify-center flex-wrap gap-10 mb-5"
    >
      {row.map((member, i) => (
        <div
          key={i}
          className={`text-center flex-1 basis-50 max-w-55 ${row.length === 1 ? "mx-auto" : ""
            }`}
        >
          <DeveloperMember
            name={member.name}
            designation={member.designation}
            image={member.image}
            github={member.github}
            insta={member.insta}
            linkedin={member.linkedin}
            twitter={member.twitter}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full mb-14">
      {/* TITLE */}
      <div className="relative flex justify-center mb-10">
        {/* glowing line */}
        <div className="absolute top-1/2 -translate-y-1/2 w-[calc(100%-160px)] h-0.5 bg-linear-to-r from-transparent via-[#7b0f1f] to-transparent shadow-[0_0_6px_rgba(123,15,31,0.6)]"></div>

        <div className="relative z-10 bg-black px-8 text-2xl md:text-[2.5rem] tracking-[0.19em] font-medium text-neutral-100">
          {title}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col gap-7 w-full max-w-275">
          {renderRow(leads, "leads")}
          {renderRow(coLeads, "co-leads")}
          {renderRow(others, "others")}
        </div>
      </div>
    </div>
  );
};

export default TeamGroup;
