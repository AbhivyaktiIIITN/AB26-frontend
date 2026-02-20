// Static design data for rendering nice details on passes and accommodations

export const passTemplates = [
    {
        id: 1, // ID mapping to the backend database
        title: "THE FLASH PASS",
        subtitle: "Flexibility on the Go",
        details: [
            { label: "One the Fly", text: "Entry to specific on-spot events, fun zone activities, and mini-games." },
            { label: "Best for", text: "The casual visitors looking for quick fun and impulsive challenges." }
        ],
        fallbackPrice: "Event wise"
    },
    {
        id: 2,
        title: "THE MVP PASS",
        subtitle: "The full AB Experience",
        details: [
            { label: "All-Access", text: "Registration fees for All competitions." },
            { label: "The Big Nights", text: "Entry to all Pronites and Pro-shows (3 Days)" },
            { label: "The Swag", text: "Official Abhivyakti '26 Limited Edition Merch." },
            { label: "Best for", text: "The hardcore participants who want to own the stage and the nights." }
        ],
        fallbackPrice: "₹1199"
    },
    {
        id: 3,
        title: "HEADLINERS PASS",
        subtitle: "For the fans of the Big Stage",
        details: [
            { label: "The Big Nights", text: "Entry to all Pronites and Pro-shows (Concert, DJ Night, Comedy)" },
            { label: "Best for", text: "The vibe-seekers who are here for the energy and the artists." }
        ],
        fallbackPrice: "₹599"
    }
];

export const accommodationTemplates = [
    {
        id: 1, // ID mapping to the backend database
        title: "THE CLUB STAY",
        subtitle: "", // Not used in top row from picture
        details: [
            { label: "", text: "Private Double or 4-person sharing rooms.\nAir-Conditioned (AC), Attached private washrooms.\nFood charges applicable (Optional add-on)." }
        ],
        gender: "Boys Only",
        fallbackPrice: "₹1199"
    },
    {
        id: 2,
        title: "THE BASECAMP",
        subtitle: "",
        details: [
            { label: "", text: "Common Hall Arrangement (Floor bedding).\nShared washrooms, Non-AC ventilation.\nFood not included (Available at food stalls/mess)." }
        ],
        gender: "Boys Only",
        fallbackPrice: "₹1199"
    },
    {
        id: 3,
        title: "THE CLUB STAY",
        subtitle: "",
        details: [
            { label: "", text: "Private Double or 4-person sharing rooms.\nAir-Conditioned (AC), Attached private washrooms.\nFood charges applicable (Optional add-on)." }
        ],
        gender: "Girls Only",
        fallbackPrice: "₹1199"
    }
];
