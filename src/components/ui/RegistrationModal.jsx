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
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
  modal: "bg-white rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto",
  header: "flex justify-between items-center mb-6",
  title: "text-2xl font-bold",
  closeBtn: "text-2xl cursor-pointer hover:text-red-500",
  section: "mb-6",
  sectionTitle: "text-lg font-semibold mb-3",
  buttonGroup: "flex gap-4 mb-6",
  button: "flex-1 px-4 py-2 rounded font-semibold transition",
  primaryBtn: "bg-blue-600 text-white hover:bg-blue-700",
  secondaryBtn: "bg-gray-300 text-black hover:bg-gray-400",
  activeBtn: "bg-green-600 text-white hover:bg-green-700",
  label: "block text-sm font-medium mb-2",
  input: "w-full px-3 py-2 border border-gray-300 rounded mb-3",
  teamMemberRow: "flex gap-4 mb-4 items-center bg-gray-50 p-3 rounded",
  passStatus: "flex items-center gap-2",
  submitBtn:
    "w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700",
  errorText: "text-red-600 mb-3",
  loader: "text-center py-4",
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
  const [registrationMode, setRegistrationMode] = useState(null); // null, "solo", "create", "join"
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
    onCloseEvent?.();
    onClose();
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

      // Validate team members
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
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{eventName} - Register</h2>
          <FaTimes className={styles.closeBtn} onClick={onClose} />
        </div>

        {/* Error message */}
        {error && (
          <div className={`${styles.errorText} p-3 bg-red-100 rounded`}>
            {error}
          </div>
        )}

        {/* Mode Selection - Show when not selected */}
        {!registrationMode && (
          <div>
            {maxTeamSize === 1 ? (
              // Solo event
              <div className={styles.section}>
                <p className="mb-4">
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
              // Team event - show options
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  Choose Registration Mode (Team: {minTeamSize}-{maxTeamSize}{" "}
                  members)
                </h3>
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
          </div>
        )}

        {/* Create Team Mode */}
        {registrationMode === "create" && (
          <div>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                Create Team ({teamMembers.length}/{maxTeamSize})
              </h3>

              {/* Team Members List */}
              {teamMembers.map((member, idx) => (
                <div key={idx} className={styles.teamMemberRow}>
                  <div className="flex-1">
                    <label className={styles.label}>
                      {idx === 0 ? "Team Leader (You)" : `Member ${idx + 1}`}
                    </label>
                    <input
                      type="text"
                      placeholder="ABID"
                      value={member.abid}
                      onChange={(e) =>
                        updateTeamMember(idx, "abid", e.target.value)
                      }
                      disabled={idx === 0}
                      className={styles.input}
                    />
                  </div>

                  {/* Pass Status */}
                  <div className={styles.passStatus}>
                    <label className={styles.label}>Pass:</label>
                    <select
                      value={member.hasPass}
                      onChange={(e) =>
                        updateTeamMember(idx, "hasPass", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  {/* Remove button */}
                  {idx !== 0 && (
                    <button
                      onClick={() => removeTeamMember(idx)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              {/* Add member button */}
              {teamMembers.length < maxTeamSize && (
                <button
                  onClick={addTeamMember}
                  className={`${styles.button} ${styles.secondaryBtn} w-full mb-4`}
                >
                  + Add Member ({teamMembers.length}/{maxTeamSize})
                </button>
              )}

              {/* Submit */}
              <button
                onClick={handleCreateTeam}
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading ? "Creating Team..." : "Create & Register"}
              </button>

              {/* Back button */}
              <button
                onClick={() => setRegistrationMode(null)}
                className={`${styles.button} ${styles.secondaryBtn} w-full mt-2`}
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Join Team Mode */}
        {registrationMode === "join" && (
          <div>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Join Existing Team</h3>

              <label className={styles.label}>Team ID</label>
              <input
                type="text"
                placeholder="Enter team ID"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className={styles.input}
              />

              <button
                onClick={handleJoinTeam}
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading ? "Joining..." : "Join Team"}
              </button>

              {/* Back button */}
              <button
                onClick={() => setRegistrationMode(null)}
                className={`${styles.button} ${styles.secondaryBtn} w-full mt-2`}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
