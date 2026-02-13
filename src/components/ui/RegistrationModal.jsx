import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthProvider";
import { useToast } from "../../contexts/ToastContext";
import {
  registerForIndividualEvent,
  registerTeamForEvent,
} from "../../lib/registration-client";
import { useAuthModal } from "../auth/ModalAuthLayout";

const styles = {
  overlay:
    "fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50",
  modal:
    "bg-[#0f0f0f] rounded-2xl border border-yellow-500/20 shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto",
  header:
    "sticky top-0 flex justify-between items-center px-6 py-5 border-b border-white/10 bg-linear-to-r from-yellow-900/20 to-transparent",
  title: "text-2xl font-bold text-white",
  closeBtn:
    "text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer",
  section: "p-6 space-y-4",
  sectionTitle: "text-lg font-semibold text-white",
  buttonGroup: "flex gap-3",
  button:
    "flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200",
  primaryBtn:
    "bg-yellow-500 text-black hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/50",
  secondaryBtn:
    "bg-white/10 text-white hover:bg-white/20 border border-white/20",
  label: "block text-sm font-medium text-gray-300 mb-2",
  input:
    "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition",
  teamMemberRow:
    "flex gap-4 items-center bg-white/5 p-4 rounded-lg border border-white/10",
  passStatus: "flex items-center gap-2",
  submitBtn:
    "w-full px-4 py-2.5 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  errorText: "text-red-400 text-sm",
};

