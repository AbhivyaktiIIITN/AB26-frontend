// Static design data for rendering nice details on passes and accommodations

export const passTemplates = [
    {
        id: 1,
        title: "THE IIITN PASS",
        subtitle: "The full AB Experience",
        details: [
            { label: "All-Access", text: "Includes participation entry for all competitions." },
            { label: "The Big Nights", text: "Proshows and pronites are free for IIITN Students." },
            { label: "The Swag", text: "Get the Official Abhivyakti '26 Limited Edition Merch." },
            { label: "Best for", text: "The hardcore participants who want to own the stage and the nights." }
        ],
        basePrice: "800",
        fallbackPrice: "₹---",
        restrictedInternalOnly: true
    },
    {
        id: 2,
        title: "THE MVP PASS",
        subtitle: "The full AB Experience",
        details: [
            { label: "All-Access", text: "Includes participation entry for all competitions." },
            { label: "The Big Nights", text: "Full access to all proshows and pronites throughout the fest." },
            { label: "The Swag", text: "Get the Official Abhivyakti '26 Limited Edition Merch." },
            { label: "Best for", text: "The hardcore participants who want to own the stage and the nights." }
        ],
        basePrice: "1200",
        fallbackPrice: "₹---",
        restrictedInternalOnly: false
    },
    // {
    //     id: 3,
    //     title: "HEADLINERS PASS",
    //     subtitle: "For the fans of the Big Stage",
    //     details: [
    //         { label: "The Big Nights", text: "Entry to all Pronites and Pro-shows (Concert, DJ Night, Comedy)" },
    //         { label: "Best for", text: "The vibe-seekers who are here for the energy and the artists." }
    //     ],
    //     basePrice: "600",
    //     fallbackPrice: "₹---"
    // },

    // {
    //     id: 1, // ID mapping to the backend database
    //     title: "THE FLASH PASS",
    //     subtitle: "Flexibility on the Go",
    //     details: [
    //         { label: "On the Fly", text: "Entry to specific on-spot events, fun zone activities, and mini-games." },
    //         { label: "Best for", text: "The casual visitors looking for quick fun and impulsive challenges." }
    //     ],
    //     basePrice: "1199",
    //     fallbackPrice: "₹---"
    // },
];

export const accommodationTemplates = [
    {
        id: 1, // ID mapping to the backend database
        title: "THE CLUB STAY (BOYS)",
        subtitle: "", // Not used in top row from picture
        details: [
            { label: "", text: "Private Double or 4-person sharing rooms.\nAir-Conditioned (AC), Attached private washrooms.\nFood charges applicable (Optional add-on)." }
        ],
        gender: "Boys Only",
        basePrice: "1200",
        fallbackPrice: "₹----"
    },
    {
        id: 2,
        title: "THE BASECAMP (BOYS)",
        subtitle: "",
        details: [
            { label: "", text: "Common Hall Arrangement (Floor bedding).\nShared washrooms, Non-AC ventilation.\nFood not included (Available at food stalls/mess)." }
        ],
        gender: "Boys Only",
        basePrice: "300",
        fallbackPrice: "₹---"
    },
    {
        id: 3,
        title: "THE CLUB STAY (GIRLS)",
        subtitle: "",
        details: [
            { label: "", text: "Private Double or 4-person sharing rooms.\nAir-Conditioned (AC), Attached private washrooms.\nFood charges applicable (Optional add-on)." }
        ],
        gender: "Girls Only",
        basePrice: "1200",
        fallbackPrice: "₹----"
    }
];
