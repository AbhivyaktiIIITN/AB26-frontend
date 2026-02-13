export const padUserID = (userId, length = 6) => {
  if (!userId) return "0".repeat(length);
  return String(userId).padStart(length, "0");
};

export const formatABID = (userId, length = 6) => {
  if (!userId) return `AB_${"0".repeat(length)}`;
  const paddedId = String(userId).padStart(length, "0");
  return `AB_${paddedId}`;
};

export const useUserABID = () => {
  try {
    const { useSession } = require("../contexts/AuthProvider");
    const { data: session } = useSession();

    if (!session?.user?.id) {
      return formatABID(null);
    }

    return formatABID(session.user.id);
  } catch (error) {
    console.warn("Could not fetch user ABID:", error);
    return formatABID(null);
  }
};

export const getPaddedUserID = (userId) => {
  return padUserID(userId, 6);
};

export const extractIDFromABID = (abid) => {
  if (!abid) return null;
  const match = abid.match(/AB_(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};
