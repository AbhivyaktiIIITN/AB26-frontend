const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URL;

export const registerForIndividualEvent = async (
  userId,
  eventId,
  submissionString = "",
) => {
  try {
    if (!userId || !eventId) {
      return {
        success: false,
        error: "Missing required parameters: userId and eventId",
      };
    }

    const response = await fetch(`${BASE_URL}/api/register/indv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
        eventId: String(eventId),
        submissionString,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to register for event",
      };
    }

    return {
      success: true,
      data: data.registration,
      message: data.message || "Registered successfully",
    };
  } catch (error) {
    console.error("Individual registration error:", error);
    return {
      success: false,
      error: error.message || "An error occurred during registration",
    };
  }
};

export const registerTeamForEvent = async (
  leaderId,
  teamId,
  submissionString = "",
) => {
  try {
    if (!leaderId || !teamId) {
      return {
        success: false,
        error: "Missing required parameters: leaderId and teamId",
      };
    }

    const response = await fetch(`${BASE_URL}/api/register/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        leaderId,
        teamId: String(teamId),
        submissionString,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to register team for event",
      };
    }

    return {
      success: true,
      data: data.registration,
      message: data.message || "Team registered successfully",
    };
  } catch (error) {
    console.error("Team registration error:", error);
    return {
      success: false,
      error: error.message || "An error occurred during team registration",
    };
  }
};

export const isUserRegisteredForEvent = async (userId, eventId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/register/check/indv?userId=${userId}&eventId=${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    const data = await response.json();
    return data.registered || false;
  } catch (error) {
    console.error("Check registration error:", error);
    return false;
  }
};

export const isTeamRegisteredForEvent = async (teamId, eventId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/register/check/team?teamId=${teamId}&eventId=${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    const data = await response.json();
    return data.registered || false;
  } catch (error) {
    console.error("Check team registration error:", error);
    return false;
  }
};

export const getUserRegistrations = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/register/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to fetch registrations",
        registrations: [],
      };
    }

    return {
      success: true,
      registrations: data.registrations || [],
    };
  } catch (error) {
    console.error("Get registrations error:", error);
    return {
      success: false,
      error: error.message,
      registrations: [],
    };
  }
};

export const getEventRegistrationCount = async (eventId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/register/event/${eventId}/count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to fetch registration count",
        count: 0,
      };
    }

    return {
      success: true,
      count: data.count || 0,
    };
  } catch (error) {
    console.error("Get registration count error:", error);
    return {
      success: false,
      error: error.message,
      count: 0,
    };
  }
};

export const cancelIndividualRegistration = async (registrationId, userId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/register/indv/${registrationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to cancel registration",
      };
    }

    return {
      success: true,
      message: data.message || "Registration cancelled successfully",
    };
  } catch (error) {
    console.error("Cancel registration error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const cancelTeamRegistration = async (registrationId, leaderId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/register/team/${registrationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ leaderId }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to cancel team registration",
      };
    }

    return {
      success: true,
      message: data.message || "Team registration cancelled successfully",
    };
  } catch (error) {
    console.error("Cancel team registration error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export default {
  registerForIndividualEvent,
  registerTeamForEvent,
  isUserRegisteredForEvent,
  isTeamRegisteredForEvent,
  getUserRegistrations,
  getEventRegistrationCount,
  cancelIndividualRegistration,
  cancelTeamRegistration,
};
