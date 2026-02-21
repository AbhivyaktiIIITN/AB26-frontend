// components/team/TeamSection.jsx

import TeamGroup from "./TeamGroup";
import ClubGroup from "./ClubGroup";
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

  const artistManagementTeam = [
    { name: "Prakhar Beniwal", designation: "Lead" },
  ];

  const hospitalityTeam = [
    { name: "Vaibhav Chouksey", designation: "Lead" },
    { name: "Raghav Kankane", designation: "Co-Lead" },
    { name: "Vageesa Sarma", designation: "Co-Lead" },
  ];

  const mediaTeam = [
    { name: "Uchit Rajani", designation: "Lead" },
    { name: "Aman Kanaujiya", designation: "Co-Lead" },
  ];

  const webdevTeam = [
    { name: "Saksham Agrawal", designation: "Lead" },
    { name: "Yash Verma", designation: "Co-Lead" },
    { name: "Yogesh Bhivsane", designation: "Co-Lead" },
  ];

  const appdevTeam = [{ name: "Jaivardhan Bhola", designation: "Lead" }];

  const decorTeam = [
    { name: "Parth Chakerwarti", designation: "Lead" },
    { name: "Harsh Ramteke", designation: "Co-Lead" },
  ];

  const contentAnchoringTeam = [
    { name: "Koustubh Gadekar", designation: "Lead" },
    { name: "Subroto Roy", designation: "Co-Lead" },
  ];

  const stageTeam = [
    { name: "Rhythm Agrawal", designation: "Lead" },
    { name: "Keshav Tak", designation: "Co-Lead" },
    { name: "Shreyas Khare", designation: "Co-Lead" },
  ];

  const stallsTeam = [
    { name: "Kawyanshu Raj", designation: "Lead" },
    { name: "Rishi Gurjar", designation: "Co-Lead" },
    { name: "Jayant Datta", designation: "Co-Lead" },
  ];

  const discoTeam = [
    { name: "Nikhil Raj", designation: "Lead" },
    { name: "Aniket Gautam", designation: "Co-Lead" },
    { name: "Panchagnula Rama Skandha Bhardwaj", designation: "Co-Lead" },
  ];

  const multimediaTeam = [
    { name: "Sanket Choudhary", designation: "Lead" },
    { name: "Ishaan Gupta", designation: "Lead" },
    { name: "Aditya Bagde", designation: "Co-Lead" },
    { name: "Ashutosh Gedam", designation: "Co-Lead" },
    { name: "Tanishq Chandra", designation: "Co-Lead" },
    { name: "Debasish Mondal", designation: "Co-Lead" },
  ];

  const emLogiOpsTeam = [
    { name: "Sandesh Charhate", designation: "Lead" },
    // { name: "Abhiram Golem", designation: "Lead" },
    { name: "Jayraj Vikhe Patil", designation: "Lead" },
    { name: "Tanmay Dixit", designation: "Co-Lead" },
    { name: "Suraj Bhan", designation: "Co-Lead" },
  ];

  const dotSlashTeam = [
    { name: "Shubham Jee Shrivastava", designation: "Lead" },
    { name: "Sambodhi Bhowal", designation: "Co-Lead" },
  ];

  const elevateTeam = [
    { name: "Ayush Kathal", designation: "Lead" },
    { name: "Swapnil Jain", designation: "Co-Lead" },
  ];

  const strokesTeam = [
    { name: "Digvijay Pande", designation: "Lead" },
    { name: "Piyush Pal", designation: "Co-Lead" },
  ];

  const ioticsTeam = [
    { name: "Aditya Gupta", designation: "Lead" },
    { name: "Narendra Andhale", designation: "Co-Lead" },
  ];

  const dimensionsTeam = [
    { name: "Romit Raj Bind", designation: "Lead" },
    { name: "Yash Sonaniya", designation: "Co-Lead" },
  ];

  const crisprTeam = [
    { name: "Kunal Mohapatra", designation: "Lead" },
    { name: "Soham Pawar", designation: "Co-Lead" },
  ];

  const crescendoTeam = [
    { name: "Prathamesh Kale", designation: "Lead" },
    { name: "A.Nithin Karthikeyan", designation: "Co-Lead" },
  ];

  const dtaraxiaTeam = [
    { name: "Varshith Yakkala", designation: "Lead" },
    { name: "Sanskruti Malani", designation: "Co-Lead" },
  ];

  const estoriaTeam = [
    { name: "Mayank Meharchandani", designation: "Lead" },
    { name: "Pranay Chiraman", designation: "Co-Lead" },
  ];

  const oratorTeam = [{ name: "Shreyam Prashar", designation: "Co-Lead" }];

  const probeTeam = [
    { name: "Manu Shrivastava", designation: "Lead" },
    { name: "Akshit Yadav", designation: "Co-Lead" },
  ];

  const avalokTeam = [
    { name: "Debapallab Das", designation: "Lead" },
    { name: "Tanishq Kamble", designation: "Co-Lead" },
  ];

  return (
    <div className={styles.teamSection}>
      <TeamGroup title="SECRETARIES" members={secretaries} />
      <TeamGroup title="MARKETING" members={marketingTeam} />
      <TeamGroup title="CORPORATE" members={corporateTeam} />
      <TeamGroup title="OUTREACH" members={outreachTeam} />
      <TeamGroup title="ARTIST MANAGEMENT" members={artistManagementTeam} />
      <TeamGroup title="HOSPITALITY" members={hospitalityTeam} />
      <TeamGroup title="MEDIA" members={mediaTeam} />
      <TeamGroup title="WEB DEVELOPMENT" members={webdevTeam} />
      <TeamGroup title="APP DEVELOPMENT" members={appdevTeam} />
      <TeamGroup title="DECOR" members={decorTeam} />
      <TeamGroup title="CONTENT & ANCHORING" members={contentAnchoringTeam} />
      <TeamGroup title="STAGE" members={stageTeam} />
      <TeamGroup title="STALLS" members={stallsTeam} />
      <TeamGroup title="DISCO" members={discoTeam} />
      <TeamGroup title="MULTIMEDIA" members={multimediaTeam} />
      <TeamGroup title="EM-LOGI & OPS TEAM" members={emLogiOpsTeam} />
      <ClubGroup title="DOT SLASH" members={dotSlashTeam} />
      <ClubGroup title="ELEVATE" members={elevateTeam} />
      <ClubGroup title="STROKES" members={strokesTeam} />
      <ClubGroup title="IOTICS" members={ioticsTeam} />
      <ClubGroup title="DIMENSIONS" members={dimensionsTeam} />
      <ClubGroup title="CRISPR" members={crisprTeam} />
      <ClubGroup title="CRESCENDO" members={crescendoTeam} />
      <ClubGroup title="D-TARAXIA" members={dtaraxiaTeam} />
      <ClubGroup title="Estória" members={estoriaTeam} />
      <ClubGroup title="ORATOR" members={oratorTeam} />
      <ClubGroup title="PROBE" members={probeTeam} />
      <ClubGroup title="AVALOK" members={avalokTeam} />
    </div>
  );
};

export default TeamSection;
