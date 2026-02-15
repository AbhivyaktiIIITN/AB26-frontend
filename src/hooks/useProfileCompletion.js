import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { checkMissingProfileFields } from "../lib/user-client";

/**
 * Hook to check if user profile is complete after login
 * Returns: { showModal, missingFields, closeModal }
 *
 * Usage:
 * const { showModal, missingFields, closeModal } = useProfileCompletion();
 *
 * if (showModal) {
 *   return <ProfileCompletionModal onClose={closeModal} />;
 * }
 */
export const useProfileCompletion = () => {
  const { user, isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user || checked) return;

    const checkProfile = async () => {
      try {
        // Add a small delay to ensure user is fully loaded
        setTimeout(async () => {
          const result = await checkMissingProfileFields(user.id);

          if (!result.isComplete && result.missingFields.length > 0) {
            setMissingFields(result.missingFields);
            setShowModal(true);
          }
          setChecked(true);
        }, 500);
      } catch (err) {
        console.error("Error checking profile completion:", err);
        setChecked(true);
      }
    };

    checkProfile();
  }, [isAuthenticated, user, checked]);

  const closeModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    missingFields,
    closeModal,
  };
};

export default useProfileCompletion;
