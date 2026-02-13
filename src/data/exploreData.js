// src/data/exploreData.js

export const exploreData = {
  proShows: [
    {
      id: "proshow-1",
      artistName: "Artist Name",
      genre: "Genre",
      description:
        "A captivating live experience with [Artist Name], known for [distinct style/strength—e.g., soulful vocals, electrifying performances]. Witness an evening filled with [emotion / energy / artistry] as music comes alive on stage. A captivating live experience with [Artist Name], known for [distinct style/strength—e.g., soulful vocals, electrifying performances]. Witness an evening filled with [emotion / energy / artistry] as music comes alive on stage.",
      date: "19/03/26",
      venue: "Amphitheatre",
      time: "7:30 PM",
      image: "https://assets.2026.abhivyaktifest.in/images/explore/shawn.webp",
      layout: "image-left",
      buyLink: "/passes/proshow-1",
    },
    {
      id: "proshow-2",
      artistName: "Artist Name",
      genre: "Genre",
      description:
        "A captivating live experience with [Artist Name], known for [distinct style/strength—e.g., soulful vocals, electrifying performances]. Witness an evening filled with [emotion / energy / artistry] as music comes alive on stage. A captivating live experience with [Artist Name], known for [distinct style/strength—e.g., soulful vocals, electrifying performances]. Witness an evening filled with [emotion / energy / artistry] as music comes alive on stage.",
      date: "20/03/26",
      venue: "Main Stage",
      time: "8:00 PM",
      image: "https://assets.2026.abhivyaktifest.in/images/explore/shawn.webp",
      layout: "image-right",
      buyLink: "/passes/proshow-2",
    },
  ],

  competitions: [
    {
      id: "fine_arts",
      events: [
        {
          id: "fine_arts_1",
          name: "Rangreza",
          organizers: "Strokes",
          type: "Art Showcase",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/strokes.jpg",
          
          description: [
            "Immerse yourself in the world of imagination and expression with RangReza, the premier visual arts showcase of the fest. This event celebrates creativity in its purest form through strokes, textures, colors, and concepts that speak louder than words.",
            "Participants will first submit their artworks online through Unstop, where the finest pieces will be selected for the on-campus exhibition, presented in a curated museum-style setup. The event aims to bring together artists from across the nation to share perspectives, provoke thought, and celebrate the visual language of art.",
            "Let your canvas be your voice, express ideas, emotions, and visions that inspire and redefine creative boundaries.",
          ],

          prizes: {
            prize_pool: "₹20,000",
            first: "₹10,000",
            second: "₹5,000",
            third: "₹5,000",
          },

          unstop_link: "https://unstop.com/events/rangreza-abhivyakti-2026-iiitn-1636753",

          stages: [
            {
              id: "round_1",
              title: "Round 1: Nationwide Online Screening",
              start_date: "1st January 2026",
              end_date: "5th March 2026",

              description:
                "Participants must submit a high-quality image (or series) of their artwork along with an artist statement explaining the concept behind it. This round will determine the final showcase participants whose works will be displayed in the on-campus art gallery during the fest.",

              submission_requirements: {
                rules: [
                  "Each participant must submit one original artwork (painting, digital art, illustration, mixed media, sculpture, or photograph).",
                  "Plagiarism or use of AI-generated work is strictly prohibited.",
                  "Artwork must adhere to the given theme (if announced).",
                ],
                mandatory_details: [
                  "Artwork Title",
                  "Medium Used",
                  "Dimensions (if physical artwork)",
                  "Artist Statement (150–200 words) explaining the idea, theme, and creative process.",
                ],
                file_format:
                  "High-resolution JPEG/PNG or photograph of physical artwork",
                pdf_upload_instruction:
                  'Upload a PDF titled: "ParticipantName_CollegeName_Rangreza.pdf" containing the Unstop submission link or Drive link (with view access) to the artwork and artist statement.',
              },
            },
            {
              id: "round_2",
              title: "Round 2: On-Campus Showcase",
              start_date: "26th March 2026",
              end_date: "28th March 2026",

              description:
                "Shortlisted participants from Round 1 will have their artworks displayed in a curated museum-style exhibition during the cultural fest. Final winners will be declared after jury evaluation.",

              submission_requirements: {
                rules: [
                  "Selected participants must bring their original physical artwork (or a high-quality print if digital).",
                  "Dimensions must not exceed 3ft x 3ft unless pre-approved by the organizing committee.",
                  "Art must be ready for display (framed, mounted, or appropriately presented).",
                  "Participants must carry valid Institute ID cards.",
                ],
                mandatory_details: [
                  "Artwork Title",
                  "Artist Name",
                  "College Name",
                  "Medium & Dimensions",
                  "Artist Statement (under 100 words)",
                ],
              },
            },
          ],

          rules: [
            "Only Undergraduate and Postgraduate students are eligible to participate.",
            "Each participant can submit only one entry.",
            "The same artwork must be presented in both rounds (minor refinements allowed).",
            "Collaborative artworks are not allowed (solo entries only).",
            "Offensive, obscene, or plagiarized content will result in disqualification.",
            "The organizing committee reserves the right to reject entries that do not meet quality or format requirements.",
            "Judges’ decisions will be final and binding.",
            "Any disputes will be resolved at the discretion of the Organizing Committee (OC).",
            "Participants must ensure their artwork is safe for display and does not cause harm to property or audience.",
          ],

          contact: {
            name: "Abhiraj Thote",
            email: "bt24ece021@iiit.ac.in",
            phone: "8446640324",
          },
        },
      ],
    },
    {
      id: "dance",
      events: [
        {
          id: "dance_1",
          name: "Show Stopper",
          organizers: "D-Traxia",
          type: "Solo Dance",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/dtaraxia.jpg",

          description: [
            "Step into the rhythm and own the stage — Showstopper is your chance to shine where every beat, every move, and every expression tells your story. This competition celebrates the art of solo dancing, bringing together performers who can mesmerize audiences with their grace, energy, and creativity.",
            "From classical to contemporary, hip-hop to freestyle, this stage welcomes all dance styles. It’s not just about technique — it’s about passion, storytelling, and the connection you create with the audience.",
            "So, lace up, feel the music, and be the showstopper who turns the spotlight into a moment of pure magic!",
          ],

          prizes: {
            prize_pool: "₹15,000",
            first: "₹10,000",
            second: "₹5,000",
            third: "",
          },

          unstop_link: "https://unstop.com/events/showstopper-solo-dance-competition-abhivyakti-2026-iiitn-1636728",

          stages: [
            {
              id: "round_1",
              title: "Round 1: Nationwide Online Prelims",
              start_date: "1st February 2026",
              end_date: "28th February 2026",

              description:
                "Participants must submit a video showcasing their solo dance performance. This round will serve as an eliminator, with selected entries advancing to the on-campus finale.",

              submission_requirements: [
                "Duration: 1–3 minutes",
                "Participants must upload a PDF titled: 'ParticipantName_College Name_Showstopper.pdf'. Include your contact details (email & phone number) in the PDF. ",
                "The PDF must contain a Google Drive link to the performance video. Ensure the link has open access — inaccessible submissions will not be evaluated.",
                "Music and choreography must be original or properly credited.",
              ],
            },
            {
              id: "round_2",
              title: "Round 2: On-Campus Elimination Round",
              start_date: "13th March 2026",
              end_date: "14th March 2026",

              description:
                "The '10-12' shortlisted dancers will perform live on campus, in front of a cheering audience and an expert panel of judges.",

              submission_requirements: [
                "Time Limit: 4–7 minutes (from an empty stage to an empty stage). [Exceeding the limit will lead to penalties.]",
                "Maximum of 2 non-performing members may assist with props or music setup.",
                "Participants must arrange their own costumes, props, and tracks.",
                "Any technical requirements (lighting/sound) must be informed during registration.",
                "Participants must carry valid Institute ID cards.",
              ],
            },
            {
              id: "round_3",
              title: "Final Round : On-Campus Finale",
              start_date: "13th March 2026",
              end_date: "14th March 2026",

              description:
                "The '2-3' shortlisted dancers will perform live on campus's main stage, in front of a cheering audience and an expert panel of judges.",

              submission_requirements: [
                "Time Limit: 4–7 minutes (from an empty stage to an empty stage). [Exceeding the limit will lead to penalties.]",
                "Maximum of 2 non-performing members may assist with props or music setup.",
                "Participants must arrange their own costumes, props, and tracks.",
                "Any technical requirements (lighting/sound) must be informed during registration.",
                "Participants must carry valid Institute ID cards.",
              ],
            },
          ],

          rules: [
            "Any dance form or fusion is allowed (classical, contemporary, hip-hop, jazz, folk, freestyle, etc.).",
            "The final performance should be based on the same concept/theme as the preliminary round (minor changes allowed).",
            "Use of hazardous props (fire, glass, liquids, sharp objects) is strictly prohibited.",
            "Time limits must be strictly followed.",
            "Plagiarism or copied choreography may result in disqualification.",
            "Only solo performances are allowed.",
            "Background tracks must not contain inappropriate or obscene language/content.",
            "Video submissions must have clear visuals and audio quality.",
            "The Judges’ decision will be final and binding.",
            "The Organizing Committee (OC) reserves the right to disqualify entries in case of rule violations.",
            "Open to all Undergraduate and Postgraduate students.",
          ],

          contact: {
            name: "Shreya Rai",
            email: "bt24csd045@iiitn.ac.in",
            phone: "8668951316",
          },
        },
        {
          id: "dance_2",
          name: "Melody Hustle",
          organizers: "D-Traxia",
          type: "Duo Dance",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/dtaraxia.jpg",

          description: [
            "Two hearts, one rhythm — ‘Melody Hustle’ is where chemistry meets choreography! This duo dance competition celebrates teamwork, coordination, and the magic that happens when two performers move as one. Whether it’s a soulful duet, energetic hip-hop, or classical fusion, this is your chance to showcase harmony, synchronization, and storytelling through dance. Any duo is allowed. Ex: boy & boy, girl & girl, boy & girl etc.",
            "Feel the beat, trust your partner, and hustle your way to the spotlight!",
          ],

          prizes: {
            prize_pool: "₹20,000",
            first: "₹10,000",
            second: "₹5,000",
            third: "₹5,000",
          },

          unstop_link: "https://unstop.com/events/melody-hustle-duo-dance-competition-abhivyakti-2026-iiitn-1633165",

          stages: [
            {
              id: "round_1",
              title: "Round 1: Nationwide Online Prelims",
              start_date: "1st February 2026",
              end_date: "28th February 2026",

              description:
                "Teams must submit a video showcasing their duo performance. This round will serve as an eliminator, with selected pairs advancing to the on-campus finale.",

              submission_requirements: [
                "Duration: 1–3 minutes",
                "Participants must upload a PDF titled: 'ParticipantName_CollegeName_MelodyHustle.pdf'. Include your contact details (email & phone number) in the PDF. ",
                "The PDF must contain a Google Drive link to the performance video. Ensure the link has open access — inaccessible submissions will not be evaluated.",
                "Music and choreography must be original or properly credited.",
                "Both performers must be visible throughout the video.",
              ],
            },
            {
              id: "round_2",
              title: "Round 2: On-Campus Elimination Round",
              start_date: "13th March 2026",
              end_date: "14th March 2026",

              description:
                "The '10' shortlisted duos will perform live on campus, in front of an enthusiastic audience and expert panel of judges.",

              submission_requirements: [
                "Time Limit: 5–7 minutes (from an empty stage to an empty stage). [Exceeding the limit will lead to penalties.]",
                "Maximum of 2 non-performing members may assist with props or music setup.",
                "Teams must arrange their own costumes, props, and tracks.",
                "Any technical requirements (lighting/sound) must be informed during registration.",
                "Participants must carry valid Institute ID cards.",
              ],
            },
            {
              id: "round_3",
              title: "Round 2: On-Campus Final Round",
              start_date: "13th March 2026",
              end_date: "14th March 2026",

              description:
                "The '2-3' shortlisted duo will perform live on campus’s main stage, in front of a cheering audience and an expert panel of judges.",

              submission_requirements: [
                "Time Limit: 5–7 minutes (from an empty stage to an empty stage). [Exceeding the limit will lead to penalties.]",
                "Maximum of 2 non-performing members may assist with props or music setup.",
                "Teams must arrange their own costumes, props, and tracks.",
                "Any technical requirements (lighting/sound) must be informed during registration.",
                "Participants must carry valid Institute ID cards.",
              ],
            },
          ],

          rules: [
            "Any dance form or fusion is allowed (classical, contemporary, hip-hop, jazz, folk, freestyle, etc.).",
            "The final performance should be based on the same concept/theme as the preliminary round (minor changes allowed).",
            "Use of hazardous props (fire, glass, liquids, sharp objects) is strictly prohibited.",
            "Time limits must be strictly followed.",
            "Plagiarism or copied choreography may result in disqualification.",
            "Only duo performances are allowed.",
            "Background tracks must not contain inappropriate or obscene language/content.",
            "Video submissions must have clear visuals and audio quality.",
            "The Judges’ decision will be final and binding.",
            "The Organizing Committee (OC) reserves the right to disqualify entries in case of rule violations.",
            "Open to all Undergraduate and Postgraduate students.",
          ],

          contact: {
            name: "Shruthi Rathod",
            email: "bt24csd006@iiitn.ac.in",
            phone: "7842334190",
          },
        },
        {
          id: "dance_3",
          name: "Dance Squad",
          organizers: "D-Traxia",
          type: "Group Dance",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/dtaraxia.jpg",

          description: [
            "Get ready to set the stage ablaze with rhythm, energy, and unbeatable team spirit! ‘Dance Squad’ is the ultimate group dance competition that celebrates synchronization, creativity, and unity in motion. It’s not just about dance — it’s about teamwork, power, and performance that leaves the audience spellbound.",
            " Whether you groove to hip-hop, glide through contemporary, or showcase cultural folk vibes, this stage is your battleground to shine as one powerful crew. Bring your moves, coordination, and passion — and make your squad unstoppable!",
          ],

          prizes: {
            prize_pool: "₹25,000",
            first: "₹12,000",
            second: "₹8,000",
            third: "₹5,000",
          },

          unstop_link: "https://unstop.com/events/dance-squad-group-dance-competition-abhivyakti-2026-iiitn-1636730",

          stages: [
            {
              id: "round_1",
              title: "Round 1: Online Prelims",
              start_date: "1st February 2026",
              end_date: "28th February 2026",

              description:
                "Teams must submit a video showcasing their duo performance. This round will serve as an eliminator, with selected pairs advancing to the on-campus finale.",

              submission_requirements: [
                "Duration: 1–3 minutes",
                "Participants must upload a PDF titled: 'ParticipantName_CollegeName_DanceSquad.pdf'. Include your contact details (email & phone number) in the PDF. ",
                "The PDF must contain a Google Drive link to the performance video. Ensure the link has open access — inaccessible submissions will not be evaluated.",
                "Music and choreography must be original or properly credited.",
                "All performers must be visible throughout the video.",
              ],
            },
            {
              id: "round_2",
              title: "Round 2: On-Campus Elimination Round",
              start_date: "13th March 2026",
              end_date: "14th March 2026",

              description:
                "The shortlisted 5-7 squads will perform live on campus, in front of a dynamic audience and an expert panel of judges.",

              submission_requirements: [
                "Time Limit: 6–9 minutes (from an empty stage to an empty stage). [Exceeding the limit will lead to penalties.]",
                "Maximum of 4 non-performing members may assist with props or music setup.",
                "Teams must arrange their own costumes, props, and tracks.",
                "Any technical requirements (lighting/sound) must be informed during registration.",
                "Participants must carry valid Institute ID cards.",
              ],
            },
            {
              id: "round_3",
              title: "Round 3: On-Campus Final Round",
              start_date: "13th March 2026",
              end_date: "14th March 2026",

              description:
                "The '2-3' shortlisted dance groups will perform live on campus’s main stage, in front of a cheering audience and an expert panel of judges.",

              submission_requirements: [
                "Time Limit: 6–9 minutes (from an empty stage to an empty stage). [Exceeding the limit will lead to penalties.]",
                "Maximum of 4 non-performing members may assist with props or music setup.",
                "Teams must arrange their own costumes, props, and tracks.",
                "Any technical requirements (lighting/sound) must be informed during registration.",
                "Participants must carry valid Institute ID cards.",
              ],
            },
          ],

          rules: [
            "Any dance form or fusion is allowed (classical, contemporary, hip-hop, jazz, folk, freestyle, etc.).",
            "The final performance should be based on the same concept/theme as the preliminary round (minor changes allowed).",
            "Use of hazardous props (fire, glass, liquids, sharp objects) is strictly prohibited.",
            "Time limits must be strictly followed.",
            "Plagiarism or copied choreography may result in disqualification.",
            "Only group performances (minimum 4, maximum 15 performers) are allowed.",
            "Background tracks must not contain inappropriate or obscene language/content.",
            "Video submissions must have clear visuals and audio quality.",
            "The Judges’ decision will be final and binding.",
            "The Organizing Committee (OC) reserves the right to disqualify entries in case of rule violations.",
            "Open to all Undergraduate and Postgraduate students.",
          ],

          contact: {
            name: "Praneeth Siddharth",
            email: "bt24cse0@064iiitn.ac.in",
            phone: "7601004644",
          },
        },
      ],
    },
    {
      id: "music",
      events: [
        {
          id: "music_1",
          name: "Raagtarangini",
          organizers: "Crescendo",
          type: "Battle of Bands",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/crescendo1.jpg",

          description: [
            "रागतरंगिनी(Raagtarangini) is the flagship Battle of Bands competition under Crescendo, designed to celebrate the spirit of live music, collaboration, and creative expression. This event provides an electrifying platform for college bands to showcase their musical synergy, technical prowess, and stage charisma through powerful live performances.",
            "Bands will perform Hindi, English, or bilingual tracks, displaying their ability to blend rhythm, melody, and energy to engage the crowd. Whether it’s a fierce rock anthem, a groovy funk jam, or a soulful original, RAAGTARANGINI is where music speaks, and energy roars.",
          ],

          prizes: {
            prize_pool: "₹25,000",
            first: "₹12,000",
            second: "₹8,000",
            third: "₹5,000",
          },

          unstop_link: "https://unstop.com/events/raagtarangini-band-performance-abhivyakti-2026-iiitn-1623233",

          stages: [
            {
              id: "round_1",
              title: "Finale",
              start_date: "",
              end_date: "",

              description:
                "Bands will perform live before an audience and a panel of judges. Each team will get 22 minutes total stage time (15 minutes performance + 7 minutes sound check).",

              submission_requirements: [
                "Each band must have 3–8 members.",
                "Time Limit: 15 minutes for performance + 7 minutes for sound check. [Exceeding the time limit by more than 60 seconds will result in deduction of points and potential disqualification.]",
                "Bands may perform any number of songs (Hindi, English, or bilingual) within the allotted time.",
                "Original compositions are allowed and will be given extra marks. (Must be mentioned during registration, and band members should be introduced.)",
                "The instruments provided will include 1 drum kit. (Bands must bring their own additional instruments, amplifiers, and cables.)",
                "Participants are expected to maintain stage decorum; obscenity, offensive language, or unsafe acts will lead to immediate disqualification.",
                "Participants must carry valid Institute ID cards for verification.",
              ],
            },
          ],

          rules: [
            "Only Undergraduate and Postgraduate students are eligible.",
            "All performances must be live – lip-sync or pre-recorded vocals are not allowed.",
            "The use of hazardous materials (fire, liquids, glass, etc.) is strictly prohibited.",
            "Bands must ensure cultural sensitivity in lyrics and presentation.",
            "Any damage to stage, instruments, or equipment will result in disqualification and penalty.",
            "Judges’ decisions will be final.",
            "In case of any disputes, the decision made by the Organizing Committee (OC) will be final. The OC also holds the right to disqualify any team in case of discrepancies.",
          ],

          contact: {
            name: "Chakshu Shetty",
            email: "bt24csa016@iiitn.ac.in",
            phone: "8328036108",
          },
        },
        {
          id: "music_2",
          name: "Swarasamar",
          organizers: "Crescendo",
          type: "Solo Singing",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/crescendo2.jpg",

          description: [
            "Swarasamar is a soulful celebration of music where individual voices take center stage. The event provides a platform for aspiring singers to express their emotions, creativity, and musical excellence. Participants will perform solo pieces showcasing their vocal talent, stage presence, and passion for melody. Let your voice be heard and your song touch hearts!",
          ],

          prizes: {
            prize_pool: "₹15,000",
            first: "₹10,000",
            second: "₹5,000",
            third: "",
          },

          unstop_link: "https://unstop.com/events/swarasamar-solo-singing-abhivyakti-2026-iiitn-1624699",

          stages: [
            {
              id: "round_1",
              title: "Finale",
              start_date: "",
              end_date: "",

              description:
                "The participants will perform their songs live on campus. This is their moment to shine, showcasing their performances before a live audience and a panel of judges. The performers will perform in the Amphitheatre and finals will be held on Stage.",

              submission_requirements: [
                "Semi-finals Time Limit: 3+1(sound check) minutes (from an empty stage to an empty stage). Exceeding the time limit will result in penalties.",
                "Finals Time Limit: 4+1(sound check) minutes (from an empty stage to an empty stage). Exceeding the time limit will result in penalties.",
                "Exceeding the time limit by 30 seconds will lead to disqualification.",
                "Any specific technical requirements must be communicated during registration.",
                "Backtrack should be sent on crescendo@iiitn.ac.in containing Contact details and FILENAME: Team Name/Participant Name_College Name_Event Name.mp4",
              ],
            },
          ],

          rules: [
            "Songs can be in Hindi, English or a mixture is also allowed.",
            "The top 3 will perform on stage",
            "Time limits for both rounds must be adhered to strictly.",
            "Inappropriate content, obscenity, or vulgarity will lead to disqualification.",
            "Judges’ decisions will be final.",
            "In case of any disputes, the decision made by the Organizing Committee (OC) will be final. The OC also holds the right to disqualify any team in case of discrepancies.",
            "Only Undergraduate and Postgraduate students are eligible for the competition.",
          ],

          contact: {
            name: "Vedant Anjankar",
            email: "bt24ece132@iiitn.ac.in",
            phone: "7820854029",
          },
        },
        {
          id: "music_3",
          name: "Vadyotsava",
          organizers: "Crescendo",
          type: "Instrumental",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/crescendo1.jpg",

          description: [
            "Vādyotsava is a grand celebration of instrumental music where rhythm, melody, and mastery unite on one stage. This competition invites passionate musicians to showcase their skill, creativity, and synchronization through the pure language of sound. From the deep resonance of strings to the pulse of percussion, every note tells a story and every beat sets the stage alive.",
            "Step into the battlefield of music, where instruments speak louder than words — and only the most captivating performance will triumph.",
          ],

          prizes: {
            prize_pool: "₹15,000",
            first: "₹10,000",
            second: "₹5,000",
            third: "",
          },

          unstop_link: "https://unstop.com/events/vadyotsava-abhivyakti-2026-iiitn-1636725",

          stages: [
            {
              id: "round_1",
              title: "Single Round: Performance",
              start_date: "",
              end_date: "",

              description: "",

              submission_requirements: [
                "Participants can perform any number of songs in a time limit of 5 mins and 2 mins of sound check.",
                "In case of original composition (if mentioned) extra credits and creators must be introduced.",
                "Exceeding the time limit by 45 seconds will lead to disqualification.",
                "Participants can optionally perform on backtrack that should be submitted at the time of registration.",
                "Performers will perform at Amphitheatre and Top 5(finals) will be on stage.",
                "Results will be announced online after evaluation.",
                "Backtrack should be sent on crescendo@iiitn.ac.in containing Contact details and FILENAME: Team Name/Participant Name_College Name_Event Name.mp4",
              ],
            },
          ],

          rules: [
            "Participation is team wise with maximum 3 members.",
            "Performers containing offensive, vulgar, or discriminatory content will be disqualified.",
            "Judges’ decisions will be final.",
            "In case of any disputes, the decision made by the Organizing Committee (OC) will be final. The OC also holds the right to disqualify any team in case of discrepancies.",
            "Only Undergraduate and Postgraduate students are eligible for the competition.",
          ],

          contact: {
            name: "Amit Pramanik",
            email: "bt24csa038@iiitn.ac.in",
            phone: "9712048865",
          },
        },
        {
          id: "music_4",
          name: "Beats Barrack 2.0",
          organizers: "Crescendo",
          type: "BGM Making",
          mode: "Online",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/crescendo2.jpg",

          description: [
            " BEATS BARRACK 2.0 is an online background music (BGM) making competition that provides a creative platform for aspiring composers and music producers. Participants create original BGMs that enhance visual storytelling, emotions, and cinematic narratives. The online finale challenges shortlisted teams to compose music for digitally provided visuals within a fixed time limit",
          ],

          prizes: {
            prize_pool: "₹5,000",
            first: "₹3,000",
            second: "₹2,000",
            third: "",
          },

          unstop_link: "https://unstop.com/events/beats-barrack-20-abhivyakti-2026-iiitn-1636722",

          stages: [
            {
              id: "round_1",
              title: "BGM Making Competition",
              start_date: "19th March 2025",
              end_date: "20th March 2025",

              description: [
                "Round 1 – Online Submission: Original BGM (3–5 minutes) + Concept PDF.",
                "Final Round – Online BGM Challenge: 4-hour live online composition using provided visuals. Final audio submission required.",
              ],

              submission_requirements: [
                "Email: crescendo@iiitn.ac.in",
                "File Name: TeamName_CollegeName_BEATS_BARRACK_2.0",
                "PDF Must Include: Team & College Name, Contact Details, Members, Tools Used, BGM Concept, Track Duration.",
              ],
            },
          ],

          rules: [
            "Team size: 1–4 participants",
            "All music must be original; plagiarism leads to disqualification",
            "Track duration: 3–5 minutes (60s grace limit)",
            "Use of DAWs, virtual instruments & licensed libraries allowed",
            "Stable internet connection required",
            "Offensive or culturally insensitive content prohibited",
            "Soft copy of Institute ID mandatory",
            "Judges’ and OC decisions are final",
          ],

          contact: {
            name: "Karuna Jagdale",
            email: "bt24csd052@iiitn.ac.in",
            phone: "9209389993",
          },
        },
      ],
    },
    {
      id: "digital_arts",
      events: [
        {
          id: "digital_arts_1",
          name: "AD-Mads",
          organizers: "Probe",
          type: "Ad Making",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/probe.png",

          description: [
            "Unleash your creativity and marketing genius at AdMads, where storytelling meets strategy! This is your stage to craft captivating advertisements that blend emotion, wit, and innovation into one unforgettable message.",
            "From conceptualizing to filming, bring your own unique vision to life through a 1–2 minute video ad for any product or service of your choice. Whether it’s humor, emotion, or pure brilliance—make your ad the one audiences can’t forget.",
            "Step into the world of branding and persuasion, where every second counts. Let your imagination do the selling, and your story do the talking.",
          ],

          prizes: {
            prize_pool: "₹25,000",
            first: "₹15,000",
            second: "₹10,000",
          },

          unstop_link: "https://unstop.com/events/ad-mads-the-advertising-showdown-abhivyakti-2026-iiitn-1624394",

          stages: [
            {
              id: "round_1",
              title: "On-Campus Presentation",
              start_date: "19th March 2025",
              end_date: "21th March 2025",

              description:
                "Teams will showcase their self-made video advertisement in front of the judges and audience. Shooting facilities will be available on the IIIT Nagpur campus for those who wish to create their ad on-site.",

              submission_requirements: [
                "File Format: mp4 only.",
                "Submission Device: Ads must be presented on a personal device (laptop, tablet, or USB drive).",
              ],
            },
          ],

          rules: [
            "Props: Teams are responsible for arranging their own props for video production.",
            "Shooting Facilities: Available at IIIT Nagpur campus.",
            "Content Restrictions: Explicit content or offensive material is strictly prohibited.",
            "Video Resolution: Must not exceed 1920x1080 pixels (1080p).",
            "Time Limit: Exceeding the time limit will result in negative points.",
            "Judgment: Judges’ decision is final and binding.",
            "Team Size: Minimum 2, Maximum 4 participants. Intercollege teams are allowed.",
          ],

          contact: {
            name: "Sohan Ganji",
            email: "bt24csh018@iiitn.ac.in",
            phone: "8459833983",
          },
        },
        {
          id: "digital_arts_2",
          name: "Director's Cut",
          organizers: "Probe",
          type: "Short Film Making",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/probe.png",

          description: [
            "Step into the future of storytelling with Director’s Cut, where cinema meets interactivity. This is not a conventional short film contest. Participants must work within a given theme and create an immersive 5–10 minute short film where the audience actively influences how the story unfolds.",
            "Genres are open—suspense, romance, sci‑fi, comedy, or experimental—but the film must clearly integrate interactive decision points. Creativity, narrative control, and execution matter more than scale or budget.",
            "This competition challenges filmmakers to blend storytelling, structure, and audience engagement into a single cohesive cinematic experience.",
          ],

          prizes: {
            prize_pool: "₹30,000",
            first: "",
            second: "",
          },

          unstop_link: "https://unstop.com/events/directors-cut-interactive-short-film-competition-abhivyakti-2026-iiitn-1624989",

          stages: [
            {
              id: "round_1",
              title: "Trailer Submission (Online)",
              start_date: "",
              end_date: "",

              description: [
                "Participants must submit a 1‑minute trailer based on the given theme.",
                "Deadline: 1 week prior to the event.",
                "The trailer should clearly hint at the concept and interactive element.",
              ],

              submission_requirements: [
                "File Format: mp4 only.",
                "Presentation Mode: Personal device (laptop, tablet, or USB drive).",
              ],
            },
            {
              id: "round_2",
              title: "Finalist Selection",
              start_date: "",
              end_date: "",

              description: [
                "Teams will be shortlisted based on the trailer.",
                "Only selected finalists will proceed to the final round.",
              ],

              submission_requirements: "",
            },
            {
              id: "round_3",
              title: "On‑Campus Presentation (Offline)",
              start_date: "",
              end_date: "",

              description: [
                "Finalists must present the complete 5–10 minute short film on campus on the day of the event.",
                "Films must be presented on the team’s own device (laptop, tablet, or USB drive).",
              ],

              submission_requirements: [
                "Team name",
                "Contact details",
                "Brief description of the story",
                "Explanation of the interactive element",
              ],
            },
          ],

          rules: [
            "Team size must be minimum 3 and maximum 5 members.",
            "Inter‑college teams are allowed.",
            "Films must strictly adhere to the 5–10 minute duration.",
            "Content must be original. Plagiarism or reused footage will lead to disqualification.",
            "Interactive elements must be functional and clearly explained during presentation.",
          ],

          contact: {
            name: "Manu Shrivastava",
            email: "bt24csh008@iiitn.ac.in",
            phone: "8269883830",
          },
        },
        {
          id: "digital_arts_3",
          name: "Drishtikon",
          organizers: "Probe",
          type: "Photography Challenge",
          mode: "Online",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/probe.png",

          description: [
            "See the world through your own Drishtikon — your unique way of seeing. The Photography Challenge at Abhivyakti 2026 goes online, inviting undergraduate students from across the country to capture stories that reflect their vision, emotion, and artistry.",
            "This year, participants will explore three themes — Black and White, Reflection, and Motion. Each theme represents a different perspective on how we perceive and express the world through the lens.",
            "Your camera. Your story. Your Drishtikon.",
          ],

          prizes: {
            prize_pool: "₹5,000",
            first: "₹3,000",
            second: "₹2,000",
          },

          unstop_link: "https://unstop.com/events/drishtikon-abhivyakti-2026-iiitn-1636726",

          stages: [
            {
              id: "round_1",
              title: "Online Submission and Judging",
              start_date: "19th March 2025",
              end_date: "21th March 2025",

              themes: [
                {
                  heading: "Black and White",
                  text: "A timeless medium that focuses on light, shadow, and contrast. It highlights emotion and structure by removing the distraction of color, revealing the essence of a moment.",
                },
                {
                  heading: "Reflection",
                  text: "A visual exploration of symmetry, perception, and duality. It captures how perspectives shift when reality is mirrored, distorted, or seen from another angle.",
                },
                {
                  heading: "Motion",
                  text: "An expression of energy, rhythm, and transformation. It conveys the passage of time, the movement of life, and the beauty found in change.",
                },
              ],

              submission_requirements: [
                "Participants can submit one photograph per theme, for a maximum of three photographs in total.",
                "Each photograph must include a caption or description of up to 100 words.",
                "Submissions must be made through the official Google Form.",
                "Shortlisted entries will be featured on Abhivyakti’s social media and website gallery.",
                "A panel of judges will evaluate all entries based on creativity, storytelling, and execution",
              ],
            },
          ],

          rules: [
            "Open to undergraduate students only.",
            "Each participant may submit up to three photographs in total, one for each theme.",
            "Themes: Black and White, Reflection, and Motion",
            "Only basic editing such as exposure, contrast, cropping, and color correction is allowed.",
            "AI generated or AI enhanced images are not allowed",
            "Heavy digital manipulation or addition and removal of major elements is strictly prohibited",
            "Photographs must be original and captured by the participant.",
            "File format: JPG",
            "File name format: Name_College_Theme.jpg",
            "Each photograph must be accompanied by a caption or description of up to 100 words.",
            "Google Drive links must have “Anyone with the link can view” enabled.",
            "All entries must be submitted before the deadline.",
          ],

          contact: {
            name: "Dilkush Choubey",
            email: "bt24ece065@iiitn.ac.in",
            phone: "9163916026",
          },
        },
      ],
    },
    {
      id: "speaking_art",
      events: [
        {
          id: "speaking_art_1",
          name: "ABMUN",
          organizers: "Orator",
          type: "Model United Nations",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/abmun.jpg",

          description: [
            "Unleash your creativity and marketing genius at AdMads, where storytelling meets strategy! This is your stage to craft captivating advertisements that blend emotion, wit, and innovation into one unforgettable message.",
            "From conceptualizing to filming, bring your own unique vision to life through a 1–2 minute video ad for any product or service of your choice. Whether it’s humor, emotion, or pure brilliance—make your ad the one audiences can’t forget.",
            "Step into the world of branding and persuasion, where every second counts. Let your imagination do the selling, and your story do the talking.",
          ],

          prizes: {
            prize_pool: "₹1,20,000",
            first: "",
            second: "",
          },

          unstop_link: "https://unstop.com/events/abmun-model-united-nations-abhivyakti-2026-iiitn-1628087",

          stages: [
            {
              id: "round_1",
              title: "On-Campus Presentation",
              start_date: "19th March 2025",
              end_date: "21th March 2025",

              description:
                "Teams will showcase their self-made video advertisement in front of the judges and audience. Shooting facilities will be available on the IIIT Nagpur campus for those who wish to create their ad on-site.",

              submission_requirements: [
                "File Format: mp4 only.",
                "Submission Device: Ads must be presented on a personal device (laptop, tablet, or USB drive).",
              ],
            },
          ],

          rules: [
            "Props: Teams are responsible for arranging their own props for video production.",
            "Shooting Facilities: Available at IIIT Nagpur campus.",
            "Content Restrictions: Explicit content or offensive material is strictly prohibited.",
            "Video Resolution: Must not exceed 1920x1080 pixels (1080p).",
            "Time Limit: Exceeding the time limit will result in negative points.",
            "Judgment: Judges’ decision is final and binding.",
            "Team Size: Minimum 2, Maximum 4 participants. Intercollege teams are allowed.",
          ],

          contact: {
            name: "Rutva Gandhi",
            email: "bt24ece068@iiitn.ac.in",
            phone: "9327107269",
          },
        },
      ],
    },
    {
      id: "dramatics",
      events: [
        {
          id: "dramatics_1",
          name: "Bahumukhi",
          organizers: "Estoria",
          type: "MonoAct",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/estoria.jpg",

          description: [
            "BAHUMUKHI is a monoact competition that celebrates individuality, emotional depth, and the expressive power of theatre. The event provides performers with a platform to present compelling monologues and character-driven narratives through live performance.",
            "Participants take complete ownership of their act—as the writer, director, and performer—bringing stories to life through dialogue, expression, and stage presence. The competition encourages originality, emotional authenticity, and bold storytelling.",
          ],

          prizes: {
            prize_pool: "₹25,000",
            first: "₹15,000",
            second: "₹10,000",
          },

          unstop_link: "#",

          stages: [
            {
              id: "round_1",
              title: "Online Preliminary Round (Video Submission)",
              start_date: "",
              end_date: "",

              description: "",

              submission_requirements: [
                "Participants must submit a 2–3 minute monoact performance video.",
                "The video must be a single continuous take with clear audio and video.",
                "Shortlisting will be done by the judging panel.",
                "Selected participants will qualify for the on-campus final round.",
              ],
            },
            {
              id: "round_2",
              title: "On-Campus Final Round",
              start_date: "19th March 2026",
              end_date: "21st March 2026",

              description: "",

              submission_requirements: [
                "Qualified participants will perform live on stage.",
                "Time Limit: Maximum 10 minutes (empty stage to empty stage).",
                "Final results will be based only on this round.",
              ],
            },
          ],

          rules: [
            "This is a solo performance competition.",
            "The performance must be original; plagiarism will lead to disqualification.",
            "Dialogues must be delivered live; pre-recorded dialogue or lip-syncing is not allowed.",
            "A maximum of two non-performing assistants are allowed for sound or prop handling in the final round.",
            "Participants must arrange their own props, costumes, and makeup.",
            "Use of hazardous materials (fire, liquids, sharp objects, or anything that may damage the stage) is strictly prohibited.",
            "Obscenity, vulgarity, or inappropriate content will result in immediate disqualification.",
            "Time limits must be strictly followed.",
            "Participants must carry a valid institute ID for the on-campus round.",
            "Judges’ decisions will be final and binding.",
          ],

          contact: {
            name: "Pranay Chiraman",
            email: "bt24csh038@iiitn.ac.in",
            phone: "9131289543",
          },
        },
        {
          id: "dramatics_2",
          name: "Aavahan",
          organizers: "Estoria",
          type: "Stage Play",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/estoria.jpg",

          description: [
            "BAHUMUKHI is a monoact competition that celebrates individuality, emotional depth, and the expressive power of theatre. The event provides performers with a platform to present compelling monologues and character-driven narratives through live performance.",
            "Participants take complete ownership of their act—as the writer, director, and performer—bringing stories to life through dialogue, expression, and stage presence. The competition encourages originality, emotional authenticity, and bold storytelling.",
          ],

          prizes: {
            prize_pool: "₹25,000",
            first: "₹15,000",
            second: "₹10,000",
          },

          unstop_link: "#",

          stages: [
            {
              id: "round_1",
              title: "Online Preliminary Round (Video Submission)",
              start_date: "",
              end_date: "",

              description: "",

              submission_requirements: [
                "Participants must submit a 2–3 minute monoact performance video.",
                "The video must be a single continuous take with clear audio and video.",
                "Shortlisting will be done by the judging panel.",
                "Selected participants will qualify for the on-campus final round.",
              ],
            },
            {
              id: "round_2",
              title: "On-Campus Final Round",
              start_date: "19th March 2026",
              end_date: "21st March 2026",

              description: "",

              submission_requirements: [
                "Qualified participants will perform live on stage.",
                "Time Limit: Maximum 10 minutes (empty stage to empty stage).",
                "Final results will be based only on this round.",
              ],
            },
          ],

          rules: [
            "This is a solo performance competition.",
            "The performance must be original; plagiarism will lead to disqualification.",
            "Dialogues must be delivered live; pre-recorded dialogue or lip-syncing is not allowed.",
            "A maximum of two non-performing assistants are allowed for sound or prop handling in the final round.",
            "Participants must arrange their own props, costumes, and makeup.",
            "Use of hazardous materials (fire, liquids, sharp objects, or anything that may damage the stage) is strictly prohibited.",
            "Obscenity, vulgarity, or inappropriate content will result in immediate disqualification.",
            "Time limits must be strictly followed.",
            "Participants must carry a valid institute ID for the on-campus round.",
            "Judges’ decisions will be final and binding.",
          ],

          contact: {
            name: "Lissa Jain",
            email: "bt24csd061@iiitn.ac.in",
            phone: "8247356264",
          },
        },
        {
          id: "dramatics_3",
          name: "Dahaad",
          organizers: "Estoria",
          type: "Street Play",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/estoria.jpg",

          description: [
            "DAHAAD – “The Roar of Expression” – is a street play competition that celebrates the power of performance, dialogue, and message-driven storytelling. It provides a platform for teams to raise their voices on social issues through bold narratives and captivating street theatre.",
            "With raw energy and powerful emotions, teams will perform thought-provoking stories that challenge perspectives, ignite discussions, and connect with the audience.",
            "Let your team’s voice roar, your message echo, and your act leave an indelible impact on everyone watching.",
          ],

          prizes: {
            prize_pool: "₹25,000",
            first: "₹15,000",
            second: "₹10,000",
          },

          unstop_link: "https://unstop.com/events/dahaad-nukkad-natak-competition-abhivyakti-2026-iiitn-1636737",

          stages: [
            {
              id: "round_1",
              title: "On-Campus Performance Round",
              start_date: "",
              end_date: "",

              description: "",

              submission_requirements: [
                "Performance Duration: 15 minutes (from empty stage to empty stage). Exceeding the time limit will result in penalties.",
                "Team Composition: 5–20 performing members and Up to 3 non-performing members (for music, props, etc.)",
                "Props, costumes, and other materials must be arranged by the team.",
                "Pre-recorded background music or sound effects are permitted if played live by team support members",
                "Use of pre-recorded songs is prohibited — participants must sing or play live.",
                "The play must be original and performed live (no pre-recorded dialogues).",
                "Teams must carry valid Institute ID cards.",
              ],
            },
          ],

          rules: [
            "Plays can be in Hindi, English, or bilingual, with short snippets of other languages allowed.",
            "Themes should address social, cultural, or political issues — sensitive topics must be handled responsibly.",
            "The use of hazardous items (fluids, flames, sharp objects, etc.) is strictly prohibited.",
            "Time limits must be adhered to strictly.",
            "Plagiarism is strictly prohibited; originality is mandatory.",
            "Obscenity, vulgarity, or inappropriate content will lead to immediate disqualification.",
            "The decision of the judges and organizing committee will be final and binding.",
            "Participants must maintain discipline and decorum throughout the event.",
            "Only Undergraduate and Postgraduate students are eligible to participate.",
            "Teams must report 30 minutes before their scheduled slot at the venue.",
          ],

          contact: {
            name: "Ayush Deore",
            email: "bt24ece125@iiitn.ac.in",
            phone: "8390455802",
          },
        },
        {
          id: "dramatics_4",
          name: "Rasdhara",
          organizers: "Estoria",
          type: "Poetry",
          mode: "Online",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/estoria.jpg",

          description: [
            "DAHAAD – “The Roar of Expression” – is a street play competition that celebrates the power of performance, dialogue, and message-driven storytelling. It provides a platform for teams to raise their voices on social issues through bold narratives and captivating street theatre.",
            "With raw energy and powerful emotions, teams will perform thought-provoking stories that challenge perspectives, ignite discussions, and connect with the audience.",
            "Let your team’s voice roar, your message echo, and your act leave an indelible impact on everyone watching.",
          ],

          prizes: {
            prize_pool: "₹5,000",
            first: "₹3,000",
            second: "₹2,000",
          },

          unstop_link: "https://unstop.com/events/rasdhara-online-poetry-writing-competition-abhivyakti-2026-iiitn-1633179",

          stages: [
            {
              id: "round_1",
              title: "Single Round: Submission-Based Evaluation",
              start_date: "",
              end_date: "",

              description: [
                "Rasdhara, meaning the flow of emotions, is an online poetry competition that celebrates the art of expression through words.",
                "Participants will submit self-composed poems showcasing their creativity, emotions, and literary depth.",
                "The event provides a platform for budding poets to explore themes that reflect social, cultural, and personal dimensions through the medium of poetry",
              ],

              submission_requirements: [
                "Participants will submit their original poems in PDF format.",
                "Submissions will be evaluated by a panel of judges based on creativity, emotion, and literary quality.",
                "Selected top entries will be showcased on the official social media handles of the institute/fest.",
                "Results will be announced online after evaluation.",
              ],
            },
          ],

          rules: [
            "Participation is individual only",
            "The poem must be original and unpublished. Plagiarism will lead to disqualification.",
            "Language: Hindi or English (only one per participant).",
            "Theme: Open, but should reflect meaningful emotion or thought.",
            "Word limit: Maximum 40 lines or 500 words.",
            "The poem should be typed and submitted in PDF format (A4 size, readable font).",
            "The file name must follow the format: ParticipantName_Institute_Rasdhara.pdf",
            "Handwritten submissions or scanned copies will not be accepted",
            "Submissions containing offensive, vulgar, or discriminatory content will be rejected",
            "The use of AI-generated content is strictly prohibited.",
            "Each participant may submit only one entry",
            "Decisions by the Judging Panel and Organizing Committee are final and binding.",
          ],

          contact: {
            name: "Vedant Sanghai",
            email: "bt24cse080@iiitn.ac.in",
            phone: "8766674457",
          },
        },
      ],
    },
    {
      id: "AB_events",
      events: [
        // {
        //   id: "AB_events_1",
        //   name: "DJ WARS",
        //   organizers: "Central",
        //   type: "Treasure Hunt",
        //   mode: "Offline",
        //   bg_img: "/images/explore/events/abcentral.jpg",

        //   description: [],

        //   prizes: {
        //     prize_pool: "₹25,000",
        //     first: "₹15,000",
        //     second: "₹10,000",
        //   },

        //   unstop_link: "#",

        //   stages: [],

        //   rules: [],

        //   contact: {
        //     name: "Rhythem Gupta",
        //     email: "bt24ece064@iiitn.ac.in",
        //     phone: "9729442465",
        //   },
        // },
        {
          id: "AB_events_2",
          name: "DJ WARS",
          organizers: "Central",
          type: "Crowd Control Edition",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/abcentral.jpg",

          description: [
            "DJ Wars – Crowd Control Edition is a high-energy competitive DJ battle focused on live mixing, adaptability, and real-time crowd engagement. Unlike conventional DJ competitions, this format tests how well a DJ can read the crowd, maintain energy, and handle pressure on the spot.",
            "Participants will compete head-to-head in knockout-style battles where audience response plays a major role in determining winners. Strategic planning, musical creativity, and dynamic stage presence will define the ultimate champion."
          ],

          prizes: {
            prize_pool: "₹15,000",
            first: "₹10,000",
            second: "₹5,000",
          },

          unstop_link: "https://unstop.com/events/dj-wars-crowd-control-edition-abhivyakti-2026-iiitn-1638697",

          stages: [
            {
              id: "round_1",
              title: "Round 1: Knockout Battle",
              start_date: "19th March 2026",
              end_date: "19th March 2026",

              description: [
                "Head-to-head DJ battles with live audience voting.",
                "Performance Time: 5 minutes",
                "Sound Check: 2 minutes",
                "Maximum five songs OR one remix containing up to ten songs.",
                "Live mixing using Virtual DJ software is mandatory."
              ],

              submission_requirements: [
                "Team size: 2–4 participants.",
                "Participants must bring their own laptop and necessary cables/adapters.",
                "Only songs purchased during the auction can be played.",
                "One random genre/song will be assigned 5–10 minutes before performance and must be included in the set."
              ]
            },
            {
              id: "round_2",
              title: "Finale",
              start_date: "20th March 2026",
              end_date: "20th March 2026",

              description: [
                "Final knockout battle between top qualifying teams.",
                "Performance Time: 10 minutes.",
                "Audience voting and organizing committee evaluation will determine winners."
              ],

              submission_requirements: [
                "Maximum five songs OR remix up to ten songs.",
                "Strict adherence to time limits (exceeding by 60+ seconds may lead to penalties).",
                "Random genre/song challenge remains applicable.",
                "Live mixing is mandatory; pre-recorded mixes are prohibited."
              ]
            }
          ],

          rules: [
            "Team Size: 2–4 participants.",
            "Open to Undergraduate and Postgraduate Engineering students only.",
            "Valid Institute ID cards are mandatory.",
            "Auction-Based Song Selection: Songs must be purchased using allocated points before the event. No repetition allowed across teams.",
            "Random Song/Genre Challenge: Must be integrated into the set. Failure may result in penalties or disqualification.",
            "Maximum five songs per round OR one remix containing up to ten songs.",
            "Strict time limits must be followed.",
            "Live mixing is mandatory. Pre-recorded mixes are strictly prohibited.",
            "Only Virtual DJ software is allowed.",
            "Performances are judged on crowd engagement, song flow, transitions, stage presence, and handling of the random challenge.",
            "Audience voting will influence advancement.",
            "Continuous booing, misconduct, inappropriate content, or rule violation may result in instant elimination.",
            "Offensive, obscene, or culturally insensitive content is strictly prohibited.",
            "Any damage to equipment will result in disqualification and penalty.",
            "The Organizing Committee’s decision will be final and binding."
          ],

          contact: {
            name: "Lakshay",
            email: "",
            phone: "7889296396",
          }
        },
        // {
        //   id: "AB_events_3",
        //   name: "Event Name",
        //   organizers: "Central",
        //   type: "Fashion Show/Ramp Walk",
        //   mode: "Offline",
        //   bg_img: "/images/explore/events/abcentral.jpg",

        //   description: [],

        //   prizes: {
        //     prize_pool: "₹25,000",
        //     first: "₹15,000",
        //     second: "₹10,000",
        //   },

        //   unstop_link: "#",

        //   stages: [],

        //   rules: [],

        //   contact: {
        //     name: "Prabhu Doma",
        //     email: "bt24cse209@iiitn.ac.in",
        //     phone: "6281938865",
        //   },
        // },
        {
          id: "AB_events_4",
          name: "Mr. & Ms. Abhivyakti",
          organizers: "Central",
          type: "Personality Pageant",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/abcentral.jpg",

          description: [
            "Mr. & Ms. Abhivyakti is the flagship personality pageant of the Abhivyakti cultural fest. It goes beyond a conventional beauty contest and seeks the ultimate polymath—where charisma meets intellect and quick wit.",
            "The competition celebrates versatility—participants who can embody the grace of cultural traditions and the bold confidence of western styles. From commanding the ramp to handling high-pressure Q&A sessions, this event crowns a well-rounded icon of expression, style, and stage presence."
          ],

          prizes: {
            prize_pool: "Trophy + Certificate",
            first: "Trophy + Certificate",
            second: "Special Mentions",
          },

          unstop_link: "#",

          stages: [
            {
              id: "round_1",
              title: "Round 1: Online Pre-Screening",
              start_date: "12th March 2026",
              end_date: "14th March 2026",

              description: [
                "Participants must complete registration by submitting required materials.",
                "Selection will be based on photographic appeal and quality of responses.",
                "Only 12 Boys and 12 Girls will advance to on-stage rounds."
              ],

              submission_requirements: [
                "2–3 photographs",
                "Short bio (maximum 100 words)",
                "Answer to: 'Why should you be Mr./Ms. Abhivyakti?'"
              ]
            },
            {
              id: "round_2",
              title: "Round 2: Cultural Walk (Day 0)",
              start_date: "19th March 2026",
              end_date: "19th March 2026",

              description: [
                "Theme: Traditional/Cultural Wear.",
                "Participants will perform a ramp walk, introduce themselves, and execute one expressive pose/action at the ramp head."
              ],

              submission_requirements: [
                "No props allowed.",
                "No singing or performing arts allowed.",
                "Purely walk and introduction."
              ]
            },
            {
              id: "round_3",
              title: "Round 3: Western Walk",
              start_date: "20th March 2026",
              end_date: "20th March 2026",

              description: [
                "Theme: Western/Formal Wear.",
                "Format similar to Round 2 but with higher stakes.",
                "Scores from Day 0 and Day 1 will be combined.",
                "Top 6 Boys and Top 6 Girls advance to the Grand Finale."
              ],

              submission_requirements: [
                "Ramp walk and self-introduction.",
                "Strict adherence to reporting and stage instructions."
              ]
            },
            {
              id: "round_4",
              title: "Grand Finale: Personality & Wit Q&A",
              start_date: "20th March 2026",
              end_date: "20th March 2026",

              description: [
                "Finalists face a Q&A round testing confidence, spontaneity, and thought process.",
                "Each finalist will answer 2–3 questions.",
                "Time limit per answer: 20–30 seconds."
              ],

              submission_requirements: [
                "Finalists only (Top 6 Boys & Top 6 Girls).",
                "Answers must be within 20–30 seconds."
              ]
            }
          ],

          rules: [
            "Open to Undergraduate and Postgraduate students (all streams).",
            "Individual participation only.",
            "Valid Institute ID card is mandatory.",
            "Participants must report backstage 30 minutes before scheduled walk time.",
            "Obscenity, offensive language, or vulgar gestures will lead to disqualification.",
            "Access to green room is restricted to participants only.",
            "Use of fire, liquids, glass, glitter, or hazardous materials is strictly prohibited.",
            "Judges’ and Organizing Committee’s decisions are final and binding.",
            "Scores from Cultural & Western Walk rounds will determine finalists.",
            "Final Q&A will be judged separately."
          ],

          contact: {
            name: "Prabhu Doma",
            email: "",
            phone: "6281938865",
          }
        }
      ],
    },
    {
      id: "esports",
      events: [
        {
          id: "esports_1",
          name: "Bloodlines Battle",
          organizers: "Synergy",
          type: "BGMI",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/synergy.png",

          description: [
            "The gaming competitions under Abhivyakti are curated to complement the cultural spirit of the fest while maintaining competitive integrity. These events aim to attract enthusiastic gamers, encourage teamwork, and provide a high-energy experience for participants as well as spectators.",
            "We invite passionate and disciplined gamers who are eager to compete, collaborate, and represent their skills on a prominent cultural platform. Participants are expected to uphold the values of fairness, respect, and sportsmanship throughout the event.",
          ],

          prizes: {
            prize_pool: "₹20,000",
            first: "₹10,000",
            second: "₹5,000",
          },

          unstop_link: "https://unstop.com/events/bloodline-battles-bgmi-abhivyakti-2026-iiitn-1628064",

          stages: [
            {
              id: "round_1",
              title: "Round 1: Online Prelims (Battle Royals)",
              start_date: "15th February 2026",
              end_date: "10th March 2026",

              description: [
                "This round will be conducted online, where teams will compete in a series of matches on the game platform. The top-performing teams based on match results and in-game performance will qualify for the next round. Detailed instructions and match schedules will be shared with the registered teams.",
              ],

              submission_requirements: [
                {
                  details: [
                    "Conducted online",
                    "Matches played in Custom Rooms",
                    "Teams divided into multiple lobbies",
                    "Map: Erangel / Miramar / Sanhok",
                    "Squads per Room: 16 squads",
                    "Number of Matches: 2-3 matches per lobby",
                    "Scoring: Placement + Kill points",
                  ],
                  Qualification: [
                    "Top teams from each lobby qualify",
                    "Total 16 teams qualify for Offline Finals",
                    "Qualification based on overall points",
                  ],
                },
              ],
            },
            {
              id: "round_2",
              title: "Round 2: Offline Semi-Finals (LAN Event)",
              start_date: "",
              end_date: "",

              description: [""],

              submission_requirements: [
                {
                  details: [
                    "32 Qualified Teams",
                    "Conducted offline",
                    "Custom Room (LAN setup)",
                    "Number of Matches: 3 matches",
                    "Maps: Mixed rotation",
                  ],
                  Qualification: [
                    "Total 16 teams qualify for Offline Finals",
                    "Qualification based on overall points",
                  ],
                },
              ],
            },
            {
              id: "round_3",
              title: "Round 3: Offline Grand Finals (LAN Event)",
              start_date: "",
              end_date: "",

              description: "",

              submission_requirements: [
                {
                  details: [
                    "16 Qualified Teams",
                    "Mode: Battle Royale",
                    "Number of Matches: 5 matches",
                    "Maps: Erangel / Miramar / Sanhok (rotation)",
                    "Spectator & Casting: Enabled",
                  ],
                  Qualification: [
                    "Team winning the Grand Final is declared the Tournament Champion",
                  ],
                },
              ],
            },
          ],

          rules: [
            "Advancement will be based on match outcomes and performance.",
            "Use of cheats, hacks, exploits, or unfair practices will result in immediate disqualification.",
            "Participants must adhere strictly to schedules and organizer instructions.",
            "The organizing committee reserves the right to modify rules to ensure fairness.",
            "The Synergy Esports Club and Abhivyakti organizing committee hold authority over event conduct.",
            "Any form of misconduct, toxicity, or unsportsmanlike behavior will not be tolerated.",
            "Disputes must be reported immediately to event coordinators.",
            "Decisions made by referees and organizers will be final and binding.",
          ],

          contact: {
            name: "Sai Tanuj Choudary",
            email: "bt24csa036@iiitn.ac.in",
            phone: "8074345563",
          },
        },
        {
          id: "esports_2",
          name: "Firestrom Rampage",
          organizers: "Synergy",
          type: "FREE FIRE",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/synergy.png",

          description: [
            "We invite passionate and disciplined gamers who are eager to compete, collaborate, and represent their skills on a prominent cultural platform. Participants are expected to uphold the values of fairness, respect, and sportsmanship throughout the event.",
          ],

          prizes: {
            prize_pool: "₹10,000",
            first: "",
            second: "",
          },

          unstop_link: "https://unstop.com/events/firestrom-rampage-free-fire-abhivyakti-2026-iiitn-1626901",

          stages: [
            {
              id: "round_1",
              title: "Round 1: Online Prelims (Battle Royale Only)",
              start_date: "15th February 2026",
              end_date: "10th March 2026",

              description: [
                "Preliminary rounds will be conducted online to allow wide participation. Teams or players will compete in knockout or pool-based formats depending on the number of registrations.",
              ],

              submission_requirements: [
                {
                  details: [
                    "Conducted online",
                    "Matches played in Custom Rooms",
                    "Teams divided into multiple lobbies",
                    "BR matches only",
                    "Map: Bermuda / Purgatory / Kalahari",
                    "Players per Room: Up to 48 (12 squads)",
                    "Number of Matches: 3 matches per lobby",
                    "Scoring System: Standard points (Kills + Placement)",
                  ],
                  Qualification: [
                    "Top teams from each lobby qualify",
                    "Total 12 squads qualify for Offline Finals",
                    "Qualification based on overall points",
                  ],
                },
              ],
            },
            {
              id: "round_2",
              title: "Round 2: Offline Finals",
              start_date: "",
              end_date: "",

              description: [""],

              submission_requirements: [
                {
                  details: [
                    "12 Qualified squads",
                    "Conducted offline at the event venue",
                    "Custom Room (LAN setup)",
                    "Mode: Battle Royale",
                    "Number of Matches: 4 matches",
                    "Maps: Mixed rotation (Bermuda / Purgatory / Kalahari)",
                  ],
                  Qualification: [],
                },
              ],
            },
          ],

          rules: [
            "Advancement will be based on match outcomes and performance.",
            "Use of cheats, hacks, exploits, or unfair practices will result in immediate disqualification.",
            "Participants must adhere strictly to schedules and organizer instructions.",
            "The organizing committee reserves the right to modify rules to ensure fairness.",
            "The Synergy Esports Club and Abhivyakti organizing committee hold authority over event conduct.",
            "Any form of misconduct, toxicity, or unsportsmanlike behavior will not be tolerated.",
            "Disputes must be reported immediately to event coordinators.",
            "Decisions made by referees and organizers will be final and binding.",
          ],

          contact: {
            name: "Abhinay Jangala",
            email: "bt24cse062@iiitn.ac.in",
            phone: "9533322787",
          },
        },
        {
          id: "esports_3",
          name: "Pheonix Cup",
          organizers: "Synergy",
          type: "Valorant",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/synergy.png",

          description: [
            "The gaming competitions under Abhivyakti are curated to complement the cultural spirit of the fest while maintaining competitive integrity. These events aim to attract enthusiastic gamers, encourage teamwork, and provide a high-energy experience for participants as well as spectators.",
            "We invite passionate and disciplined gamers who are eager to compete, collaborate, and represent their skills on a prominent cultural platform. Participants are expected to uphold the values of fairness, respect, and sportsmanship throughout the event",
          ],

          prizes: {
            prize_pool: "₹5,000",
            first: "",
            second: "",
          },

          unstop_link: "#",

          stages: [
            {
              id: "round_1",
              title: "Round 1: Online Rounds (Team Deathmatch)",
              start_date: "15th February 2026",
              end_date: "10th March 2026",

              description: [
                "Preliminary rounds will be conducted online to allow wide participation. Teams or players will compete in knockout or pool-based formats depending on the number of registrations.",
              ],

              submission_requirements: [
                {
                  details: [
                    " Conducted online",
                    "  All matches played in Custom Lobby",
                    "Single Elimination format (can be adjusted based on entries) ",
                    "Mode: Team Deathmatch",
                    " Match Type: Best of 1 (BO1)",
                    "Winning Condition: First team to reach 100 kills (default TDM rules)",
                    "Map Selection: Random / Organizer decided",
                    " Teams advance by winning matches",
                    "Online rounds continue until Top 2 teams remain",
                    " These Top 2 teams qualify for Offline Grand Final",
                  ],
                  Qualification: [],
                },
              ],
            },
            {
              id: "round_2",
              title: "Round 2: Offline Grand Final (LAN Event) Finalists",
              start_date: "",
              end_date: "",

              description: [
                "Top-performing teams or players from the prelims will advance to the final stage, which may be conducted offline at the Abhivyakti venue.",
              ],

              submission_requirements: [
                {
                  details: [
                    "2 Qualified teams",
                    "Conducted offline at the event venue",
                    "Mode: Team Deathmatch",
                    "Match Type: Best of 3 (BO3)",
                    "Maps: Organizer-selected or map rotation",
                    "Observers & Casting: Enabled",
                  ],
                  Qualification: [],
                },
              ],
            },
          ],

          rules: [
            "Advancement will be based on match outcomes and performance.",
            "Use of cheats, hacks, exploits, or unfair practices will result in immediate disqualification.",
            "Participants must adhere strictly to schedules and organizer instructions.",
            "The organizing committee reserves the right to modify rules to ensure fairness.",
            "The Synergy Esports Club and Abhivyakti organizing committee hold authority over event conduct.",
            "Any form of misconduct, toxicity, or unsportsmanlike behavior will not be tolerated.",
            "Disputes must be reported immediately to event coordinators.",
            "Decisions made by referees and organizers will be final and binding.",
          ],

          contact: {
            name: "Jaswanth gummadi",
            email: "bt24cse196@iiitn.ac.in",
            phone: "9441070199",
          },
        },
        {
          id: "esports_4",
          name: "Royal Legends",
          organizers: "Synergy",
          type: "Clash Royale",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/synergy.png",

          description: [
            "The gaming competitions under Abhivyakti are curated to complement the cultural spirit of the fest while maintaining competitive integrity. These events aim to attract enthusiastic gamers, encourage teamwork, and provide a high-energy experience for participants as well as spectators.",
            "We invite passionate and disciplined gamers who are eager to compete, collaborate, and represent their skills on a prominent cultural platform. Participants are expected to uphold the values of fairness, respect, and sportsmanship throughout the event",
          ],

          prizes: {
            prize_pool: "₹5,000",
            first: "",
            second: "",
          },

          unstop_link: "#",

          stages: [
            {
              id: "round_1",
              title: "Round 1: Preliminary Round",
              start_date: "15th February 2026",
              end_date: "10th March 2026",

              description: [
                "Preliminary rounds will be conducted online to allow wide participation. Teams or players will compete in knockout or pool-based formats depending on the number of registrations.",
              ],

              submission_requirements: [
                {
                  details: [
                    "Conducted offline",
                    "Single Elimination / Swiss League (organizer choice)",
                    "Matches played using Friendly Battles",
                    "Match Type: Best of 3 (BO3)",
                    "Tie-Breaker: Sudden Death (default)",
                    "Time Limit: Standard game rules",
                  ],
                  Qualification: [
                    "Players advance based on match wins",
                    "Top 10 or Top 12 players qualify for Semi-Finals",
                    "Qualification decided by win-loss record / points",
                  ],
                },
              ],
            },
            {
              id: "round_2",
              title: "Round 2: Semi-Finals",
              start_date: "",
              end_date: "",

              description: [
                "Top-performing teams or players from the prelims will advance to the final stage, which may be conducted offline at the Abhivyakti venue.",
              ],

              submission_requirements: [
                {
                  details: [
                    "8 Players Qualify",
                    "Players divided into 2 groups of 4",
                    "Round-Robin format",
                    "SF1: Rank 1 (Group A) vs Rank 2 (Group B)",
                    "SF2: Rank 1 (Group B) vs Rank 2 (Group A)",
                    "Top 2 from each group → Grand Final Stage (Top 4)",
                    "Match Type: Best of 3",
                    "Conducted offline",
                  ],
                  Qualification: [],
                },
              ],
            },
            {
              id: "round_3",
              title: "Round 3: Grand Final",
              start_date: "",
              end_date: "",

              description: [
                "Top-performing teams or players from the prelims will advance to the final stage, which may be conducted offline at the Abhivyakti venue.",
              ],

              submission_requirements: [
                {
                  details: [
                    "Top 4 Players",
                    "Match Type: BO3",
                    "Winners of SF1 & SF2",
                    "Match Type: Best of 3",
                  ],
                  Qualification: [],
                },
              ],
            },
          ],

          rules: [
            "Advancement will be based on match outcomes and performance.",
            "Use of cheats, hacks, exploits, or unfair practices will result in immediate disqualification.",
            "Participants must adhere strictly to schedules and organizer instructions.",
            "The organizing committee reserves the right to modify rules to ensure fairness.",
            "The Synergy Esports Club and Abhivyakti organizing committee hold authority over event conduct.",
            "Any form of misconduct, toxicity, or unsportsmanlike behavior will not be tolerated.",
            "Disputes must be reported immediately to event coordinators.",
            "Decisions made by referees and organizers will be final and binding.",
          ],

          contact: {
            name: "Mouryagna Baindla",
            email: "bt24csa015@iiitn.ac.in",
            phone: "9603664455",
          },
        },
        {
          id: "esports_5",
          name: "Combat Carnage",
          organizers: "Synergy",
          type: "Call of Duty",
          mode: "Offline",
          bg_img: "https://assets.2026.abhivyaktifest.in/images/explore/events/synergy.png",

          description: [
            "The gaming competitions under Abhivyakti are curated to complement the cultural spirit of the fest while maintaining competitive integrity. These events aim to attract enthusiastic gamers, encourage teamwork, and provide a high-energy experience for participants as well as spectators.",
            "We invite passionate and disciplined gamers who are eager to compete, collaborate, and represent their skills on a prominent cultural platform. Participants are expected to uphold the values of fairness, respect, and sportsmanship throughout the event",
          ],

          prizes: {
            prize_pool: "₹5,000",
            first: "",
            second: "",
          },

          unstop_link: "#",

          stages: [
            {
              id: "round_1",
              title: "Round 1: Online Rounds (Team Deathmatch)",
              start_date: "15th February 2026",
              end_date: "10th March 2026",

              description: [
                "Preliminary rounds will be conducted online to allow wide participation. Teams or players will compete in knockout or pool-based formats depending on the number of registrations.",
              ],

              submission_requirements: [
                {
                  details: [
                    "Conducted online",
                    "Matches played in Private / Custom Lobbies",
                    "Single Elimination bracket",
                    "Mode: Search & Destroy",
                    "Match Type: Best of 1 (Winning team proceeds)",
                    "Time Limit: Default",
                    "Map Selection: Organizer-assigned / Random",
                    "Overtime: Yes (Overtime cap:12)",
                  ],
                  Qualification: [
                    "Teams advance by winning matches",
                    "Online rounds continue until Top 4 teams remain",
                    "Top 4 teams qualify for Offline Semi-Finals",
                  ],
                },
              ],
            },
            {
              id: "round_2",
              title: "Round 2: Offline Semi-Finals (LAN Event)",
              start_date: "",
              end_date: "",

              description: [
                "Top-performing teams or players from the prelims will advance to the final stage, which may be conducted offline at the Abhivyakti venue.",
              ],

              submission_requirements: [
                {
                  details: [
                    "4 Qualified teams",
                    "Mode: Hardpoint, Control, Search & Destroy",
                    "Match Type: Best of 3 (BO3)",
                    "Matchups:",
                    "Semi-Final 1: Team A vs Team B",
                    "Semi-Final 2: Team C vs Team D",
                    "Observers & Casting: Enabled",
                  ],
                  Qualification: [
                    "Winners of both Semi-Finals advance to Offline Grand Final",
                  ],
                },
              ],
            },
            {
              id: "round_3",
              title: "Round 3: Offline Grand Final (LAN Event)",
              start_date: "",
              end_date: "",

              description: [
                "Top-performing teams or players from the prelims will advance to the final stage, which may be conducted offline at the Abhivyakti venue.",
              ],

              submission_requirements: [
                {
                  details: [
                    "2 Qualified teams",
                    "Mode: Team Deathmatch",
                    "Match Type: Best of 5 (BO5) (or BO3 if time-limited)",
                    "Maps: Organizer-selected rotation",
                  ],
                  Qualification: [],
                },
              ],
            },
          ],

          rules: [
            "Advancement will be based on match outcomes and performance.",
            "Use of cheats, hacks, exploits, or unfair practices will result in immediate disqualification.",
            "Participants must adhere strictly to schedules and organizer instructions.",
            "The organizing committee reserves the right to modify rules to ensure fairness.",
            "The Synergy Esports Club and Abhivyakti organizing committee hold authority over event conduct.",
            "Any form of misconduct, toxicity, or unsportsmanlike behavior will not be tolerated.",
            "Disputes must be reported immediately to event coordinators.",
            "Decisions made by referees and organizers will be final and binding.",
          ],

          contact: {
            name: "Ameay Tayade",
            email: "bt24ece099@iiitn.ac.in",
            phone: "9356334613",
          },
        },
      ],
    },
  ],

  streetActivity: [
    {
      id: "street-1",
      artistName: "Street Act",
      genre: "Street Performance",
      description:
        "A captivating live experience with [Artist Name], known for [distinct style/strength—e.g., soulful vocals, electrifying performances]. Witness an evening filled with [emotion / energy / artistry] as music comes alive on stage. A captivating live experience with [Artist Name], known for [distinct style/strength—e.g., soulful vocals, electrifying performances]. Witness an evening filled with [emotion / energy / artistry] as music comes alive on stage.",
      date: "22/03/26",
      venue: "Campus Streets",
      time: "All Day",
      image: "https://assets.2026.abhivyaktifest.in/images/explore/shawn.webp",
      layout: "image-left",
      buyLink: "/passes/street-1",
    },
    {
      id: "street-2",
      artistName: "Street Act 2",
      genre: "Street Performance",
      description:
        "A captivating live experience with [Artist Name], known for [distinct style/strength—e.g., soulful vocals, electrifying performances]. Witness an evening filled with [emotion / energy / artistry] as music comes alive on stage. A captivating live experience with [Artist Name], known for [distinct style/strength—e.g., soulful vocals, electrifying performances]. Witness an evening filled with [emotion / energy / artistry] as music comes alive on stage.",
      date: "22/03/26",
      venue: "Campus Streets",
      time: "All Day",
      image: "https://assets.2026.abhivyaktifest.in/images/explore/shawn.webp",
      layout: "image-right",
      buyLink: "/passes/street-2",
    },
    {
      id: "street-3",
      artistName: "Street Act 3",
      genre: "Street Performance",
      description:
        "A captivating live experience with [Artist Name], known for [distinct style/strength—e.g., soulful vocals, electrifying performances]. Witness an evening filled with [emotion / energy / artistry] as music comes alive on stage. A captivating live experience with [Artist Name], known for [distinct style/strength—e.g., soulful vocals, electrifying performances]. Witness an evening filled with [emotion / energy / artistry] as music comes alive on stage.",
      date: "22/03/26",
      venue: "Campus Streets",
      time: "All Day",
      image: "https://assets.2026.abhivyaktifest.in/images/explore/shawn.webp",
      layout: "image-left",
      buyLink: "/passes/street-3",
    },
  ],
};
