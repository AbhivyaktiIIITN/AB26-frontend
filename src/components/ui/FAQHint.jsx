import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Compact single-line floating pill hint.
 * Props:
 *   label: string — e.g. "How registration works"
 */
const FAQHint = ({ label }) => {
    const [dismissed, setDismissed] = useState(false);
    if (dismissed) return null;

    return (
        <div className="fixed bottom-4 right-3 md:bottom-5 md:right-4 z-900 flex items-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-3 md:py-2 rounded-md bg-gray-900/70 backdrop-blur-md border border-white/10 shadow-lg text-xs md:text-base font-[Gabarito] whitespace-nowrap">
            <span className="text-neutral-300">{label}</span>
            <span className="text-white/50">·</span>
            <Link to="/faq" className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
                Visit FAQs
            </Link>
            <button
                onClick={() => setDismissed(true)}
                className="ml-0.5 md:ml-1 text-white/50 hover:text-white/60 transition-colors leading-none cursor-pointer"
                aria-label="Dismiss"
            >
                ×
            </button>
        </div>
    );
};

export default FAQHint;
