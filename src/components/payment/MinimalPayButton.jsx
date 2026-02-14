import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useToast } from "../../contexts/ToastContext";
import {
  completePayment,
  createPaymentOrder,
  initializeRazorpay,
} from "../../lib/payment-client";
import { useAuthModal } from "../auth/ModalAuthLayout";
import PaymentFailureModal from "./PaymentFailureModal";
import PaymentSuccessModal from "./PaymentSuccessModal";

// Helper to convert technical errors to user-friendly messages
const getErrorMessage = (error) => {
  const errorStr = error?.message?.toLowerCase() || "";

  if (errorStr.includes("network") || errorStr.includes("connect"))
    return "Network error. Check your connection";
  if (errorStr.includes("order")) return "Can't process payment. Try again";
  if (errorStr.includes("verify") || errorStr.includes("signature"))
    return "Payment verification failed. Contact support";
  if (errorStr.includes("json") || errorStr.includes("parse"))
    return "Payment failed. Try again later";
  if (errorStr.includes("timeout")) return "Request timed out. Try again";

  return "Payment failed. Please try again";
};

const MinimalPayButton = ({
  amount = 500,
  eventId = null,
  teamId = null,
  contact = null,
  title = "AB26 Payment",
  description = "Event Registration",
  className = "",
  children = "Pay Now",
}) => {
  const { user, isAuthenticated } = useAuth();
  const { openAuth } = useAuthModal();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [paymentError, setPaymentError] = useState("");

  const handlePayment = async () => {
    if (!isAuthenticated) {
      showToast("Please login to make payment", "error");
      openAuth("signin");
      return;
    }

    if (isProcessing) return;

    try {
      setIsProcessing(true);
      showToast("Initializing payment...", "success");

      // create payment order
      const orderData = await createPaymentOrder({
        userId: user.id,
        amount,
        eventId,
        teamId,
      });

      // initialize razorpay
      await initializeRazorpay(
        orderData,
        {
          name: user.name || user.firstName + " " + user.lastName,
          email: user.email,
          contact: contact || user.contact || "",
        },
        async (response) => {
          try {
            showToast("Verifying payment...", "success");
            // verify payment
            const verificationResult = await completePayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user.id,
            });

            // Set payment result for success modal
            setPaymentResult({
              ...response,
              amount: orderData.amount,
              verificationResult,
            });
            setShowSuccessModal(true);
            showToast("Payment successful!", "success");
          } catch (error) {
            console.error("Payment verification error:", error);
            setPaymentError("Payment verification failed. Contact support");
            setShowFailureModal(true);
            showToast(getErrorMessage(error), "error");
          }
        },
        (error) => {
          console.error("Payment handler error:", error);
          setPaymentError("Payment failed or was cancelled");
          setShowFailureModal(true);
          showToast("Payment cancelled or failed", "error");
        },
      );
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(getErrorMessage(error));
      setShowFailureModal(true);
      showToast(getErrorMessage(error), "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetryPayment = () => {
    handlePayment();
  };

  const handleViewDashboard = () => {
    // Navigate to dashboard - you can customize this
    window.location.href = "/";
  };

  const handleContactSupport = () => {
    // Open support contact - you can customize this
    window.open("mailto:abhivyakti@iiitn.ac.in", "_blank");
  };

  return (
    <>
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`
          px-6 py-3 
          bg-linear-to-r from-purple-600 to-blue-600 
          hover:from-purple-700 hover:to-blue-700 
          text-white font-medium rounded-lg 
          transition-all duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {isProcessing ? "Processing..." : children}
      </button>

      {/* Success Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        paymentData={paymentResult}
        onViewDashboard={handleViewDashboard}
      />

      {/* Failure Modal */}
      <PaymentFailureModal
        isOpen={showFailureModal}
        onClose={() => setShowFailureModal(false)}
        error={paymentError}
        onRetry={handleRetryPayment}
        onSupportContact={handleContactSupport}
      />
    </>
  );
};

export default MinimalPayButton;
