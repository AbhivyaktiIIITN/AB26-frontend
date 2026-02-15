import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthProvider";
import { useToast } from "../../contexts/ToastContext";
import { getEventById } from "../../lib/event-client";
import {
  getTeam,
  joinTeam,
  leaveTeam,
  removeMember,
} from "../../lib/team-client";
import { registerTeamForEvent } from "../../lib/registration-client";

// Helper function to convert ABID to serial ID
const abidToSerialId = (abid) => {
  if (!abid) return null;
  const num = parseInt(abid.replace(/[^0-9]/g, ""));
  return isNaN(num) ? null : num;
};

const TeamModal = ({ teamId, eventId, onClose, onSuccess }) => {
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();

  // State
  const [team, setTeam] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [abidInput, setAbidInput] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [submissionString, setSubmissionString] = useState("");
  const [removingConfirm, setRemovingConfirm] = useState(null);

  // Fetch team and event data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [teamRes, eventRes] = await Promise.all([
          getTeam(teamId),
          getEventById(eventId),
        ]);

        if (teamRes.success) {
          setTeam(teamRes.data);
          setSubmissionString(teamRes.data?.submissionString || "");
        } else {
          showToast(teamRes.error || "Failed to load team", "error");
        }

        if (eventRes.success) {
          setEvent(eventRes.event);
        }
      } catch (error) {
        showToast("Error loading data", "error");
      } finally {
        setLoading(false);
      }
    };

    if (teamId && eventId) {
      fetchData();
    }
  }, [teamId, eventId, showToast]);

  // Check if current user is team leader
  const isLeader = team?.leaderId === currentUser?.id;

  // Get current team member count
  const currentMemberCount =
    (team?.members?.length || 0) + pendingMembers.length;
  const maxMembers = event?.maxTeamSize || 5;
  const minMembers = event?.minTeamSize || 2;
  const canAddMembers = isLeader && currentMemberCount < maxMembers;

  // Search user by ABID
  const handleSearchUser = async () => {
    if (!abidInput.trim()) {
      showToast("Please enter an ABID", "error");
      return;
    }

    const serialId = abidToSerialId(abidInput);
    if (!serialId) {
      showToast("Invalid ABID format (use AB00123)", "error");
      return;
    }

    try {
      setSearchingUser(true);
      const BASE_URL =
        import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URL;

      const response = await fetch(
        `${BASE_URL}/api/user/serial/${serialId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

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
      setSubmitting(true);
      const result = await joinTeam(userId, teamCode);

      if (result.success) {
        setPendingMembers(pendingMembers.filter((m) => m.id !== userId));

        // Refresh team data
        const teamRes = await getTeam(teamId);
        if (teamRes.success) {
          setTeam(teamRes.data);
        }
        showToast("Member added successfully", "success");
      } else {
        showToast(result.error || "Failed to add member", "error");
      }
    } catch (error) {
      showToast(error.message || "Error adding member", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Remove member from team
  const handleRemoveMember = async (memberId) => {
    try {
      setSubmitting(true);
      const result = await removeMember(teamId, memberId, currentUser?.id);

      if (result.success) {
        setRemovingConfirm(null);

        // Refresh team data
        const teamRes = await getTeam(teamId);
        if (teamRes.success) {
          setTeam(teamRes.data);
        }
        showToast("Member removed successfully", "success");
      } else {
        showToast(result.error || "Failed to remove member", "error");
      }
    } catch (error) {
      showToast(error.message || "Error removing member", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Leave team (current user)
  const handleLeaveTeam = async () => {
    try {
      setSubmitting(true);
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
      setSubmitting(false);
    }
  };

  // Submit team registration
  const handleSubmitTeam = async () => {
    try {
      setSubmitting(true);

      const result = await registerTeamForEvent(
        currentUser?.id,
        teamId,
        submissionString || "",
      );

      if (result.success) {
        showToast("Team registration submitted successfully!", "success");
        if (onSuccess) onSuccess();
        setTimeout(() => onClose(), 800);
      } else {
        showToast(result.error || "Failed to register team", "error");
      }
    } catch (error) {
      console.error("Team submission error:", error);
      showToast("Error submitting team registration", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-999 p-4"
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
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-999 p-4"
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
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-999 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-[#0f0f0f] rounded-2xl border border-yellow-500/20 shadow-2xl w-[90vw] md:w-full md:max-w-2xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center px-6 py-5 border-b border-white/10 bg-gradient-to-r from-yellow-900/20 to-transparent">
          <div>
            <h2 className="text-2xl font-bold text-white">{team.name}</h2>
            <p className="text-gray-400 text-sm">
              {team.members?.length || 0}/{maxMembers} members
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Team Members Table */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Team Members
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {team.members && team.members.length > 0 ? (
                team.members.map((member) => (
                  <div
                    key={member.userId}
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-yellow-500/30 flex items-center justify-center text-white text-sm font-semibold">
                        {member.firstName?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-white font-medium truncate">
                            {member.firstName} {member.lastName || ""}
                          </p>
                          {team.leaderId === member.userId && (
                            <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded whitespace-nowrap">
                              Admin
                            </span>
                          )}
                          {currentUser?.id === member.userId && (
                            <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded whitespace-nowrap">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs truncate">
                          {member.email}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-2">
                      {/* Remove by Leader */}
                      {isLeader && team.leaderId !== member.userId && (
                        <div>
                          {removingConfirm === member.userId ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() =>
                                  handleRemoveMember(member.userId)
                                }
                                disabled={submitting}
                                className="text-red-400 hover:text-red-300 disabled:opacity-50 transition"
                                title="Confirm remove"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => setRemovingConfirm(null)}
                                className="text-gray-400 hover:text-gray-300 transition"
                                title="Cancel"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setRemovingConfirm(member.userId)}
                              className="text-gray-400 hover:text-red-400 transition"
                              title="Remove member"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}

                      {/* Leave Team (current user, not leader) */}
                      {currentUser?.id === member.userId && !isLeader && (
                        <button
                          onClick={handleLeaveTeam}
                          disabled={submitting}
                          className="text-gray-400 hover:text-orange-400 disabled:opacity-50 transition"
                          title="Leave team"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No members yet</p>
              )}
            </div>
          </div>

          {/* Pending Members */}
          {pendingMembers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Pending Members
              </h3>
              <div className="space-y-2">
                {pendingMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/30 flex items-center justify-center text-white text-sm font-semibold">
                        {member.firstName?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">
                          {member.firstName} {member.lastName || ""}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {member.email}
                        </p>
                      </div>
                    </div>

                    {/* Actions - Confirm or Cancel */}
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() =>
                          handleAddMember(member.id, team.teamCode)
                        }
                        disabled={submitting}
                        className="text-green-400 hover:text-green-300 disabled:opacity-50 transition"
                        title="Add to team"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRemovePending(member.id)}
                        className="text-red-400 hover:text-red-300 transition"
                        title="Remove from pending"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Member Section (Leader Only) */}
          {isLeader && canAddMembers && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-white mb-3">
                Add Member by ABID
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={abidInput}
                  onChange={(e) => setAbidInput(e.target.value.toUpperCase())}
                  placeholder="Enter ABID (e.g., AB00123)"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition text-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleSearchUser()}
                />
                <button
                  onClick={handleSearchUser}
                  disabled={searchingUser || !abidInput.trim()}
                  className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition-all disabled:opacity-50 text-sm whitespace-nowrap"
                >
                  {searchingUser ? "Searching..." : "Add"}
                </button>
              </div>
            </div>
          )}

          {isLeader && !canAddMembers && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              Team is full ({currentMemberCount}/{maxMembers})
            </div>
          )}

          {/* Submission String */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Submission Link (Optional)
            </label>
            <textarea
              value={submissionString}
              onChange={(e) => setSubmissionString(e.target.value)}
              placeholder="Paste your submission link or code..."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition text-sm resize-none h-20"
            />
            <p className="text-xs text-gray-500 mt-1">Auto-saved to team</p>
          </div>

          {/* Submit Button (Leader Only) */}
          {isLeader && (
            <button
              onClick={handleSubmitTeam}
              disabled={submitting}
              className="w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-all"
            >
              {submitting ? "Submitting..." : "Submit Team Registration"}
            </button>
          )}

          {/* Team Info */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Team Code:</span>
              <code className="text-yellow-400 font-mono">
                {team.teamCode || "N/A"}
              </code>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Leader:</span>
              <span className="text-white">{team.leaderName || "Unknown"}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Team Size Limit:</span>
              <span className="text-white">
                {minMembers} - {maxMembers}
              </span>
            </div>
          </div>

          {/* Info Text */}
          <p className="text-xs text-gray-500 text-center">
            All changes are applied immediately. No final submit needed.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamModal;
