// components/team/ClubGroup.jsx

import styles from "./team.module.css";

const ClubGroup = ({ title, members }) => {
  // separate leads & co-leads
  const leads = members.filter(m =>
    /^lead$/i.test(m.designation.trim())
  );

  const coLeads = members.filter(m =>
    /co[-\s]?lead/i.test(m.designation)
  );

  // For clubs: pair leads with co-leads in same row
  const combinedLeadCoLeadRows = [];
  for (let i = 0; i < Math.max(leads.length, coLeads.length); i++) {
    const row = [];
    if (leads[i]) row.push(leads[i]);
    if (coLeads[i]) row.push(coLeads[i]);
    if (row.length > 0) combinedLeadCoLeadRows.push(row);
  }

  const renderRow = (row, key) => (
    <div key={key} className={styles.row}>
      {row.map((member, i) => (
        <div
          key={i}
          className={`${styles.member} ${row.length === 1 ? styles.centerSingle : ""
            }`}
        >
          <div className={styles.memberName}>{member.name}</div>
          <div className={styles.memberRole}>{member.designation}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.group}>
      {/* TITLE */}
      <div className={styles.titleRow}>
        <div className={styles.line}></div>
        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.membersWrap}>
        <div className={styles.membersContainer}>
          {/* Lead and Co-Lead in same row for clubs */}
          {combinedLeadCoLeadRows.map((row, i) => renderRow(row, `club-${i}`))}
        </div>
      </div>
    </div>
  );
};

export default ClubGroup;
