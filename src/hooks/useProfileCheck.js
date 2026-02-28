import { useAuthModal } from "../components/auth/ModalAuthLayout";
import { useAuth } from "../contexts/AuthProvider";
import { useToast } from "../contexts/ToastContext";
import { checkMissingProfileFields } from "../lib/user-client";

/**
 * Returns an async function `requireCompleteProfile`.
 * Call it before any gated action (register for event, buy pass, etc.)
 *
 * Flow:
 *  1. Not logged in  → opens signin modal  → returns false
 *  2. Logged in, profile incomplete → opens profile-completion modal → returns false
 *  3. Logged in, profile complete → returns true (caller can proceed)
 */
export function useProfileCheck() {
    const { user, isAuthenticated } = useAuth();
    const { openAuth } = useAuthModal();
    const { showToast } = useToast();

    const requireCompleteProfile = async () => {
        // Step 1: must be logged in
        if (!isAuthenticated || !user) {
            showToast("Please log in to continue", "error");
            openAuth("signin");
            return false;
        }

        // Step 2: check profile completeness
        try {
            const result = await checkMissingProfileFields(user.id);
            if (!result.isComplete && result.missingFields.length > 0) {
                showToast("Please complete your profile first", "info");
                openAuth("profile-completion");
                return false;
            }
        } catch (err) {
            console.error("[useProfileCheck] Error checking profile:", err);
            // Don't block the user on a network error — let them through
        }

        return true;
    };

    return { requireCompleteProfile };
}
