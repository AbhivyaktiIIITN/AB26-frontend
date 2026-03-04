import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../components/auth/ModalAuthLayout";
import FAQHint from "../components/ui/FAQHint";
import TeamModal from "../components/ui/TeamModal";
import PassModal from "../components/ui/PassModal";
import { useAuth } from "../contexts/AuthProvider";
import { useToast } from "../contexts/ToastContext";
import { serialIdToABID } from "../utils/abid-utils";
import { signOut } from "../lib/auth-client";
import { getEventById } from "../lib/event-client";
import { getMUNRegistrationByAbId } from "../lib/mun-client";
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

  // Modal state for Pass / Accommodation
  const [showPassModal, setShowPassModal] = useState(false);
  const [selectedPass, setSelectedPass] = useState(null);
  const [passModalType, setPassModalType] = useState('pass'); // 'pass' or 'accommodation'

  // Download state for hidden PassModal
  const [downloadingPass, setDownloadingPass] = useState(null);
  const [downloadingType, setDownloadingType] = useState(null);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [eventNames, setEventNames] = useState({});
  const [coDelegateRegs, setCoDelegateRegs] = useState([]);
  const [statusTooltip, setStatusTooltip] = useState(false);

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

        // Fetch co-delegate MUN registrations if they have an AB ID
        if (profile?.user?.serialId) {
          const abId = serialIdToABID(profile.user.serialId);
          if (abId) {
            try {
              const munRes = await getMUNRegistrationByAbId(abId);
              if (munRes?.success && munRes?.registration) {
                setCoDelegateRegs([munRes.registration]);
              }
            } catch (munErr) {
              console.error("Failed to fetch MUN co-delegate info:", munErr);
            }
          }
        }
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
      if (!regData?.user) return;

      const evtIds = [];
      const u = regData.user;
      if (u.registrations) u.registrations.forEach(r => r.eventId && evtIds.push(r.eventId));
      if (u.teamsMember) u.teamsMember.forEach(r => r.team?.eventId && evtIds.push(r.team.eventId));

      const eventIdSet = new Set(evtIds);
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
  }, [regData?.user]);

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
            onClick={() => navigate("/signin")}
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

  const handleOpenPassModal = (item, type) => {
    setSelectedPass(item);
    setPassModalType(type);
    setShowPassModal(true);
  };

  const handleDownloadPdf = (item, type) => {
    setDownloadingPass(item);
    setDownloadingType(type);
  };

  const handleClosePassModal = () => {
    setShowPassModal(false);
    setSelectedPass(null);
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

  let combinedRegistrations = [];
  if (regUser) {
    const individualRegs = regUser.registrations?.map(r => ({
      ...r,
      type: r.eventId === 'speaking_art_1' ? 'MUN' : 'Individual',
      displayName: r.eventId === 'speaking_art_1' ? 'abMUN' : null
    })) || [];
    const teamRegs = regUser.teamsMember?.map(member => ({
      id: member.teamId,
      eventId: member.team?.eventId,
      type: 'Team',
      status: member.team?.status,
      teamData: { ...member.team, id: member.teamId }
    })) || [];

    const coDelRegs = coDelegateRegs.map(reg => ({
      id: reg.id || `codel-${reg.eventId}`,
      eventId: reg.eventId || 'speaking_art_1',
      displayName: 'abMUN',
      type: 'MUN (Co-Delegate)',
      status: 'Registered',
    }));

    combinedRegistrations = [...individualRegs, ...teamRegs, ...coDelRegs];
  }

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
            {profileUser?.name ? (
              <h2
                className="text-3xl md:text-4xl font-semibold text-yellow-500"
                style={{ fontFamily: "var(--font-aquila)" }}
              >
                {profileUser.name}
              </h2>
            ) : (
              <SkeletonLoader />
            )}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="inline-flex items-center px-2 rounded-lg bg-black border border-red-600">
                <span className="text-gray-400 text-sm mr-2">AB ID:</span>
                <div className="text-red-500 font-bold text-lg flex items-center">
                  {profileUser?.serialId ? (
                    serialIdToABID(profileUser.serialId)
                  ) : (
                    <SkeletonLoader />
                  )}
                </div>
              </div>
            </div>
            {profileUser?.email ? (
              <p className="text-gray-400">{profileUser.email}</p>
            ) : (
              <SkeletonLoader />
            )}
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

          {/* Passes & Accommodations Card */}
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Passes & Accommodations
            </h2>
            <div className="space-y-6">
              {!passesData && !accommodationsData ? (
                <SkeletonTable />
              ) : (
                <>
                  {/* Passes */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 tracking-wider uppercase">Passes</h3>
                    {passesData?.length > 0 ? (
                      <div className="space-y-2">
                        {passesData.map((pass) => (
                          <div key={pass.id} className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded px-3 py-2">
                            <span className="text-white text-sm font-medium">{pass.passType?.name || "N/A"}</span>
                            <div className="flex items-center gap-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase bg-green-900/50 text-green-400 border border-green-800">
                                {pass.status || "Active"}
                              </span>
                              <button
                                className="px-3 py-1 text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 rounded transition-all cursor-pointer"
                                onClick={() => handleDownloadPdf(pass, 'pass')}
                              >
                                Download PDF
                              </button>
                              <button
                                className="px-3 py-1 text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 rounded transition-all cursor-pointer"
                                onClick={() => handleOpenPassModal(pass, 'pass')}
                              >
                                View
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-sm italic">No passes purchased</p>
                    )}
                  </div>

                  {/* Accommodations */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 tracking-wider uppercase">Accommodations</h3>
                    {accommodationsData?.length > 0 ? (
                      <div className="space-y-2">
                        {accommodationsData.map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded px-3 py-2">
                            <span className="text-white text-sm font-medium">{booking.accommodationType?.name || "N/A"}</span>
                            <div className="flex items-center gap-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase bg-green-900/50 text-green-400 border border-green-800">
                                {booking.status || "Active"}
                              </span>
                              <button
                                className="px-3 py-1 text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 rounded transition-all cursor-pointer"
                                onClick={() => handleDownloadPdf(booking, 'accommodation')}
                              >
                                Download PDF
                              </button>
                              <button
                                className="px-3 py-1 text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 rounded transition-all cursor-pointer"
                                onClick={() => handleOpenPassModal(booking, 'accommodation')}
                              >
                                View
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-sm italic">No accommodation bookings</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Combined Event Registrations Table */}
        <div className="mb-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Event Registrations
            </h2>
            {!regUser ? (
              <SkeletonTable />
            ) : combinedRegistrations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-sm text-gray-400">Event Name</th>
                      <th className="px-4 py-3 text-sm text-gray-400">Type</th>
                      <th className="px-4 py-3 text-sm text-gray-400 relative !overflow-visible">
                        <div className="flex items-center gap-1.5 relative">
                          <span className="whitespace-nowrap">Status</span>
                          <button
                            type="button"
                            className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer flex items-center justify-center -mb-0.5"
                            onMouseEnter={() => setStatusTooltip(true)}
                            onMouseLeave={() => setStatusTooltip(false)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setStatusTooltip(!statusTooltip);
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>

                          {/* Rich Tooltip - Appearing BELOW to avoid clipping */}
                          {statusTooltip && (
                            <div className="absolute top-full left-0 mt-2 w-64 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-[100] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                              <p className="text-[12px] leading-relaxed text-gray-200 font-normal">
                                <span className="text-yellow-500 font-bold block mb-1.5 text-xs uppercase tracking-wider">Eligibility Requirement</span>
                                Buy at least one pass to be eligible for these registered events and complete your team if it is incomplete.
                              </p>
                              <div className="absolute bottom-full left-4 border-8 border-transparent border-b-gray-900"></div>
                            </div>
                          )}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {combinedRegistrations.map((reg, idx) => (
                      <tr key={`${reg.type}-${reg.id}-${idx}`}>
                        <td className="px-4 py-3">
                          <span className="text-white font-medium">
                            {reg.displayName || eventNames[reg.eventId] || reg.eventId || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold ${reg.type === 'Team' ? 'bg-blue-900/50 text-blue-400 border border-blue-800' : reg.type === 'MUN' ? 'bg-yellow-900/40 text-yellow-500 border border-yellow-700' : reg.type === 'MUN (Co-Delegate)' ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-700' : 'bg-purple-900/50 text-purple-400 border border-purple-800'}`}>
                            {reg.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {Array.isArray(passesData) && passesData.length > 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-400 border border-green-800 capitalize">
                              {reg.status || "Active"}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-red-900/40 text-red-500 border border-red-800 capitalize">
                              Ineligible
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {reg.type === "Team" ? (
                            <button
                              onClick={() => handleTeamClick(reg.teamData)}
                              className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 rounded transition-all cursor-pointer"
                            >
                              View Team
                            </button>
                          ) : reg.type === "MUN" ? (
                            <button
                              onClick={() => navigate("/register/abmun")}
                              className="px-3 py-1.5 text-xs bg-yellow-900/30 hover:bg-yellow-900/60 text-yellow-500 border border-yellow-700 rounded transition-all cursor-pointer"
                            >
                              Edit Entry
                            </button>
                          ) : reg.type === "MUN (Co-Delegate)" ? (
                            <span className="text-gray-500 font-mono text-xs">-</span>
                          ) : (
                            <span className="text-gray-500 font-mono text-xs">-</span>
                          )}
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

      {/* Pass / Accommodation Modal */}
      <PassModal
        isOpen={showPassModal}
        onClose={handleClosePassModal}
        passData={selectedPass}
        type={passModalType}
      />

      {/* Hidden PassModal for download functionality */}
      <PassModal
        isOpen={!!downloadingPass}
        onClose={() => { setDownloadingPass(null); setDownloadingType(null); }}
        passData={downloadingPass}
        type={downloadingType}
        isDownloadMode={true}
      />

      <FAQHint label="How to add team members" />
    </div>
  );
};

export default UserData;
