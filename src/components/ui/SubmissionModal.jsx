import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useToast } from "../../contexts/ToastContext";
import { submitIndividualRegistration } from "../../lib/registration-client";

const SubmissionModal = ({ isOpen, onClose, registrationId, eventName, initialSubmission = "", onSuccess }) => {
    const { showToast } = useToast();
    const [submissionString, setSubmissionString] = useState(initialSubmission);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setSubmissionString(initialSubmission || "");
    }, [initialSubmission, isOpen]);

    // Disable Lenis smooth scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            window.lenis?.stop();
        } else {
            window.lenis?.start();
        }
        return () => window.lenis?.start();
    }, [isOpen]);

    const handleSubmit = async () => {
        showToast("The fest has concluded. Submissions are no longer active.", "info");
        /* Original logic
        if (!registrationId) {
            showToast("Registration ID not found", "error");
            return;
        }

        try {
            setIsSubmitting(true);
            const result = await submitIndividualRegistration(registrationId, submissionString);

            if (result.success) {
                showToast("Submission updated successfully!", "success");
                if (onSuccess) onSuccess();
                onClose();
            } else {
                showToast(result.error || "Failed to update submission", "error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            showToast("Error updating submission", "error");
        } finally {
            setIsSubmitting(false);
        }
        */
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-100000001 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0f0f0f] rounded-lg border border-yellow-500/20 shadow-2xl w-full max-w-md overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-gray-900">
                    <div>
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Event Submission</p>
                        <h2 className="text-xl font-bold text-white">
                            {eventName || "Event"}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Submission Link / Project Code
                        </label>
                        <input
                            type="text"
                            value={submissionString}
                            onChange={(e) => setSubmissionString(e.target.value)}
                            placeholder="Paste your submission link or code here"
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50 transition mb-2"
                        />
                        <p className="text-xs text-gray-400">
                            You can update this anytime before the event deadline.
                        </p>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 rounded hover:bg-white/5 transition font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !submissionString.trim()}
                            className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-bold rounded transition-all"
                        >
                            {isSubmitting ? "Updating..." : "Update"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SubmissionModal;
