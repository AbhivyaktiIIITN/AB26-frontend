const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URL;

export const registerForMUN = async (payload) => {
    try {
        const response = await fetch(`${BASE_URL}/api/register/mun`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // For auth cookies
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || data.error || "Failed to register for MUN",
            };
        }

        return {
            success: true,
            message: data.message || "Successfully registered for MUN",
            ...data,
        };
    } catch (error) {
        console.error("MUN Registration API Error:", error);
        return {
            success: false,
            message: "A network error occurred while registering for MUN",
        };
    }
};

export const getMUNRegistration = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/register/mun`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // For auth cookies
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.error || data.message || "MUN registration not found",
            };
        }

        return {
            success: true,
            registration: data.registration,
        };
    } catch (error) {
        console.error("Fetch MUN Registration Error:", error);
        return {
            success: false,
            message: "A network error occurred while fetching MUN registration",
        };
    }
};

export const getMUNRegistrationByAbId = async (abId) => {
    if (!abId) return { success: false, message: "No AB ID provided" };
    try {
        const response = await fetch(`${BASE_URL}/api/register/mun/${abId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // For auth cookies
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.error || data.message || "MUN registration not found",
            };
        }

        return {
            success: true,
            registration: data.registration,
        };
    } catch (error) {
        console.error("Fetch MUN Registration by ABID Error:", error);
        return {
            success: false,
            message: "A network error occurred while fetching MUN registration by ABID",
        };
    }
};
