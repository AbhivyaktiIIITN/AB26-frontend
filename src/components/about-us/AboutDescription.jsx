import { motion } from "framer-motion";
import styles from "./aboutDescription.module.css";
console.log(styles); // Debug: Check if styles are loaded
import { sectionVariants, itemVariants } from "../team/team.motion";

const AboutDescription = () => {
    const sections = [
        {
            title: "ABOUT ABHIVYAKTI",
            content: "Abhivyakti, the annual cultural fest of IIIT Nagpur, is a grand celebration of expression and artistry. It serves as a dynamic platform for students to showcase their talents and foster collaboration, transforming the campus into a vibrant hub of creative brilliance. The festival features an immersive blend of music, dance, and theatre alongside signature pro-shows and stunning art exhibitions. Every segment is designed to inspire and entertain, inviting the community to explore their potential within a high-energy carnival atmosphere."
        },
        {
            title: "MISSION AND VISION",
            content: "In an age of automation, the human drive for creativity remains irreplaceable. While machines optimize processes, they cannot replicate the instinct to imagine and express. Creativity is the spark that defines our identity, pushing us to dream beyond routine and reach for higher aspirations. Our vision is to nurture this spirit by building an ecosystem where students and mentors converge to empower ideas. We aim to cultivate talent for a future where human potential shines with purpose. Abhivyakti 2026 stands as the ultimate expression of this mission, reaching heights once thought unattainable."
        },
        {
            title: "ABOUT IIIT NAGPUR",
            content: "The Indian Institute of Information Technology, Nagpur (IIITN), established in 2016, is an Institution of National Importance under a Public-Private Partnership involving the Ministry of Education, the Government of Maharashtra, and Tata Consultancy Services. Operating from its permanent campus at Waranga, IIITN is dedicated to advancing education and research in the digital era. Over the past nine years, the institute has consistently worked to enrich the academic landscape and contribute significantly to community outreach at the national level."
        },
        {
            title: "ABOUT THEME",
            content: "The Enchanted Circus is an invitation to leave the ordinary behind and step into a realm where the impossible feels like home. It is a celebration of the whimsical and the purely joyful, transforming our campus into a spectacle of golden lights and laughter. At its heart, this theme is a tribute to that breathtaking moment of wonder when art and melody fill the night. We are creating a Midnight Carnival wrapped in velvet and stardust, blending vintage charm with surreal magic. In this arena, there are no spectators, only participants in the magic. The Enchanted Circus is your playground, a reminder that when we come together, we create a spectacle that lingers in the heart long after the curtains fall."
        }
    ];

    return (
        <div className={styles.section}>
            {sections.map((section, index) => (
                <motion.div
                    key={index}
                    className={styles.group}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Title Row */}
                    <div className={styles.titleRow}>
                        <span className={styles.line} />
                        <h2 className={styles.title}>{section.title}</h2>
                    </div>

                    {/* Description Text */}
                    <motion.div className={styles.descriptionWrap} variants={itemVariants}>
                        <p className={styles.description}>
                            {section.content}
                        </p>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

export default AboutDescription;
