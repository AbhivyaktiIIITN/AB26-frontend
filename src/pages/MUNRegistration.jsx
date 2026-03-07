import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useToast } from "../contexts/ToastContext";
import { registerForMUN, getMUNRegistration } from "../lib/mun-client";
import { getUserProfile, getUserBySerialId, getUserRegData } from "../lib/user-client";
import { abidToSerialId, serialIdToABID } from "../utils/abid-utils";

const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URL;

const ABMUN_EVENT_ID = "speaking_art_1";

const COMMITTEES = [
    {
        id: "mahabharata",
        label: "Mahabharata",
        isDropdown: false,
        instaEmbed: "https://www.instagram.com/p/DUphtclEY9o/",
    },
    {
        id: "aippm",
        label: "AIPPM",
        isDropdown: false,
        instaEmbed: "https://www.instagram.com/p/DUzwO5KjW5S/",
    },
    {
        id: "unhrc",
        label: "UNHRC",
        isDropdown: false,
        instaEmbed: "https://www.instagram.com/p/DU2c4J2jXpC/",
    },
    {
        id: "ccc",
        label: "CCC",
        isDropdown: false,
        instaEmbed: "https://www.instagram.com/p/DUxKoDeiDTn/",
    },
    {
        id: "ipl",
        label: "IPL",
        requiresDuo: true,
        isDropdown: true,
        instaEmbed: "https://www.instagram.com/p/DUvdPQCjSNx/",
        portfolios: [
            "Mumbai Indians",
            "Royal Challengers Bengaluru",
            "Chennai Super Kings",
            "Punjab Kings",
            "Sunrisers Hyderabad",
            "Gujarat Titans",
            "Kolkata Knight Riders",
            "Rajasthan Royals",
            "Delhi Capitals",
            "Lucknow Super Giants",
            "Deccan Chargers",
            "Kochi Tuskers",
            "Pune Warriors",
            "Rising Pune Supergiants",
            "Kerala Blasters",
            "Varanasi Vipers",
            "Nagpur Strikers",
            "Kashmir Kings",
            "Indore Invincible",
            "Patna Pirates",
            "Goa Gladiators",
            "Bengal Tigers",
            "Jaipur Royals",
            "Ahmedabad Titans",
            "Chandigarh Lions"
        ],
    },
    {
        id: "ip",
        label: "IP",
        isDropdown: false,
        instaEmbed: "https://www.instagram.com/p/DU5xjxFDRVF/",
    },
     {
        id: "who",
        label: "WHO",
        isDropdown: false,
        instaEmbed: "https://www.instagram.com/p/",
    },
];

