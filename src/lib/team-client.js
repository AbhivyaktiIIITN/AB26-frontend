const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URL;

export const createTeam = async (teamData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/team/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(teamData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to create team",
      };
    }

    return {
      success: true,
      team: data.team,
      registration: data.registration,
      message: data.message || "Team created successfully",
    };
  } catch (error) {
    console.error("Create team error:", error);
    return {
      success: false,
      error: error.message || "An error occurred while creating team",
    };
  }
};

export const joinTeam = async (userId, teamCode) => {
  try {
    const response = await fetch(`${BASE_URL}/api/team/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
        teamCode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to join team",
      };
    }

    return {
      success: true,
      team: data.team,
      message: data.message || "Joined team successfully",
    };
  } catch (error) {
    console.error("Join team error:", error);
    return {
      success: false,
      error: error.message || "An error occurred while joining team",
    };
  }
};

export const getTeam = async (teamId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/team/${teamId}`, {
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
        error: data.error || "Failed to fetch team",
        team: null,
      };
    }

    return {
      success: true,
      team: data.team,
      registrationId: data.registrationId,
      message: "Team fetched successfully",
    };
  } catch (error) {
    console.error("Get team error:", error);
    return {
      success: false,
      error: error.message || "An error occurred while fetching team",
      team: null,
    };
  }
};

export const leaveTeam = async (teamId, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/team/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        teamId,
        userId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to leave team",
      };
    }

    return {
      success: true,
      message: data.message || "Left team successfully",
    };
  } catch (error) {
    console.error("Leave team error:", error);
    return {
      success: false,
      error: error.message || "An error occurred while leaving team",
    };
  }
};

export const removeMember = async (leaderId, teamId, memberIdToRemove) => {
  try {
    const response = await fetch(`${BASE_URL}/api/team/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        leaderId,
        teamId,
        memberIdToRemove,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to remove member",
      };
    }

    return {
      success: true,
      message: data.message || "Member removed successfully",
    };
  } catch (error) {
    console.error("Remove member error:", error);
    return {
      success: false,
      error: error.message || "An error occurred while removing member",
    };
  }
};

export const deleteTeam = async (teamId, leaderId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/team/${teamId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        leaderId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to delete team",
      };
    }

    return {
      success: true,
      message: data.message || "Team deleted successfully",
    };
  } catch (error) {
    console.error("Delete team error:", error);
    return {
      success: false,
      error: error.message || "An error occurred while deleting team",
    };
  }
};

export default {
  createTeam,
  joinTeam,
  getTeam,
  leaveTeam,
  removeMember,
  deleteTeam,
};
