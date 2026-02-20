import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useToast } from "../../contexts/ToastContext";
import { updateUserProfile } from "../../lib/user-client";

const getErrorMessage = (error) => {
  const errorStr = error?.message?.toLowerCase() || "";

  if (errorStr.includes("phone")) return "Please enter a valid phone number";
  if (errorStr.includes("college")) return "Please enter your college name";
  if (
    errorStr.includes("network") ||
    errorStr.includes("connect") ||
    errorStr.includes("failed to fetch")
  )
    return "Network error. Check your connection";
  if (errorStr.includes("cors"))
    return "Connection issue. Check your network and try again";

  return "Failed to update profile. Please try again";
};

export default function ProfileCompletionModal({ onClose, onSuccess }) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [collegeName, setCollegeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("profileCompletionData");
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setCollegeName(data.collegeName || "");
        setPhoneNumber(data.phoneNumber || "");
        setDateOfBirth(data.dateOfBirth || "");
      } catch (err) {
        console.error("Error loading saved profile data:", err);
      }
    }
  }, []);

  // Save to localStorage whenever fields change
  useEffect(() => {
    const data = {
      collegeName,
      phoneNumber,
      dateOfBirth,
    };
    localStorage.setItem("profileCompletionData", JSON.stringify(data));
  }, [collegeName, phoneNumber, dateOfBirth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!collegeName.trim()) {
        showToast("Please enter your college name", "error");
        return;
      }

      if (!phoneNumber.trim()) {
        showToast("Please enter your phone number", "error");
        return;
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phoneNumber.replace(/\D/g, ""))) {
        showToast("Please enter a valid 10-digit phone number", "error");
        return;
      }

      if (!dateOfBirth) {
        showToast("Please enter your date of birth", "error");
        return;
      }

      setLoading(true);

      const profileData = {
        collegeName: collegeName.trim(),
        phoneNumber: phoneNumber.trim(),
        dateOfBirth: new Date(dateOfBirth),
      };

      const result = await updateUserProfile(user.id, profileData);

      if (result.success) {
        showToast("Profile completed successfully!", "success");
        localStorage.removeItem("profileCompletionData");
        if (onSuccess) onSuccess();
        setTimeout(() => onClose(), 500);
      } else {
        showToast(getErrorMessage(result.error), "error");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      showToast(getErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row tracking-wide">
      {/* Left side - Brand/Image */}
      <div className="hidden md:flex md:w-1/2 items-start justify-start p-6 text-white text-center relative bg-gray-900 rounded-l-lg">
        <span className="text-xl font-semibold z-10 relative select-none">
          Abhivyakti'26
        </span>
        <img
          className="absolute inset-0 select-none w-full h-full object-cover opacity-80 rounded-l-lg"
          src="/registerimg.jpg"
          alt="Profile"
        />
      </div>

      {/* Right side - Form content */}
      <div className="w-full md:w-1/2 flex items-center justify-center pt-8 p-6 bg-white rounded-r-lg">
        <div className="w-full">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              COMPLETE PROFILE
            </h2>
            <p className="text-gray-500 text-md sm:text-lg font-medium">
              We need a few more details
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-6"
          >
            {/* College Name Input */}
            <div className="flex flex-col">
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="College Name"
                required
                disabled={loading}
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400 disabled:opacity-50"
              />
            </div>

            {/* Phone Number Input */}
            <div className="flex flex-col">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhoneNumber(value);
                }}
                placeholder="Phone Number (10 Digits)"
                pattern="[0-9]{10}"
                maxLength="10"
                required
                disabled={loading}
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400 disabled:opacity-50"
              />
            </div>

            {/* Date of Birth Input */}
            <div className="flex flex-col relative w-full">
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                onClick={(e) => e.target.showPicker?.()}
                disabled={loading}
                required
                className={`w-full p-3 sm:p-4 border-2 border-gray-600 rounded-none bg-transparent
                  text-sm sm:text-base transition-all duration-200 cursor-pointer
                  focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951]
                  z-10 relative
                  ${!dateOfBirth ? "text-transparent" : "text-gray-900"} 
                  disabled:opacity-50
                `}
              />

              {/* Fake placeholder */}
              {!dateOfBirth && (
                <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base pointer-events-none z-0">
                  Date of Birth
                </span>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-[#3C0919] border-2 tracking-wider text-white border-none p-2 sm:p-3 text-lg sm:text-xl cursor-pointer transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#5a0d29] hover:transform hover:shadow-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "Complete Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
