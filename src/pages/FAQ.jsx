import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/page-hero/PageHero";

const faqs = [
    {
        category: "Registration & Passes",
        items: [
            {
                q: "How does event registration work?",
                a: (
                    <>
                        To participate in any event at Abhivyakti 2026, you must{" "}
                        <strong>first purchase at least one pass</strong> (MVP, Headliner,
                        or Flash) from the{" "}
                        <Link to="/passes" className="text-yellow-400 underline underline-offset-2 hover:text-yellow-300 transition-colors">
                            Passes & Stay page
                        </Link>
                        . Once you have a valid pass, event registrations are{" "}
                        <strong>completely free</strong> and open to all pass holders.
                    </>
                ),
            },
            {
                q: "Are event registrations paid?",
                a: "No — event registrations are free. Your pass is what makes you eligible to participate. You can register for as many events as you like once you hold a valid pass.",
            },
            {
                q: "How do team events work?",
                a: (
                    <>
                        For team events, <strong>every team member</strong> must:
                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                            <li>Create an account and log in on the website.</li>
                            <li>Complete their profile to receive a unique <strong>AB ID</strong> (visible on the My Account page).</li>
                            <li>Share their AB ID with the team leader.</li>
                        </ol>
                        <p className="mt-2">
                            The <strong>team leader</strong> then fills out the registration form and enters the AB IDs of all members. Only the team leader needs to submit the form — members do not register separately for that event.
                        </p>
                    </>
                ),
            },
            {
                q: "Where do I find my AB ID?",
                a: (
                    <>
                        Your AB ID is generated automatically once your profile is complete. You can find it on your{" "}
                        <Link to="/myaccount" className="text-yellow-400 underline underline-offset-2 hover:text-yellow-300 transition-colors">
                            My Account.
                        </Link>
                    </>
                ),
            },
        ],
    },
    {
        category: "Accommodation",
        items: [
            {
                q: "Is accommodation linked to event passes?",
                a: "No — accommodation is completely standalone. You do not need to purchase a pass to book accommodation, and booking accommodation does not grant you event access. They are independent purchases.",
            },
            {
                q: "How does accommodation booking work?",
                a: (
                    <>
                        Accommodation is available on a per-day basis. You can choose the specific days you need to stay. Tickets for your booked days will be provided and will be scanned at the entry point on your joining date.
                    </>
                ),
            },
            {
                q: "When will I receive my accommodation ticket?",
                a: "Your accommodation ticket will be available digitally after a successful booking. It will be scanned on your joining date at the designated check-in point on campus.",
            },
        ],
    },
    {
        category: "Passes & Tickets",
        items: [
            {
                q: "What passes are available?",
                a: (
                    <>
                        We offer three types of passes — <strong>MVP</strong>, <strong>Headliner</strong>, and <strong>Flash</strong> — each with different access levels and inclusions. Visit the{" "}
                        <Link to="/passes" className="text-yellow-400 underline underline-offset-2 hover:text-yellow-300 transition-colors">
                            Passes & Stay page
                        </Link>{" "}
                        for full details and pricing.
                    </>
                ),
            },
            {
                q: "How will I receive my pass ticket?",
                a: "Your fest pass is digital. After a successful payment, your registration status and ticket will be accessible on the website. Physical entry tickets will be scanned at the gate during the fest days (March 19–21, 2026).",
            },
            {
                q: "Can I transfer my pass to someone else?",
                a: "No. Passes are non-transferable and are linked to the registered participant. They must be presented at the entry gate for validation by the registered individual.",
            },
        ],
    },
    {
        category: "General",
        items: [
            {
                q: "Who can participate in Abhivyakti 2026?",
                a: "Abhivyakti 2026 is open to all bona fide students holding a valid college identity card. Some events may have specific eligibility criteria — check individual event details on the Events page.",
            },
            {
                q: "I have more questions — who do I contact?",
                a: (
                    <>
                        Reach out to us at{" "}
                        <a href="mailto:support@abhivyaktifest.in" className="text-yellow-400 underline underline-offset-2 hover:text-yellow-300 transition-colors">
                            support@abhivyaktifest.in
                        </a>{" "}
                        or call{" "}
                        <a href="tel:+918109134887" className="text-yellow-400 underline underline-offset-2 hover:text-yellow-300 transition-colors">
                            +91 8109134887
                        </a>
                        . You can also visit our{" "}
                        <Link to="/contact" className="text-yellow-400 underline underline-offset-2 hover:text-yellow-300 transition-colors">
                            Contact page
                        </Link>
                        .
                    </>
                ),
            },
        ],
    },
];

const FAQItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white/3 hover:bg-white/6 transition-colors cursor-pointer"
            >
                <span className="text-white font-medium text-lg md:text-xl leading-snug font-[Gabarito]">
                    {q}
                </span>
                <span
                    className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-white/20 text-white/60 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-5 pt-2 text-neutral-300 text-base md:text-lg leading-relaxed font-[Gabarito] border-t border-white/5">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    return (
        <main>
            <PageHero title="FAQs" />

            <section className="bg-black py-16 md:py-24 px-4">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-14">
                        <p className="text-neutral-400 text-xs md:text-sm lg:text-base tracking-widest uppercase font-[Gabarito] mb-3">
                            Got questions?
                        </p>
                        <div className="relative flex justify-center mb-4">
                            <span className="absolute top-1/2 -translate-y-1/2 h-px w-full bg-linear-to-r from-transparent via-[rgba(123,15,31,0.8)] to-transparent" />
                            <h2 className="relative z-10 bg-black px-6 text-white text-2xl md:text-4xl font-medium tracking-[0.12em] font-[Gabarito]">
                                FREQUENTLY ASKED
                            </h2>
                        </div>
                    </div>

                    {/* FAQ Categories */}
                    <div className="space-y-12">
                        {faqs.map((section) => (
                            <div key={section.category}>
                                <h3 className="text-yellow-400/80 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4 font-[Gabarito]">
                                    {section.category}
                                </h3>
                                <div className="space-y-3">
                                    {section.items.map((item, i) => (
                                        <FAQItem key={i} q={item.q} a={item.a} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center border border-white/10 rounded-2xl p-8 bg-white/2">
                        <p className="text-neutral-400 text-sm md:text-base font-[Gabarito] mb-4">
                            Still have questions? We're happy to help.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-6 py-2.5 border border-white/20 rounded-lg text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-200 font-[Gabarito]"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default FAQ;