export default function RegistrationModal({
  eventId,
  eventName,
  maxTeamSize = 1,
  minTeamSize = 1,
  onClose,
  onCloseEvent,
}) {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const { openAuth } = useAuthModal();

  // State management
  const [registrationMode, setRegistrationMode] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize team members array
  useEffect(() => {
    if (registrationMode === "create" && maxTeamSize > 1) {
      const initialMembers = Array(minTeamSize)
        .fill(null)
        .map((_, idx) => ({
          abid: idx === 0 ? user?.abid || "" : "",
          hasPass: idx === 0 ? "yes" : "no",
          isLeader: idx === 0,
        }));
      setTeamMembers(initialMembers);
    }
  }, [registrationMode, minTeamSize, maxTeamSize, user]);

  // Check authentication
  if (!isAuthenticated) {
    showToast("Please login to start Registeration", "error");
    onCloseEvent?.();
    openAuth("signin");

    return null;
  }

  // Handle adding more team members
  const addTeamMember = () => {
    if (teamMembers.length < maxTeamSize) {
      setTeamMembers([
        ...teamMembers,
        { abid: "", hasPass: "no", isLeader: false },
      ]);
    }
  };

  // Handle updating team member
  const updateTeamMember = (idx, field, value) => {
    const updated = [...teamMembers];
    updated[idx][field] = value;
    setTeamMembers(updated);
  };

  // Handle team member removal
  const removeTeamMember = (idx) => {
    if (idx === 0) {
      showToast("Cannot remove team leader", "error");
      return;
    }
    setTeamMembers(teamMembers.filter((_, i) => i !== idx));
  };

  // Handle solo registration
  const handleSoloRegister = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await registerForIndividualEvent(
        user.id,
        eventId,
        "solo_registration",
      );

      if (result.success) {
        showToast("Successfully registered!", "success");
        onClose();
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle team creation and registration
  const handleCreateTeam = async () => {
    try {
      setLoading(true);
      setError("");

      if (teamMembers.some((m) => !m.abid?.trim())) {
        setError("All team members must have an ABID");
        return;
      }

      if (
        teamMembers.length < minTeamSize ||
        teamMembers.length > maxTeamSize
      ) {
        setError(`Team size must be between ${minTeamSize} and ${maxTeamSize}`);
        return;
      }

      const membersList = teamMembers.map((m) => m.abid).join(",");
      const result = await registerTeamForEvent(
        user.id,
        `team_${Date.now()}`,
        membersList,
      );

      if (result.success) {
        showToast("Team registered successfully!", "success");
        onClose();
      } else {
        setError(result.error || "Team registration failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle joining existing team
  const handleJoinTeam = async () => {
    try {
      setLoading(true);
      setError("");

      if (!teamId.trim()) {
        setError("Please enter a team ID");
        return;
      }

      const result = await registerTeamForEvent(user.id, teamId, user.abid);

      if (result.success) {
        showToast("Successfully joined team!", "success");
        onClose();
      } else {
        setError(result.error || "Failed to join team");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.overlay}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{eventName}</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className={styles.section}>
          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mode Selection */}
          <AnimatePresence mode="wait">
            {!registrationMode && (
              <motion.div
                key="mode-selection"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {maxTeamSize === 1 ? (
                  // Solo event
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      This is a solo event. Click register to proceed.
                    </p>
                    <button
                      onClick={handleSoloRegister}
                      disabled={loading}
                      className={styles.submitBtn}
                    >
                      {loading ? "Registering..." : "Register Now"}
                    </button>
                  </div>
                ) : (
                  // Team event
                  <div className="space-y-4">
                    <div>
                      <h3 className={styles.sectionTitle}>
                        Choose Registration Mode
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Team: {minTeamSize}-{maxTeamSize} members
                      </p>
                    </div>
                    <div className={styles.buttonGroup}>
                      <button
                        onClick={() => setRegistrationMode("create")}
                        className={`${styles.button} ${styles.primaryBtn}`}
                      >
                        Create Team
                      </button>
                      <button
                        onClick={() => setRegistrationMode("join")}
                        className={`${styles.button} ${styles.secondaryBtn}`}
                      >
                        Join Team
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Create Team Mode */}
            {registrationMode === "create" && (
              <motion.div
                key="create-team"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className={styles.sectionTitle}>Create Team</h3>
                  <span className="text-sm text-yellow-400">
                    {teamMembers.length}/{maxTeamSize}
                  </span>
                </div>

                {/* Team Members List */}
                <div className="space-y-3">
                  {teamMembers.map((member, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={styles.teamMemberRow}
                    >
                      <div className="flex-1">
                        <label className={styles.label}>
                          {idx === 0
                            ? "Team Leader (You)"
                            : `Member ${idx + 1}`}
                        </label>
                        <input
                          type="text"
                          placeholder="ABI"
                          onChange={(e) =>
                            updateTeamMember(idx, "abid", e.target.value)
                          }
                          disabled={idx === 0}
                          className={styles.input}
                        />
                      </div>

                      {/* Pass Status */}
                      <div className={styles.passStatus}>
                        <label className={styles.label}>Pass</label>
                        <select
                          value={member.hasPass}
                          onChange={(e) =>
                            updateTeamMember(idx, "hasPass", e.target.value)
                          }
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-500/50 transition"
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      {/* Remove button */}
                      {idx !== 0 && (
                        <button
                          onClick={() => removeTeamMember(idx)}
                          className="text-red-400 hover:text-red-300 font-bold transition"
                        >
                          ✕
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Add member button */}
                {teamMembers.length < maxTeamSize && (
                  <button
                    onClick={addTeamMember}
                    className={`${styles.button} ${styles.secondaryBtn} w-full`}
                  >
                    + Add Member ({teamMembers.length}/{maxTeamSize})
                  </button>
                )}

                {/* Submit & Back buttons */}
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => setRegistrationMode(null)}
                    className={`${styles.button} ${styles.secondaryBtn}`}
                  >
                    Back
                  </button>{" "}
                  <button
                    onClick={handleCreateTeam}
                    disabled={loading}
                    className={`${styles.button} ${styles.primaryBtn}`}
                  >
                    {loading ? "Creating Team..." : "Create & Register"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Join Team Mode */}
            {registrationMode === "join" && (
              <motion.div
                key="join-team"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className={styles.sectionTitle}>Join Existing Team</h3>

                <div>
                  <label className={styles.label}>Team ID</label>
                  <input
                    type="text"
                    placeholder="Enter team ID"
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                    className={styles.input}
                  />
                </div>

                {/* Submit & Back buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleJoinTeam}
                    disabled={loading}
                    className={styles.submitBtn}
                  >
                    {loading ? "Joining..." : "Join Team"}
                  </button>
                  <button
                    onClick={() => setRegistrationMode(null)}
                    className={`${styles.button} ${styles.secondaryBtn} w-full`}
                  >
                    Back
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
