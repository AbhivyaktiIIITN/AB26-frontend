import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../components/auth/ModalAuthLayout";
import TeamModal from "../components/ui/TeamModal";
import { useAuth } from "../contexts/AuthProvider";
import { useToast } from "../contexts/ToastContext";
import { signOut } from "../lib/auth-client";
import { getEventById } from "../lib/event-client";
import {
  getUserPassesAndAccommodations,
  getUserProfile,
  getUserRegData,
} from "../lib/user-client";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="bg-gray-800 animate-pulse h-12 rounded-lg"></div>
);

const SkeletonTable = () => (
  <div className="space-y-2">
    <SkeletonLoader />
    <SkeletonLoader />
    <SkeletonLoader />
  </div>
);

// Format date to readable format (DD MMM YYYY)
const formatDate = (dateString) => {
  if (!dateString) return "Not provided";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Not provided";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Not provided";
  }
};

const UserData = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { openAuth } = useAuthModal();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // All state hooks MUST be at the top, before any conditional returns
  const [profileData, setProfileData] = useState(null);
  const [regData, setRegData] = useState(null);
  const [passesAccData, setPassesAccData] = useState(null);
  const [error, setError] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [eventNames, setEventNames] = useState({});

  // All effect hooks MUST be at the top, before any conditional returns
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id || !isAuthenticated) return;

      try {
        setError(null);

        const [profile, reg, passesAcc] = await Promise.all([
          getUserProfile(user.id),
          getUserRegData(user.id),
          getUserPassesAndAccommodations(user.id),
        ]);

        setProfileData(profile);
        setRegData(reg);
        setPassesAccData(passesAcc);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [user?.id, isAuthenticated]);

  // Fetch event names for registrations
  useEffect(() => {
    const fetchEventNames = async () => {
      if (!regData?.user?.registrations) return;

      const eventIdSet = new Set(
        regData.user.registrations.map((reg) => reg.eventId).filter(Boolean),
      );

      if (eventIdSet.size === 0) return;

      const names = {};
      const fetches = Array.from(eventIdSet).map((eventId) =>
        getEventById(eventId)
          .then((res) => {
            if (res.success && res.event?.name) {
              names[eventId] = res.event.name;
            }
          })
          .catch(() => {
            // Silently fail, will show ID as fallback
          }),
      );

      await Promise.all(fetches);
      setEventNames(names);
    };

    fetchEventNames();
  }, [regData?.user?.registrations]);

  // Handle logout
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      showToast("Logged out successfully", "success");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      console.error("Logout error:", error);
      showToast("Logout failed. Please try again.", "error");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Wait for authentication state to be determined before rendering anything
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black p-4 md:p-8 flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black p-4 md:p-8 flex items-center justify-center">
        <div className="bg-gray-900 border border-yellow-500/20 rounded-lg p-8 max-w-md text-center">
          <h2 className="text-3xl font-bold text-white mb-4">My Account</h2>
          <p className="text-gray-400 text-lg mb-6">
            Please log in to access your profile and view your registrations.
          </p>
          <button
            onClick={() => openAuth("signin")}
            className="bg-[#3C0919] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5a0d29] transition-all duration-200 hover:shadow-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setShowTeamModal(true);
  };

  const handleCloseTeamModal = () => {
    setShowTeamModal(false);
    setSelectedTeam(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black p-4 md:p-8 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 max-w-md">
          <p className="text-red-400 text-center">{error}</p>
        </div>
      </div>
    );
  }

  const profileUser = profileData?.user;
  const regUser = regData?.user;
  const passesData = passesAccData?.passes;
  const accommodationsData = passesAccData?.accommodations;

  return (
    <div className="min-h-screen pt-32 md:pt-32 bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header with Red Line */}
        <div className="mb-12">
          {/* Title Row with Red Line */}
          <div className="relative w-full flex justify-center mb-8">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4/5 h-0.5"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, rgba(220, 38, 38, 0.9) 20%, rgba(220, 38, 38, 1) 50%, rgba(220, 38, 38, 0.9) 80%, transparent 100%)",
                boxShadow: "0 0 6px rgba(220, 38, 38, 0.6)",
              }}
            ></div>
            <h1
              className="text-xl md:text-2xl font-bold text-white px-8 bg-black relative z-10"
              style={{ fontFamily: "var(--font-besta-baru)" }}
            >
              PROFILE
            </h1>
          </div>

          {/* User Name and Details */}
          <div className="text-center pt-4 space-y-4">
            <h2
              className="text-3xl md:text-4xl font-semibold text-yellow-500"
              style={{ fontFamily: "var(--font-aquila)" }}
            >
              {profileUser?.name || <SkeletonLoader />}
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="inline-flex items-center px-2 rounded-lg bg-black border border-red-600">
                <span className="text-gray-400 text-sm mr-2">AB ID:</span>
                <span className="text-red-500 font-bold text-lg">
                  {profileUser?.serialId ? (
                    `AB${String(profileUser.serialId).padStart(5, "0")}`
                  ) : (
                    <SkeletonLoader />
                  )}
                </span>
              </div>
            </div>
            <p className="text-gray-400">
              {profileUser?.email || <SkeletonLoader />}
            </p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Profile Information
            </h2>
            <div className="space-y-3">
              {!profileUser ? (
                <SkeletonTable />
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white font-medium">
                      {profileUser?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white font-medium">
                      {profileUser?.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white font-medium">
                      {profileUser?.phoneNumber || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">College:</span>
                    <span className="text-white font-medium">
                      {profileUser?.collegeName || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date of Birth:</span>
                    <span className="text-white font-medium">
                      {formatDate(profileUser?.date_of_birth)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Teams Card */}
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Teams
            </h2>
            {!regUser ? (
              <SkeletonTable />
            ) : (
              <div className="space-y-4">
                {regUser?.teamsLeading?.length > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-2">
                      Teams Leading
                    </h3>
                    <div className="space-y-2">
                      {regUser.teamsLeading.map((team) => (
                        <div
                          key={team.id}
                          className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded px-3 py-2 hover:bg-gray-800 transition-all"
                        >
                          <span className="text-white text-sm font-medium">
                            {team.name}
                          </span>
                          <button
                            onClick={() => handleTeamClick(team)}
                            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition-all cursor-pointer"
                          >
                            View Team
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {regUser?.teamsMember?.length > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-2">Teams Member</h3>
                    <div className="space-y-2">
                      {regUser.teamsMember.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded px-3 py-2 hover:bg-gray-800 transition-all"
                        >
                          <span className="text-white text-sm font-medium">
                            {member.team?.name}
                          </span>
                          <button
                            onClick={() => {
                              handleTeamClick({
                                ...member.team,
                                id: member.teamId,
                              });
                            }}
                            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition-all cursor-pointer"
                          >
                            View Team
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Registrations */}
        <div className="mb-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Registrations
            </h2>
            {!regUser ? (
              <SkeletonTable />
            ) : regUser?.registrations?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Event Name
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Status
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Registered At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {regUser.registrations.map((reg) => (
                      <tr key={reg.id}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-white font-medium">
                              {eventNames[reg.eventId] || reg.eventId || "N/A"}
                            </span>
                            {(reg.status?.toLowerCase() === "active" ||
                              reg.status?.toLowerCase() === "success") && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-green-900 text-green-400 border border-green-600">
                                Active
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                              reg.status?.toLowerCase() === "active" ||
                              reg.status?.toLowerCase() === "success"
                                ? "bg-green-900 text-green-400 border border-green-600"
                                : "bg-green-900 text-green-400 border border-green-600"
                            }`}
                          >
                            {reg.status || "Active"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">
                          {reg.created_at
                            ? new Date(reg.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No registrations yet</p>
            )}
          </div>
        </div>

        {/* Passes */}
        <div className="mb-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Passes
            </h2>
            {!passesData ? (
              <SkeletonTable />
            ) : passesData?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-sm text-gray-400">Sr No</th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Pass Name
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Status
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {passesData.map((pass, idx) => (
                      <tr key={pass.id}>
                        <td className="px-4 py-3 text-white font-medium">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3 text-white">
                          {pass.passType?.name || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium capitalize ${
                              pass.transaction?.status?.toLowerCase() ===
                                "active" ||
                              pass.transaction?.status?.toLowerCase() ===
                                "success"
                                ? "bg-green-900 text-green-400 border border-green-600"
                                : "bg-gray-900 text-red-400 border border-red-600"
                            }`}
                          >
                            {pass.transaction?.status || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">
                          {pass.transaction?.created_at
                            ? new Date(
                                pass.transaction.created_at,
                              ).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No passes purchased</p>
            )}
          </div>
        </div>

        {/* Accommodations */}
        <div className="mb-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Accommodation Bookings
            </h2>
            {!accommodationsData ? (
              <SkeletonTable />
            ) : accommodationsData?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-sm text-gray-400">Sr No</th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Accommodation Name
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Status
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {accommodationsData.map((booking, idx) => (
                      <tr key={booking.id}>
                        <td className="px-4 py-3 text-white font-medium">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3 text-white">
                          {booking.accommodationType?.name || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium capitalize ${
                              booking.transaction?.status?.toLowerCase() ===
                                "active" ||
                              booking.transaction?.status?.toLowerCase() ===
                                "success"
                                ? "bg-green-900 text-green-400 border border-green-600"
                                : "bg-gray-900 text-red-400 border border-red-600"
                            }`}
                          >
                            {booking.transaction?.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">
                          {booking.transaction?.created_at
                            ? new Date(
                                booking.transaction.created_at,
                              ).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No accommodation bookings</p>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center pb-8">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
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
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </div>

      {/* Team Modal */}
      {showTeamModal && selectedTeam && (
        <TeamModal
          teamId={selectedTeam.id}
          eventId={selectedTeam.eventId}
          onClose={handleCloseTeamModal}
          onSuccess={handleCloseTeamModal}
        />
      )}
    </div>
  );
};

export default UserData;
