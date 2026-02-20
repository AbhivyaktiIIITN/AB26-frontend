const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const sendOTP = async (email) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Failed to send OTP");
    }

    return data;
  } catch (error) {
    console.error("Send OTP error:", error);
    throw error;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Invalid OTP. Please try again.");
    }

    return data;
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
};
