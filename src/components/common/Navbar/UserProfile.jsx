import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../../lib/user-client";

const UserProfile = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.id || profileData) return;
      try {
        setLoading(true);
        const data = await getUserProfile(user.id);
        setProfileData(data?.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchProfileData();
    }
  }, [isOpen, user?.id, profileData]);

  // Use serialId for AB ID
  const abId = profileData?.serialId
    ? `AB-${String(profileData.serialId).padStart(5, "0")}`
    : user?.serialId
      ? `AB-${String(user.serialId).padStart(5, "0")}`
      : "AB-" + user?.id?.slice(0, 6).toUpperCase();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
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
          onClick={() => navigate("/myaccount")}
          className="flex cursor-pointer items-center gap-3 focus:outline-none group"
          title={user?.firstName || "Profile"}
        >
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-semibold shadow-[0_0_15px_rgba(234,179,8,0.3)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.6)] transition-all duration-300 border-2 border-white/20 group-hover:border-yellow-300">
            {user?.image ? (
              <img
                src={user.image}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user?.firstName?.charAt(0)?.toUpperCase()
            )}
          </div>
        </button>

        {/* Hover Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 bg-black backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl overflow-hidden"
            >
              {/* User Info Header */}
              <div className="p-5 border-b border-white/10 bg-white/5">
                <h3 className="text-white font-bold text-lg truncate">
                  {user?.firstName} {user?.lastName || ""}
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  {profileData?.email || user?.email}
                </p>
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                  ID: {loading ? "-" : abId}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-2 border-t border-white/10 bg-white/5 mt-2 space-y-2">
                <button
                  onClick={() => {
                    navigate("/myaccount");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-white bg-white/10 hover:bg-white/15 rounded-lg transition-all duration-200 cursor-pointer"
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  View Profile
                </button>

                <button
                  onClick={async () => {
                    setIsLoggingOut(true);
                    try {
                      await logout();
                      setTimeout(() => navigate("/"), 500);
                    } catch (error) {
                      setIsLoggingOut(false);
                    }
                  }}
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium hover:text-red-400 text-white bg-red-500/10 hover:bg-red-500/15 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
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
                  {isLoggingOut ? "Processing..." : "Log Out"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default UserProfile;
