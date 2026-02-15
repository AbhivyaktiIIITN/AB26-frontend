const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getUserRegData = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/reg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user registration data: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user registration data:", error);
    throw error;
  }
};

export const getUserPassesAndAccommodations = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/pass-acc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user passes and accommodations: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user passes and accommodations:", error);
    throw error;
  }
};

export const getUserBySerialId = async (serialId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/user/serial/${serialId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      return {
        success: false,
        exists: false,
        error: `User not found: ${response.statusText}`,
        user: null,
      };
    }

    const data = await response.json();
    return {
      success: true,
      exists: true,
      message: "User found successfully",
      user: data.user || data,
    };
  } catch (error) {
    console.error("Error searching user by serial ID:", error);
    return {
      success: false,
      exists: false,
      error: error.message || "An error occurred while searching for user",
      user: null,
    };
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    // Transform profileData to propertiesToUpdate format
    const propertiesToUpdate = {};

    if (profileData.collegeName)
      propertiesToUpdate.collegeName = profileData.collegeName;
    if (profileData.phoneNumber)
      propertiesToUpdate.phoneNumber = profileData.phoneNumber;
    if (profileData.dateOfBirth)
      propertiesToUpdate.date_of_birth = profileData.dateOfBirth;

    const response = await fetch(`${API_BASE_URL}/api/user/profile/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
        propertiesToUpdate,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      success: false,
      error: error.message || "Failed to update profile",
    };
  }
};

// Helper function to check if profile fields are missing
export const checkMissingProfileFields = async (userId) => {
  try {
    const result = await getUserProfile(userId);

    if (!result.success || !result.user) {
      return {
        isComplete: false,
        missingFields: ["phoneNumber", "collegeName"],
        user: null,
      };
    }

    const user = result.user;
    const missingFields = [];

    // Check for missing required fields
    if (!user.phoneNumber || user.phoneNumber.trim() === "") {
      missingFields.push("phoneNumber");
    }
    if (!user.collegeName || user.collegeName.trim() === "") {
      missingFields.push("collegeName");
    }
    // date_of_birth is optional, just informational

    return {
      isComplete: missingFields.length === 0,
      missingFields,
      user,
    };
  } catch (error) {
    console.error("Error checking profile fields:", error);
    return {
      isComplete: false,
      missingFields: ["phoneNumber", "collegeName"],
      user: null,
    };
  }
};

export default {
  getUserProfile,
  getUserRegData,
  getUserPassesAndAccommodations,
  getUserBySerialId,
  updateUserProfile,
  checkMissingProfileFields,
};