// ─── Reusable custom select dropdown ──────────────────────────────────────────
const StyledSelect = ({ value, onChange, disabled, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options?.find((o) => o.value === value);
    const displayLabel = selectedOption ? selectedOption.label : placeholder;

    return (
        <div className="relative" ref={wrapperRef}>
            <div
                className={`w-full bg-gray-900 border ${isOpen ? 'border-gray-500' : 'border-gray-700'} rounded px-3 py-2.5 text-sm transition-colors ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} pr-8 flex items-center min-h-[42px] select-none`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={value ? "text-white line-clamp-1" : "text-gray-500 line-clamp-1"}>
                    {displayLabel}
                </span>
                <svg
                    className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && !disabled && (
                <div
                    className="absolute z-50 w-full mt-1.5 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl max-h-60 overflow-y-auto py-1 custom-scrollbar"
                    data-lenis-prevent="true"
                >
                    {options.map((opt, i) => (
                        <div
                            key={i}
                            className={`px-3 py-2.5 text-sm cursor-pointer hover:bg-gray-800 transition-colors ${value === opt.value ? 'text-yellow-500 font-medium bg-gray-800/50' : 'text-gray-300'}`}
                            onClick={() => {
                                onChange({ target: { value: opt.value } });
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Preference Block ─────────────────────────────────────────────────────────
// portfolios = [p1, p2, p3] — three separate pref selections
const PrefBlock = ({
    title,
    committees,
    committee,
    onCommitteeChange,
    portfolios,
    onPortfolioChange,
    d2AbId,
    onD2Change,
    d2Lookup,
    submitting,
}) => {
    const selectedCommittee = COMMITTEES.find((c) => c.id === committee);
    const requiresDuo = !!selectedCommittee?.requiresDuo;
    const isDropdown = !!selectedCommittee?.isDropdown;
    const itemLabel = selectedCommittee?.id === "ipl" ? "Team" : "Portfolio";
    const committeePortfolios = selectedCommittee?.portfolios || [];

    return (
        <div className="bg-black border border-gray-700 rounded-lg p-6 mb-6">
            {/* Section heading — plain white, normal font */}
            <h2 className="text-base font-semibold text-white mb-6 border-b border-gray-700 pb-3">
                {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                {/* ─── LEFT COLUMN: Committee Selection & Details ─── */}
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm mb-1.5">Committee</label>
                        <StyledSelect
                            value={committee}
                            onChange={(e) => onCommitteeChange(e.target.value)}
                            placeholder="Select a committee…"
                            disabled={submitting}
                            options={committees.map((c) => ({
                                value: c.id,
                                label: `${c.label}${c.requiresDuo ? " (Duo required)" : ""}`
                            }))}
                        />
                    </div>

                    {/* Committee Insta Embed */}
                    {selectedCommittee?.instaEmbed && (
                        <div className="mt-4 flex flex-col items-center px-1">
                            <div className="w-full max-w-[326px] overflow-hidden rounded-lg border border-gray-700 bg-gray-900 pointer-events-auto shadow-xl">
                                <iframe
                                    src={`${selectedCommittee.instaEmbed}embed/?theme=dark`}
                                    width="100%"
                                    height="380"
                                    frameBorder="0"
                                    scrolling="no"
                                    allowtransparency="true"
                                    className="w-full bg-black block"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* ─── RIGHT COLUMN: Portfolios & Co-Delegate ─── */}
                <div className="flex flex-col">
                    {/* 3 separate portfolio/team fields */}
                    {[0, 1, 2].map((i) => {
                        const availableOptions = committeePortfolios.filter(
                            (p) => !portfolios.slice(0, 3).includes(p) || portfolios[i] === p
                        );

                        return (
                            <div key={i} className={`mb-4 ${!committee ? "opacity-30 pointer-events-none" : ""}`}>
                                <label className="block text-gray-400 text-sm mb-1.5">
                                    {itemLabel} {i + 1}
                                </label>
                                {isDropdown ? (
                                    <StyledSelect
                                        value={portfolios[i] || ""}
                                        onChange={(e) => onPortfolioChange(i, e.target.value)}
                                        placeholder={`Select ${itemLabel.toLowerCase()} ${i + 1}…`}
                                        disabled={submitting || !committee}
                                        options={availableOptions.map((p) => ({ value: p, label: p }))}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={portfolios[i] || ""}
                                        onChange={(e) => onPortfolioChange(i, e.target.value)}
                                        placeholder={`Enter ${itemLabel.toLowerCase()} ${i + 1}…`}
                                        disabled={submitting || !committee}
                                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors disabled:opacity-40"
                                    />
                                )}
                            </div>
                        );
                    })}

                    {/* Past Experience (4th entry in portfolios array) */}
                    <div className={`mb-4 ${!committee ? "opacity-30 pointer-events-none" : ""}`}>
                        <label className="block text-gray-400 text-sm mb-1.5">
                            Past Experience <span className="text-[10px] text-gray-500 ml-1">(Optional)</span>
                        </label>
                        <textarea
                            rows={2}
                            value={portfolios[3] || ""}
                            onChange={(e) => onPortfolioChange(3, e.target.value)}
                            placeholder="Share your past participations, winnings and highlights..."
                            disabled={submitting || !committee}
                            className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors disabled:opacity-40 resize-none"
                        />
                    </div>

                    {/* Divider only required on mobile optionally, but we'll show it generally just before delegate */}
                    <div className="border-t border-gray-800 my-4" />

                    {/* Co-delegate */}
                    <div className={!committee ? "opacity-30 pointer-events-none" : ""}>
                        <label className="text-gray-400 text-sm mb-1.5 flex items-baseline justify-between">
                            <span>Co-Delegate AB ID</span>
                            {requiresDuo
                                ? <span className="text-yellow-500/90 text-[11px] font-semibold">(REQUIRED)</span>
                                : <span className="text-gray-600 text-[11px] font-medium">(OPTIONAL)</span>
                            }
                        </label>
                        <input
                            type="text"
                            maxLength={7}
                            value={d2AbId}
                            onChange={(e) => onD2Change(e.target.value)}
                            placeholder="AB00123"
                            disabled={submitting}
                            className={`w-full bg-gray-900 border rounded px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors font-mono tracking-widest uppercase ${d2Lookup.error
                                ? "border-red-500/50"
                                : d2Lookup.name
                                    ? "border-green-600/50"
                                    : "border-gray-700"
                                }`}
                        />
                        {d2Lookup.loading && (
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                                <span className="inline-block w-3 h-3 border-2 border-gray-600 border-t-gray-300 rounded-full animate-spin" />
                                Looking up participant…
                            </p>
                        )}
                        {d2Lookup.name && !d2Lookup.error && (
                            <p className="text-xs text-green-400 font-semibold mt-1">✓ {d2Lookup.name}</p>
                        )}
                        {d2Lookup.error && (
                            <p className="text-xs text-red-400 mt-1">{d2Lookup.error}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const MUNRegistration = () => {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [profileLoading, setProfileLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    // "idle" | "saving" | "saved"
    const [autosaveStatus, setAutosaveStatus] = useState("idle");
    const [lastSavedTime, setLastSavedTime] = useState(null);
    const autosaveRef = useRef(null);

    const [d1Name, setD1Name] = useState("");
    const [d1AbId, setD1AbId] = useState("");

    const [pref1, setPref1] = useState("");
    const [portfolios1, setPortfolios1] = useState(["", "", "", ""]);

    const [pref2, setPref2] = useState("");
    const [portfolios2, setPortfolios2] = useState(["", "", "", ""]);

    // Independent co-delegates
    const [d2AbId1, setD2AbId1] = useState("");
    const [d2Lookup1, setD2Lookup1] = useState({ name: "", loading: false, error: "" });

    const [d2AbId2, setD2AbId2] = useState("");
    const [d2Lookup2, setD2Lookup2] = useState({ name: "", loading: false, error: "" });

    const DRAFT_KEY = user?.id ? `mun_draft_${user.id}` : null;

    // ── Save draft ────────────────────────────────────────────────────────────
    const saveDraft = useCallback(() => {
        if (!DRAFT_KEY) return;
        const draft = { pref1, portfolios1, pref2, portfolios2, d2AbId1, d2AbId2 };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        setLastSavedTime(new Date());
        setAutosaveStatus("saved");
    }, [DRAFT_KEY, pref1, portfolios1, pref2, portfolios2, d2AbId1, d2AbId2]);

    // Autosave — debounced 800 ms after any field change
    useEffect(() => {
        if (!DRAFT_KEY) return;
        setAutosaveStatus("saving");
        clearTimeout(autosaveRef.current);
        autosaveRef.current = setTimeout(saveDraft, 800);
        return () => clearTimeout(autosaveRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pref1, portfolios1, pref2, portfolios2, d2AbId1, d2AbId2]);

    // ── Auth guard ──────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            showToast("Please log in to continue", "error");
            navigate("/events");
        }
    }, [authLoading, isAuthenticated, navigate, showToast]);

    // ── Pre-fill from profile + restore draft ─────────────────────────────────
    useEffect(() => {
        if (!user?.id) return;
        (async () => {
            setProfileLoading(true);
            try {
                // Fetch basic user profile
                const res = await getUserProfile(user.id);
                if (res?.success && res?.user) {
                    const u = res.user;
                    const fallbackName = `${u.firstName || ""} ${u.lastName || ""}`.trim();
                    const finalName = u.name || fallbackName || u.email || "";
                    setD1Name(finalName);
                    setD1AbId(serialIdToABID(u.serialId) || String(u.ab_id || ""));
                }

                // Check for existing MUN registration in Database
                const munRes = await getMUNRegistration();
                if (munRes?.success && munRes?.registration) {
                    const r = munRes.registration;

                    // Look up Committee IDs from their Labels
                    const c1Obj = COMMITTEES.find(c => c.label === r.committee1);
                    if (c1Obj) setPref1(c1Obj.id);
                    if (r.portfolios1) setPortfolios1(r.portfolios1);
                    if (r.coDelegate1AbId) setD2AbId1(r.coDelegate1AbId);

                    const c2Obj = COMMITTEES.find(c => c.label === r.committee2);
                    if (c2Obj) setPref2(c2Obj.id);
                    if (r.portfolios2) setPortfolios2(r.portfolios2);
                    if (r.coDelegate2AbId) setD2AbId2(r.coDelegate2AbId);

                    localStorage.removeItem(`mun_draft_${user.id}`); // Discard cache if backend data arrives
                    return; // Skip reading drafted local storage if DB already exists
                }
            } catch { /* silent */ }
            finally { setProfileLoading(false); }

            // Restore draft only if there was no active Database registration
            const saved = localStorage.getItem(`mun_draft_${user.id}`);
            if (saved) {
                try {
                    const d = JSON.parse(saved);
                    if (d.pref1) setPref1(d.pref1);
                    if (d.portfolios1) setPortfolios1(d.portfolios1);
                    if (d.pref2) setPref2(d.pref2);
                    if (d.portfolios2) setPortfolios2(d.portfolios2);
                    if (d.d2AbId1) setD2AbId1(d.d2AbId1);
                    if (d.d2AbId2) setD2AbId2(d.d2AbId2);
                    setAutosaveStatus("saved");
                    setLastSavedTime(new Date());
                } catch { /* corrupt draft — ignore */ }
            }
        })();
    }, [user]);

    // Reset portfolios on MANUAL committee change inside UI instead of reactive useEffect

    // ── Co-delegate lookups ───────────────────────────────────────────────────
    const handleD2Change = (setAbId, setLookup) => async (val) => {
        const cleaned = val.toUpperCase().trim();
        setAbId(cleaned);

        if (cleaned.length === 7) {
            if (cleaned === d1AbId.trim().toUpperCase()) {
                setLookup({ name: "", loading: false, error: "You cannot be your own co-delegate" });
                return;
            }

            setLookup({ name: "", loading: true, error: "" });
            const serialId = abidToSerialId(cleaned);
            if (!serialId) {
                setLookup({ name: "", loading: false, error: "Invalid format — use AB##### (e.g. AB00123)" });
                return;
            }
            try {
                const res = await getUserBySerialId(serialId);
                if (!res.success || !res.user) {
                    setLookup({ name: "", loading: false, error: "No account found for this AB ID" });
                } else {
                    const fallbackName = `${res.user.firstName || ""} ${res.user.lastName || ""}`.trim();
                    const finalName = res.user.name || fallbackName || res.user.email || "";
                    setLookup({ name: finalName, loading: false, error: "" });
                }
            } catch {
                setLookup({ name: "", loading: false, error: "Lookup failed — check your connection" });
            }
        } else {
            setLookup({ name: "", loading: false, error: "" });
        }
    };

    const handleD2Change1 = handleD2Change(setD2AbId1, setD2Lookup1);
    const handleD2Change2 = handleD2Change(setD2AbId2, setD2Lookup2);

    // Bootstrap draft lookups natively after identity/functions execute
    useEffect(() => {
        if (d1AbId) {
            if (d2AbId1.length === 7 && !d2Lookup1.name && !d2Lookup1.error && !d2Lookup1.loading) {
                handleD2Change1(d2AbId1);
            }
            if (d2AbId2.length === 7 && !d2Lookup2.name && !d2Lookup2.error && !d2Lookup2.loading) {
                handleD2Change2(d2AbId2);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [d1AbId, d2AbId1, d2AbId2]);

    // ── Submit ──────────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate preferences (skip 4th index as it's optional experience)
        if (!pref1 || portfolios1.slice(0, 3).some((p) => !p)) {
            showToast("Fill in your 1st preference committee and all 3 portfolios", "error");
            return;
        }
        if (!pref2 || portfolios2.slice(0, 3).some((p) => !p)) {
            showToast("Fill in your 2nd preference committee and all 3 portfolios", "error");
            return;
        }
        if (pref1 === pref2) {
            showToast("Both preferences must be different committees", "error");
            return;
        }
        const c1RequiresDuo = COMMITTEES.find((c) => c.id === pref1)?.requiresDuo;
        if (c1RequiresDuo && (!d2AbId1.trim() || !d2Lookup1.name)) {
            showToast("Your 1st preference requires a co-delegate", "error");
            return;
        }

        const c2RequiresDuo = COMMITTEES.find((c) => c.id === pref2)?.requiresDuo;
        if (c2RequiresDuo && (!d2AbId2.trim() || !d2Lookup2.name)) {
            showToast("Your 2nd preference requires a co-delegate", "error");
            return;
        }

        setSubmitting(true);
        try {
            // Verify they have the base MUN registration in the generic Registration table first
            const regData = await getUserRegData(user.id);
            const registrations = regData?.user?.registrations || [];
            const isBaseRegistered = registrations.some((reg) => reg.eventId === ABMUN_EVENT_ID);

            if (!isBaseRegistered) {
                showToast("First register for the abMUN event before submitting preferences.", "error");
                setSubmitting(false);
                navigate("/events");
                return;
            }

            // Construct exact payload for DB
            const payload = {
                d1AbId: d1AbId.trim(),
                committee1: COMMITTEES.find((c) => c.id === pref1)?.label,
                portfolios1: portfolios1,
                coDelegate1AbId: d2AbId1.trim() && d2Lookup1.name ? d2AbId1.trim() : null,
                committee2: COMMITTEES.find((c) => c.id === pref2)?.label,
                portfolios2: portfolios2,
                coDelegate2AbId: d2AbId2.trim() && d2Lookup2.name ? d2AbId2.trim() : null,
            };

            const result = await registerForMUN(payload);

            if (result.success) {
                showToast("Successfully registered for abMUN!", "success");
                navigate("/myaccount"); // Or wherever you want them to land
            } else {
                showToast(result.message || "Failed to submit MUN registration", "error");
            }

        } catch (err) {
            console.error(err);
            showToast("Something went wrong, please try again", "error");
        } finally {
            setSubmitting(false);
        }
    };

    // ── Loading ─────────────────────────────────────────────────────────────────
    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-gray-400">Loading…</div>
            </div>
        );
    }
    if (!isAuthenticated) return null;

    const pref2Committees = COMMITTEES.filter((c) => c.id !== pref1);

    return (
        <div className="min-h-screen bg-black pt-32 md:pt-36 px-4 pb-16">
            <div className="max-w-4xl mx-auto">

                {/* ── Header with autosave indicator ── */}
                <div className="mb-8 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                            abMUN Registration
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Orator · Abhivyakti 2026
                        </p>
                    </div>
                    {/* Autosave indicator */}
                    <div className="shrink-0 flex items-center gap-1.5 pt-1">
                        {autosaveStatus === "saving" && (
                            <>
                                <span className="w-2 h-2 rounded-full bg-gray-600 animate-pulse inline-block" />
                                <span className="text-xs text-gray-600">Saving…</span>
                            </>
                        )}
                        {autosaveStatus === "saved" && lastSavedTime && (
                            <>
                                <span className="w-2 h-2 rounded-full bg-green-700 inline-block" />
                                <span className="text-xs text-gray-500">
                                    Autosaved
                                </span>
                            </>
                        )}
                        {autosaveStatus === "idle" && (
                            <>
                                <span className="w-2 h-2 rounded-full bg-gray-700 inline-block" />
                                <span className="text-xs text-gray-600">Autosave on</span>
                            </>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>

                    {/* ── Read-only identity pill ── */}
                    <div className="bg-black border border-gray-700 rounded-lg px-5 py-4 mb-6 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        {profileLoading ? (
                            <div className="bg-gray-800 animate-pulse h-4 w-56 rounded" />
                        ) : (
                            <p className="text-gray-300 text-sm">
                                Registering as{" "}
                                <span className="text-white font-semibold">{d1Name}</span>
                                {d1AbId && (
                                    <span className="text-gray-500 font-mono text-xs ml-1.5">({d1AbId})</span>
                                )}
                            </p>
                        )}
                    </div>

                    {/* ── Preference Block 1 ── */}
                    <PrefBlock
                        title="1st Preference"
                        committees={COMMITTEES}
                        committee={pref1}
                        onCommitteeChange={(val) => {
                            setPref1(val);
                            setPortfolios1(["", "", "", ""]);
                        }}
                        portfolios={portfolios1}
                        onPortfolioChange={(idx, val) => {
                            const next = [...portfolios1];
                            next[idx] = val;
                            setPortfolios1(next);
                        }}
                        d2AbId={d2AbId1}
                        onD2Change={handleD2Change1}
                        d2Lookup={d2Lookup1}
                        submitting={submitting}
                    />

                    {/* ── Preference Block 2 ── */}
                    <PrefBlock
                        title="2nd Preference"
                        committees={pref2Committees}
                        committee={pref2}
                        onCommitteeChange={(val) => {
                            setPref2(val);
                            setPortfolios2(["", "", "", ""]);
                        }}
                        portfolios={portfolios2}
                        onPortfolioChange={(idx, val) => {
                            const next = [...portfolios2];
                            next[idx] = val;
                            setPortfolios2(next);
                        }}
                        d2AbId={d2AbId2}
                        onD2Change={handleD2Change2}
                        d2Lookup={d2Lookup2}
                        submitting={submitting}
                    />

                    {/* ── Actions ── */}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => { saveDraft(); showToast("Draft saved", "success"); }}
                            disabled={submitting}
                            className="flex-1 py-3 bg-transparent border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white text-base font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
                        >
                            Save Draft
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base tracking-wide"
                        >
                            {submitting ? "Submitting…" : "Submit"}
                        </button>
                    </div>
                    <p className="mt-3 text-center text-xs text-gray-700">
                        Changes can be made before the deadline.
                    </p>

                </form>
            </div>
        </div>
    );
};

export default MUNRegistration;
