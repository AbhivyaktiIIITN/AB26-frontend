// components/team/TeamGroup.jsx

import styles from "./team.module.css";

const chunk = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, size + i));
  }
  return result;
};

const TeamGroup = ({ title, members }) => {
  // separate leads & others
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


  const leadRows = chunk(leads, 2);
  const coLeadRows = chunk(coLeads, 2);
  const otherRows = chunk(others, 2);


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
          {/* {leadRows.map((row, i) => renderRow(row, `lead-${i}`))}
          {otherRows.map((row, i) => renderRow(row, `other-${i}`))} */}

          {/* Leads first */}
          {leadRows.map((row, i) => renderRow(row, `lead-${i}`))}

          {/* Co-Leads below */}
          {coLeadRows.map((row, i) => renderRow(row, `co-${i}`))}

          {/* Others if any */}
          {otherRows.map((row, i) => renderRow(row, `other-${i}`))}

        </div>
      </div>
    </div>
  );
};

export default TeamGroup;
