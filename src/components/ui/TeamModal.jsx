import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthProvider";
import { useToast } from "../../contexts/ToastContext";
import { getEventById } from "../../lib/event-client";
import { submitTeamRegistration } from "../../lib/registration-client";
import {
  getTeam,
  joinTeam,
  leaveTeam,
  removeMember,
} from "../../lib/team-client";
import { getUserPassesAndAccommodations } from "../../lib/user-client";
import { abidToSerialId } from "../../utils/abid-utils";



const TeamModal = ({ teamId, eventId, onClose, onSuccess }) => {
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();

  // State
  const [team, setTeam] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [abidInput, setAbidInput] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const [approvingMemberId, setApprovingMemberId] = useState(null);
  const [submittingSubmission, setSubmittingSubmission] = useState(false);
  const [leavingTeam, setLeavingTeam] = useState(false);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [submissionString, setSubmissionString] = useState("");
  const [removingMemberId, setRemovingMemberId] = useState(null);
  const [registrationId, setRegistrationId] = useState(null);
  const [memberPasses, setMemberPasses] = useState({}); // Track which members have passes

  // Disable Lenis smooth scroll when modal is open
  useEffect(() => {
    window.lenis?.stop(); // Stop the background smooth scroll

    return () => {
      window.lenis?.start(); // Restart it when closed
    };
  }, []);

  // Fetch team and event data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Always fetch team
        const teamRes = await getTeam(teamId);

        if (teamRes.success) {
          setTeam(teamRes.team);
          setSubmissionString(teamRes.team?.submissionString || "");
          setRegistrationId(teamRes.registrationId);

          // Fetch event data if we have eventId
          const eventToFetch = eventId || teamRes.team?.eventId;
          if (eventToFetch) {
            const eventRes = await getEventById(eventToFetch);
            if (eventRes.success) {
              setEvent(eventRes.event);
            }
          }

          // Only fetch pass status for leaders (non-leaders don't need it)
          const isUserLeader = teamRes.team?.leaderId === currentUser?.id;
          if (
            isUserLeader &&
            teamRes.team?.members &&
            teamRes.team.members.length > 0
          ) {
            const passData = {};
            const passFetches = teamRes.team.members.map((member) =>
              getUserPassesAndAccommodations(member.userId)
                .then((userPasses) => ({
                  userId: member.userId,
                  hasPasses: userPasses?.passes?.length > 0,
                }))
                .catch(() => ({
                  userId: member.userId,
                  hasPasses: false,
                })),
            );

            const results = await Promise.all(passFetches);
            results.forEach((result) => {
              passData[result.userId] = result.hasPasses;
            });
            setMemberPasses(passData);
          }
        } else {
          showToast(teamRes.error || "Failed to load team", "error");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error loading team modal:", error);
        showToast("Error loading data", "error");
      } finally {
        setLoading(false);
      }
    };

    if (teamId) {
      fetchData();
    }
  }, [teamId, eventId, currentUser?.id, showToast]);

  // Check if current user is team leader
  const isLeader = team?.leaderId === currentUser?.id;

  // Get current team member count
  const currentMemberCount =
    (team?.members?.length || 0) + pendingMembers.length;
  const maxMembers = event?.maxTeamSize || 5;
  const minMembers = event?.minTeamSize || 2;
  const canAddMembers = isLeader && currentMemberCount < maxMembers;

  // Get leader name from backend response
  const leaderName = team?.leader
    ? `${team.leader.firstName || ""} ${team.leader.lastName || ""}`.trim()
    : "Unknown";

  // Search user by ABID
  const handleSearchUser = async () => {
    if (!abidInput.trim()) {
      showToast("Please enter an ABID", "error");
      return;
    }

    const serialId = abidToSerialId(abidInput);
    if (!serialId) {
      showToast("Invalid ABID format (use ABXXXXX)", "error");
      return;
    }

    try {
      setSearchingUser(true);
      const BASE_URL =
        import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URL;

      const response = await fetch(`${BASE_URL}/api/user/serial/${serialId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error || "User not found", "error");
        return;
      }

      const foundUser = data.user;

      // Check if user already in team
      if (team?.members?.some((m) => m.userId === foundUser.id)) {
        showToast("User already in team", "error");
        return;
      }

      // Check if already pending
      if (pendingMembers.some((m) => m.id === foundUser.id)) {
        showToast("User already in pending list", "error");
        return;
      }

      // Add to pending members
      setPendingMembers([...pendingMembers, foundUser]);
      setAbidInput("");
      showToast("User added to pending list", "success");
    } catch (error) {
      showToast(error.message || "Failed to search user", "error");
    } finally {
      setSearchingUser(false);
    }
  };

  // Remove from pending (before joining)
  const handleRemovePending = (userId) => {
    setPendingMembers(pendingMembers.filter((m) => m.id !== userId));
  };

  // Add member to team (join team)
  const handleAddMember = async (userId, teamCode) => {
    try {
      setApprovingMemberId(userId);
      const result = await joinTeam(userId, teamCode);

      if (result.success) {
        setPendingMembers(pendingMembers.filter((m) => m.id !== userId));

        // Refresh team data
        const teamRes = await getTeam(teamId);
        if (teamRes.success) {
          setTeam(teamRes.team);
        }
        showToast("Member added successfully", "success");
      } else {
        showToast(result.error || "Failed to add member", "error");
      }
    } catch (error) {
      showToast(error.message || "Error adding member", "error");
    } finally {
      setApprovingMemberId(null);
    }
  };

  // Remove member from team
  const handleRemoveMember = async (memberId) => {
    try {
      setRemovingMemberId(memberId);
      const result = await removeMember(currentUser?.id, teamId, memberId);

      if (result.success) {
        // Refresh team data
        const teamRes = await getTeam(teamId);
        if (teamRes.success) {
          setTeam(teamRes.team);
        }
        showToast("Member removed successfully", "success");
      } else {
        showToast(result.error || "Failed to remove member", "error");
      }
    } catch (error) {
      showToast(error.message || "Error removing member", "error");
    } finally {
      setRemovingMemberId(null);
    }
  };

  // Leave team (current user)
  const handleLeaveTeam = async () => {
    try {
      setLeavingTeam(true);
      const result = await leaveTeam(teamId, currentUser?.id);

      if (result.success) {
        showToast("Left team successfully", "success");
        setTimeout(() => onClose(), 1000);
      } else {
        showToast(result.error || "Failed to leave team", "error");
      }
    } catch (error) {
      showToast(error.message || "Error leaving team", "error");
    } finally {
      setLeavingTeam(false);
    }
  };

  // Submit team submission string
  const handleSubmitTeam = async () => {
    if (!registrationId) {
      showToast("Registration ID not found", "error");
      return;
    }

    try {
      setSubmittingSubmission(true);

      const result = await submitTeamRegistration(
        registrationId,
        submissionString || "",
      );

      if (result.success) {
        showToast("Team submission updated successfully!", "success");
        if (onSuccess) onSuccess();
        setTimeout(() => onClose(), 800);
      } else {
        showToast(result.error || "Failed to submit", "error");
      }
    } catch (error) {
      console.error("Team submission error:", error);
      showToast("Error submitting team", "error");
    } finally {
      setSubmittingSubmission(false);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-1400 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-[#0f0f0f] rounded-2xl border border-yellow-500/20 shadow-2xl w-[90vw] md:w-full md:max-w-2xl max-h-[80vh] overflow-y-auto p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </motion.div>
    );
  }

  if (!team) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-1400 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-[#0f0f0f] rounded-2xl border border-yellow-500/20 shadow-2xl w-[90vw] md:w-full md:max-w-2xl p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-red-400 mb-4">Team not found</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-1400 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-[#0f0f0f] rounded-lg border border-yellow-500/20 shadow-2xl w-[95vw] sm:w-[90vw] md:w-full md:max-w-3xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        {/* Header with Event Name */}
        <div className="sticky top-0 flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-gray-900">
          <div>
            <p className="text-xs sm:text-base text-gray-400 mb-1">EVENT</p>
            <h2 className="text-xl sm:text-3xl font-bold text-white">
              {event?.name || "Event"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
          >
            <FaTimes className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {/* Team Name Section */}
          <div className="pb-4 border-b border-white/10">
            <p className="text-sm sm:text-base text-gray-400 mb-1">
              Team Name:{" "}
              <span className="text-base sm:text-lg text-gray-200">
                {team.name}
              </span>
            </p>
            <div className="text-sm sm:text-base text-gray-400 mt-2 flex items-center gap-2">
              <span>Code:</span>
              <div className="flex items-center gap-1">
                <code className="text-yellow-400 font-mono text-sm sm:text-base">
                  {team.teamcode || "N/A"}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(team.teamcode || "");
                    showToast("Team code copied!", "success");
                  }}
                  className="text-gray-400 cursor-pointer hover:text-yellow-400 transition-colors p-1 rounded hover:bg-white/10"
                  title="Copy team code"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Team Members Table */}
          <div>
            <div className="text-xs sm:text-sm font-semibold text-gray-400 mb-3">
              TEAM MEMBERS ({team.members?.length || 0}/{maxMembers})
            </div>
            <div className="flex flex-col border border-white/10 rounded overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0f0f0f]">
                    <tr className="border-b border-white/10 text-xs sm:text-base text-gray-400">
                      <td className="text-left px-2 sm:px-3 py-1 sm:py-2 w-8 sm:w-12">
                        #
                      </td>
                      <td className="text-left px-2 sm:px-3 py-1 sm:py-2">
                        Name
                      </td>
                      {isLeader && (
                        <td className="text-center px-2 sm:px-3 py-1 sm:py-2">
                          Pass
                        </td>
                      )}
                      <td className="text-right px-2 sm:px-3 py-1 sm:py-2">
                        Actions
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {team.members && team.members.length > 0 ? (
                      team.members.map((member, idx) => {
                        const isTeamLeader = team.leaderId === member.userId;
                        const isCurrentUser = currentUser?.id === member.userId;
                        return (
                          <tr
                            key={member.userId}
                            className={`border-b border-white/5 transition ${isCurrentUser
                              ? "bg-yellow-500/10 border-l-2 border-l-yellow-500"
                              : "hover:bg-white/5"
                              }`}
                          >
                            <td className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-base text-gray-400">
                              {idx + 1}
                            </td>
                            <td className="px-2 sm:px-3 py-1 sm:py-2">
                              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                <span className="text-white font-medium text-sm sm:text-base">
                                  {member.user?.firstName || member.firstName}{" "}
                                  {member.user?.lastName ||
                                    member.lastName ||
                                    ""}
                                </span>
                                {isTeamLeader && (
                                  <span className="text-xs sm:text-sm px-1 sm:px-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded whitespace-nowrap">
                                    Leader
                                  </span>
                                )}
                              </div>
                            </td>
                            {isLeader && (
                              <td className="text-center px-2 sm:px-3 py-1 sm:py-2">
                                <span
                                  className={`text-xs sm:text-base rounded font-medium ${memberPasses[member.userId]
                                    ? " text-green-400"
                                    : " text-red-400"
                                    }`}
                                >
                                  {memberPasses[member.userId]
                                    ? "Eligible"
                                    : "Not Eligible"}
                                </span>
                              </td>
                            )}
                            <td className="text-right px-2 sm:px-3 py-1 sm:py-2">
                              {isLeader && team.leaderId !== member.userId && (
                                <button
                                  onClick={() =>
                                    handleRemoveMember(member.userId)
                                  }
                                  disabled={removingMemberId === member.userId}
                                  className="text-xs sm:text-base px-1 text-red-400 cursor-pointer bg-red-500/20 border border-red-500/30 rounded whitespace-nowrap disabled:opacity-50"
                                >
                                  {removingMemberId === member.userId
                                    ? "..."
                                    : "Remove"}
                                </button>
                              )}
                              {currentUser?.id === member.userId &&
                                !isLeader && (
                                  <button
                                    onClick={handleLeaveTeam}
                                    disabled={leavingTeam}
                                    className="text-orange-400 px-1.5 border border-orange-400/60 bg-orange-700/20 rounded-md cursor-pointer hover:text-orange-300 text-sm sm:text-base"
                                  >
                                    {leavingTeam ? "..." : "Leave"}
                                  </button>
                                )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="px-2 sm:px-3 py-1 sm:py-2 text-gray-400 text-xs sm:text-base"
                        >
                          No members yet
                        </td>
                      </tr>
                    )}

                    {/* Pending Members - User Confirmation */}
                    {pendingMembers.length > 0 &&
                      pendingMembers.map((member, idx) => (
                        <tr
                          key={`pending-${member.id}`}
                          className="bg-yellow-500/10 border-b border-white/5"
                        >
                          <td className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-base text-gray-400">
                            {(team.members?.length || 0) + idx + 1}
                          </td>
                          <td className="px-2 sm:px-3 py-1 sm:py-2">
                            <div className="flex flex-col">
                              <span className="text-white font-medium text-xs sm:text-base">
                                {member.firstName} {member.lastName || ""}
                              </span>
                              <span className="text-xs text-gray-400 truncate">
                                {member.email}
                              </span>
                            </div>
                          </td>
                          <td
                            colSpan={2}
                            className="text-right px-2 sm:px-3 py-1 sm:py-2"
                          >
                            <div className="flex gap-0.5 sm:gap-1 justify-end">
                              <button
                                title="Add"
                                onClick={() =>
                                  handleAddMember(member.id, team.teamcode)
                                }
                                disabled={approvingMemberId === member.id}
                                className="px-1.5 sm:px-2 py-0.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-xs sm:text-base font-normal rounded whitespace-nowrap"
                              >
                                {approvingMemberId === member.id
                                  ? "..."
                                  : "Approve"}
                              </button>
                              <button
                                title="Cancel"
                                onClick={() => handleRemovePending(member.id)}
                                className="px-1.5 sm:px-3 py-0.5 sm:py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs sm:text-base font-medium rounded"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {/* Add Member Row */}
                    {isLeader && canAddMembers && (
                      <tr className="border-t-2 border-white/10 bg-green-500/5">
                        <td colSpan="4" className="px-2 sm:px-3 py-2 sm:py-3">
                          <div className="flex gap-1 sm:gap-2 items-center">
                            <input
                              type="text"
                              value={abidInput}
                              onChange={(e) =>
                                setAbidInput(e.target.value.toUpperCase())
                              }
                              placeholder="Enter ABID"
                              className="flex-1 px-2 sm:px-3 py-1 bg-white/5 border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 text-sm sm:text-base"
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSearchUser()
                              }
                            />
                            <button
                              onClick={handleSearchUser}
                              disabled={searchingUser || !abidInput.trim()}
                              className="px-2 sm:px-3 py-1 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-xs sm:text-base font-medium rounded whitespace-nowrap"
                            >
                              {searchingUser ? "..." : "✓"}
                            </button>
                            <button
                              onClick={() => setAbidInput("")}
                              className="px-2 sm:px-3 sm:py-1 bg-gray-600 hover:bg-gray-500 text-white text-base font-medium rounded"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Submit Link/Code - Only for Leaders */}
          {isLeader && (
            <div className="pt-4 border-t border-white/10">
              <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-3">
                Submit Link / Code{" "}
                <span className="text-gray-400 text-xs font-normal">
                  (Optional)
                </span>
              </label>
              <div className="flex gap-2 items-start">
                <div className="flex-1 flex flex-col">
                  <input
                    type="text"
                    value={submissionString}
                    onChange={(e) => setSubmissionString(e.target.value)}
                    placeholder="Paste your submission link or code"
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition text-xs sm:text-base"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Update anytime before deadline
                  </p>
                </div>
                <button
                  onClick={handleSubmitTeam}
                  disabled={submittingSubmission || !submissionString.trim()}
                  className="px-4 sm:px-5 py-2 h-10 bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-medium rounded transition-all text-sm sm:text-base whitespace-nowrap flex-shrink-0 mt-0.5"
                >
                  {submittingSubmission ? "..." : "Submit"}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamModal;
