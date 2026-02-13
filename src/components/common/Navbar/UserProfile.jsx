
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const UserProfile = ({ user, logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [mounted, setMounted] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Expanded Mock data with team members
    const teams = user?.teams || [
        {
            id: 1,
            name: "Team Alpha",
            eventName: "Hackathon 2024",
            leader: { name: "Satvik Rastogi", hasPass: true },
            members: [
                { name: "Arjun Singh", hasPass: true },
                { name: "Neha Gupta", hasPass: false },
                { name: "Rahul Sharma", hasPass: true },
            ],
        },
        {
            id: 2,
            name: "Beta Squad",
            eventName: "Design Sprint",
            leader: { name: "Priya Patel", hasPass: true },
            members: [
                { name: "Vikram Malhotra", hasPass: false },
                { name: "Ananya Desai", hasPass: true },
                { name: "Rohan Verma", hasPass: true },
            ],
        },
    ];

    // Mock AB_id if missing
    const abId = user?.ab_id || "AB_123456";

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 200); // Small delay to prevent flickering
    };

    return (
        <>
            <div
                className="relative z-50 py-2" // Added padding to bridge gap for hover
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Profile Trigger */}
                <button
                    className="flex items-center gap-3 focus:outline-none group"
                    title={user?.first_name || "Profile"}
                >
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-semibold shadow-[0_0_15px_rgba(234,179,8,0.3)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.6)] transition-all duration-300 border-2 border-white/20 group-hover:border-yellow-300">
                        {user?.first_name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="hidden lg:block text-white font-medium text-base group-hover:text-yellow-300 transition-colors">
                        {user?.first_name || "User"}
                    </span>
                </button>

                {/* Hover Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* User Info Header */}
                            <div className="p-5 border-b border-white/10 bg-white/5">
                                <h3 className="text-white font-bold text-lg truncate">
                                    {user?.first_name} {user?.last_name}
                                </h3>
                                <p className="text-gray-400 text-sm truncate">{user?.email}</p>
                                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                    ID: {abId}
                                </div>
                            </div>

                            {/* Teams Section */}
                            <div className="py-2">
                                <div className="px-5 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Your Teams
                                </div>
                                {teams.length > 0 ? (
                                    <div className="space-y-1">
                                        {teams.map((team) => (
                                            <div
                                                key={team.id}
                                                onClick={() => {
                                                    setSelectedTeam(team);
                                                    setIsOpen(false);
                                                }}
                                                className="group flex flex-col px-5 py-3 hover:bg-white/5 transition-colors cursor-pointer border-l-2 border-transparent hover:border-yellow-500"
                                            >
                                                <span className="text-white font-medium text-sm">
                                                    {team.name}
                                                </span>
                                                <span className="text-gray-400 text-xs mt-0.5">
                                                    {team.eventName}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-5 py-3 text-sm text-gray-500 italic">
                                        No teams joined yet.
                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <div className="p-2 border-t border-white/10 bg-white/5 mt-2">
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/10 rounded-lg transition-all duration-200 cursor-pointer"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    Log Out
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Team Details Modal */}
            {/* Team Details Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {selectedTeam && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                            {/* Backdrop */}
                            <motion.div
                                key="backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedTeam(null)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            />

                            {/* Modal Content */}
                            <motion.div
                                key="modal"
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-2xl bg-[#0f0f0f] border border-yellow-500/20 rounded-2xl shadow-2xl overflow-hidden"
                            >
                                {/* Header */}
                                <div className="px-6 py-5 border-b border-white/10 bg-linear-to-r from-yellow-900/20 to-transparent flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">
                                            {selectedTeam.name}
                                        </h2>
                                        <p className="text-yellow-500/80 text-sm font-medium uppercase tracking-wide">
                                            {selectedTeam.eventName}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedTeam(null)}
                                        className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Table Content */}
                                <div className="p-6">
                                    <div className="overflow-x-auto rounded-xl border border-white/10">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-white/5 border-b border-white/10">
                                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                        Role
                                                    </th>
                                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                        Member Name
                                                    </th>
                                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                                                        Pass Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {/* Leader Row */}
                                                <tr className="hover:bg-white/[0.02] transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                                            <svg
                                                                className="w-3 h-3"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                                            </svg>
                                                            Leader
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-white font-medium">
                                                        {selectedTeam.leader.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        {selectedTeam.leader.hasPass ? (
                                                            <span className="text-green-400 text-sm flex items-center justify-end gap-1.5">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 box-shadow-green-glow"></span>
                                                                Purchased
                                                            </span>
                                                        ) : (
                                                            <span className="text-red-400 text-sm flex items-center justify-end gap-1.5">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                                                Pending
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>

                                                {/* Members Rows */}
                                                {selectedTeam.members.map((member, idx) => (
                                                    <tr
                                                        key={idx}
                                                        className="hover:bg-white/[0.02] transition-colors"
                                                    >
                                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                                            Member {idx + 1}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-200">
                                                            {member.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            {member.hasPass ? (
                                                                <span className="text-green-400 text-sm flex items-center justify-end gap-1.5">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                                                    Purchased
                                                                </span>
                                                            ) : (
                                                                <span className="text-red-400 text-sm flex items-center justify-end gap-1.5">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                                                    Pending
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default UserProfile;
