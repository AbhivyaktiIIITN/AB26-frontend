// components/team/TeamSection.jsx

import TeamGroup from "./TeamGroup";
import styles from "./team.module.css";

const TeamSection = () => {

  const secretaries = [
    { name: "Sumanth Kotikalapudi", designation: "General Secretary" },
    { name: "Aditya Shrivastava", designation: "Cultural Secretary" },
    { name: "Akshat Gupta", designation: "Finance Secretary" },
    { name: "Shivang Tonde", designation: "Technical Secretary" },
    { name: "Saad Khwaja", designation: "PR Secretary" },
    { name: "Saloni Dadwe", designation: "PR Secretary" },
    { name: "Lohith Reddy", designation: "Sports Secretary" },
  ];

  const marketingTeam = [
    { name: "Sanskar Yede", designation: "Lead" },
    { name: "Aaditya Dabhadkar", designation: "Co-Lead" },
  ];

  const corporateTeam = [
    { name: "Arkin Singh", designation: "Lead" },
    { name: "Ardhish Patel", designation: "Co-Lead" },
    { name: "Rahul Soni", designation: "Co-Lead" },
  ];

  const outreachTeam = [
    { name: "Adamya Jain", designation: "Lead" },
    { name: "Rishu Roy", designation: "Co-Lead" },
  ];

  const artishtManagementTeam = [
    { name: "Prakhar Beniwal", designation: "Lead" },
  ];

  const hospitalityTeam = [
    { name: "Vaibhav Chouksey", designation: "Lead" },
    { name: "Raghav Kankane", designation: "Co-Lead" },
    { name: "Vageesa Sarma", designation: "Co-Lead" },
  ]

  const mediaTeam = [
    { name: "Uchit Rajani", designation: "Lead" },
    { name: "Aman Kanaujiya", designation: "Co-Lead" },
  ]

  const webdevTeam = [
    { name: "Saksham Agrawal", designation: "Lead" },
    { name: "Yash Verma", designation: "Co-Lead" },
    { name: "Yogesh Bhivsane", designation: "Co-Lead" },
  ]

  const appdevTeam = [
    { name: "Jaivardhan Bhola", designation: "Lead" },
  ]

  const decorTeam = [
    { name: "Parth Chakerwarti", designation: "Lead" },
    { name: "Harsh Ramteke", designation: "Co-Lead" },
  ]

  const contentAnchoringTeam = [
    { name: "Koustubh Gadekar", designation: "Lead" },
    { name: "Subroto Roy", designation: "Co-Lead" },
  ]

  const stageTeam = [
    { name: "Rhythm Agrawal", designation: "Lead" },
    { name: "Keshav Tak", designation: "Co-Lead" },
    { name: "Shreyas Khare", designation: "Co-Lead" },
  ]

  const stallsTeam = [
    { name: "Kawyanshu Raj", designation: "Lead" },
    { name: "Rishi Gurjar", designation: "Co-Lead" },
    { name: "Jayant Datta", designation: "Co-Lead" },
  ]

  const discoTeam = [
    { name: "Nikhil Raj", designation: "Lead" },
    { name: "Aniket Gautam", designation: "Co-Lead" },
    { name: "Panchagnula Rama Skandha Bhardwaj", designation: "Co-Lead" },
  ]

  const multimediaTeam = [
    { name: "Sanket Choudhary", designation: "Lead" },
    { name: "Ishaan Gupta", designation: "Lead" },
    { name: "Aditya Bagde", designation: "Co-Lead" },
    { name: "Ashutosh Gedam", designation: "Co-Lead" },
    { name: "Tanishq Chandra", designation: "Co-Lead" },
    { name: "Debasish Mondal", designation: "Co-Lead" },
  ]

  const emLogiOpsTeam = [
    { name: "Sandesh Charhate", designation: "Lead" },
    { name: "Abhiram Golem", designation: "Lead" },
    { name: "Jayraj Vikhe Patil", designation: "Lead" },
    { name: "Tanmay Dixit", designation: "Co-Lead" },
    { name: "Suraj Bhan", designation: "Co-Lead" },
  ]

  return (
    <div className={styles.teamSection}>
      <TeamGroup title="SECRETARIES" members={secretaries} />
      <TeamGroup title="MARKETING TEAM" members={marketingTeam} />
      <TeamGroup title="CORPORATE TEAM" members={corporateTeam} />
      <TeamGroup title="OUTREACH TEAM" members={outreachTeam} />
      <TeamGroup title="ARTISHT MANAGEMENT" members={artishtManagementTeam} />
      <TeamGroup title="HOSPITALITY TEAM" members={hospitalityTeam} />
      <TeamGroup title="MEDIA TEAM" members={mediaTeam} />
      <TeamGroup title="WEB DEVELOPMENT TEAM" members={webdevTeam} />
      <TeamGroup title="APP DEVELOPMENT TEAM" members={appdevTeam} />
      <TeamGroup title="DECOR TEAM" members={decorTeam} />
      <TeamGroup title="CONTENT & ANCHORING TEAM" members={contentAnchoringTeam} />
      <TeamGroup title="STAGE TEAM" members={stageTeam} />
      <TeamGroup title="STALLS TEAM" members={stallsTeam} />
      <TeamGroup title="DISCO TEAM" members={discoTeam} />
      <TeamGroup title="MULTIMEDIA TEAM" members={multimediaTeam} />
      <TeamGroup title="EM-LOGISTICS & OPS TEAM" members={emLogiOpsTeam} />
    </div>
  );
};

export default TeamSection;
