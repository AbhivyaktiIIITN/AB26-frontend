// components/team/TeamSection.jsx

import DeveloperGroup from "./DeveloperGroup";
import styles from "./developer.module.css";

const DeveloperSection = () => {
    const developers = [
  {
    name: "Saksham Agrawal",
    designation: "Lead",
    image: "https://assets.2026.abhivyaktifest.in/images/developers/saksham.jpeg",
    github: "https://github.com/sakshamagrawal07/",
    insta: "https://www.instagram.com/saksham_ag07/",
    linkedin: "https://www.linkedin.com/in/agsaksham07/",
    twitter: ""
  },
  
  {
    name: "Yash Verma",
    designation: "Co-Lead",
    image: "https://assets.2026.abhivyaktifest.in/images/developers/yash.jpeg",
    github: "https://github.com/YashVerma-code",
    insta: "https://www.instagram.com/y_a_s_h__v_e_r_m_a_",
    linkedin: "https://www.linkedin.com/in/yash-verma/",
    twitter: ""
  },

  {
    name: "Yogesh V. Bhivsane",
    designation: "Co-Lead",
    image: "https://assets.2026.abhivyaktifest.in/images/developers/yogesh.jpg",
    github: "https://github.com/Yogesh2318",
    insta: "",
    linkedin: "https://www.linkedin.com/in/yogesh-bhivasane-131905289",
    twitter: ""
  },

  {
    name: "Piyush Pal",
    designation: "Designer",
    image: "https://assets.2026.abhivyaktifest.in/images/developers/piyush.webp",
    github: "https://github.com/piyush-141",
    insta: "https://www.instagram.com/piyush.141_/",
    linkedin: "https://www.linkedin.com/in/piyush-pal-1676b0309/",
    twitter: "https://x.com/PiyushPal199877"
  },

  {
    name: "Amulya Yadav",
    designation: "Member",
    image: "https://assets.2026.abhivyaktifest.in/myprofile.png",
    github: "https://github.com/amyverse",
    insta: "https://www.instagram.com/thepricelessyadav",
    linkedin: "https://www.linkedin.com/in/amyverse",
    twitter: ""
  },

  {
    name: "Sambodhi Bhowal",
    designation: "Member",
    image: "https://assets.2026.abhivyaktifest.in/images/developers/sambodhi.webp",
    github: "https://github.com/sambodhi7",
    insta: "",
    linkedin: "https://www.linkedin.com/in/sambodhi7/",
    twitter: ""
  },

  {
    name: "Ojaswi Joshi",
    designation: "Member",
    image: "https://assets.2026.abhivyaktifest.in/images/developers/ojaswi.jpg",
    github: "https://github.com/ojaswijoshi13",
    insta: "https://www.instagram.com/w._.ojaswi",
    linkedin: "https://www.linkedin.com/in/ojaswijoshi13/",
    twitter: "https://x.com/Ojaswi_Joshi13"
  },

  {
    name: "Arnab Mistry",
    designation: "Member",
    image: "https://assets.2026.abhivyaktifest.in/images/developers/arnab.jpg",
    github: "https://github.com/ArnabMistry",
    insta: "https://www.instagram.com/beolzss",
    linkedin: "https://www.linkedin.com/in/arnabmistry",
    twitter: "https://x.com/arnabcore"
  },

  {
    name: "Sparsh Gupta",
    designation: "Member",
    image: "https://assets.2026.abhivyaktifest.in/images/developers/sparsh.jpg",
    github: "https://github.com/SparshGupta78",
    insta: "https://www.instagram.com/theguptasparsh/",
    linkedin: "https://www.linkedin.com/in/sparshgupta78/",
    twitter: "https://x.com/The_sparshgupta"
  },

  {
    name: "Ojas Wane",
    designation: "Member",
    image: "https://assets.2026.abhivyaktifest.in/myprofile.png",
    github: "https://github.com/ojaswane",
    insta: "https://www.instagram.com/ojassss.w/",
    linkedin: "https://www.linkedin.com/in/ojas-wane-35a072323/",
    twitter: "https://x.com/OjasWane"
  },

  {
    name: "Arnav Timble",
    designation: "Member",
    image: "https://assets.2026.abhivyaktifest.in/images/developers/arnav.jpg",
    github: "https://github.com/Arnz18",
    insta: "https://www.instagram.com/lil_arnz/",
    linkedin: "https://www.linkedin.com/in/arnav-timble",
    twitter: "https://x.com/Arrnnzz"
  },

  {
    name: "Satvik Rastogi",
    designation: "Member",
    image: "https://assets.2026.abhivyaktifest.in/images/developers/satvik.jpeg",
    github: "https://github.com/Satvik-art-creator",
    insta: "https://www.instagram.com/satvik.verse/",
    linkedin: "https://www.linkedin.com/in/satvikrastogi077/",
    twitter: ""
  },

  {
    name: "Kartik Magar",
    designation: "Member",
    image: "https://assets.2026.abhivyaktifest.in/images/developers/kartik.webp",
    github: "https://github.com/Kartik-Magar",
    insta: "https://www.instagram.com/kartikmagar_03",
    linkedin: "https://www.linkedin.com/in/kartik-magar-222126333/",
    twitter: ""
  },

];


    return (
        <div className={styles.teamSection}>
            <DeveloperGroup title="DEVELOPERS" members={developers} />
        </div>
    );
};

export default DeveloperSection;
