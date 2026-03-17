// do not change id of passes

export const passTemplates = [
    {
        id: 3,
        title: "THE IIITN PASS (Basic)",
        subtitle: "The Core IIITN Experience",
        details: [
            { label: "Competitions", text: "Includes participation entry for all competitions across all 3 days." },
            { label: "The Big Nights", text: "Access to all Pro-shows and Pronites is absolutely free for IIITN students." },
            { label: "Merch", text: "Official merchandise is NOT included." },
            { label: "", text: "Designed for IIITN students who want to focus purely on participating in the events." }
        ],
        basePrice: "300",
        fallbackPrice: "₹300",
        promoLabel: "SPECIAL PRICE",
        restrictedInternalOnly: true
    },
    {
        id: 1,
        title: "THE IIITN+ PASS",
        subtitle: "The Exclusive IIITN Experience",
        details: [
            { label: "Competitions", text: "Includes participation entry for all competitions across all 3 days." },
            { label: "The Big Nights", text: "Access to all Pro-shows and Pronites is absolutely free for IIITN students." },
            { label: "Merch", text: "Includes the Official Abhivyakti '26 Limited Edition Merch." },
            { label: "", text: "Perfect for IIITN students who want to participate and represent the fest with official swag." }
        ],
        basePrice: "500",
        fallbackPrice: "₹500",
        promoLabel: "SPECIAL PRICE",
        restrictedInternalOnly: true
    },
    {
        id: 6,
        title: "IIITN GAMERS PASS",
        subtitle: "The Core E-sports Experience",
        details: [
            { label: "Competitions", text: "Includes participation entry for E-sport's competitions only. Does not include any other events." },
            { label: "The Big Nights", text: "Access to all Pro-shows and Pronites is absolutely free for IIITN students." },
            { label: "Merch", text: "Official merchandise is NOT included." },
            { label: "", text: "Designed for IIITN students who're elite gamers and want to focus purely on dominating the virtual arena" }
        ],
        basePrice: "100",
        fallbackPrice: "₹100",
        promoLabel: "SPECIAL PRICE",
        restrictedInternalOnly: true
    },
    {
        id: 4,
        title: "THE ONE DAY PASS",
        subtitle: "Single Day Experience",
        details: [
            { label: "Competitions", text: "Includes participation entry for all competitions for any 1 day of your choice." },
            { label: "The Big Nights", text: "Access to all Pro-shows and Pronites for that specific day." },
            { label: "Merch", text: "Official merchandise is NOT included." },
            { label: "", text: "This registration is for those exploring the fest for a single day; not applicable for MUN participants." }
        ],
        basePrice: "800",
        fallbackPrice: "₹800",
        promoLabel: "EARLY BIRD OFFER",
        restrictedInternalOnly: false
    },
    {
        id: 2,
        title: "THE MVP PASS",
        subtitle: "The Full AB Experience",
        details: [
            { label: "Competitions", text: "Includes participation entry for all competitions across all 3 days." },
            { label: "The Big Nights", text: "Full access to all Pro-shows and Pronites for all 3 days." },
            { label: "Merch", text: "Includes the Official Abhivyakti '26 Limited Edition Merch." },
            { label: "Food", text: "Food not included." },
            { label: "", text: "This registration is ideal for those participating in multi-day events like MUN or multiple competitions." }
        ],
        basePrice: "900",
        fallbackPrice: "₹900",
        promoLabel: "EARLY BIRD OFFER",
        restrictedInternalOnly: false
    },
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
