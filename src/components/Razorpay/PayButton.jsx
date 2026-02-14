import { useState } from "react";
import { useToast } from "../../contexts/ToastContext";

// Helper to convert technical errors to user-friendly messages
const getErrorMessage = (error) => {
  const errorStr = error?.message?.toLowerCase() || "";

  if (errorStr.includes("network") || errorStr.includes("connect"))
    return "Network error. Check your connection and try again";
  if (errorStr.includes("order"))
    return "Can't process payment. Try again later";
  if (errorStr.includes("json") || errorStr.includes("parse"))
    return "Something went wrong. Try again";

  return "Payment failed. Please try again";
};

function PayButton({
  amount,
  currency = "INR",
  receipt,
  userId,
  title,
  description,
  className = "",
  children = "Pay Now",
}) {
  const [processing, setProcessing] = useState(false);
  const { showToast } = useToast();

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handlePayment = async (e) => {
    e.preventDefault();
    if (processing) return;

    try {
      setProcessing(true);

      // Create order
      const res = await fetch(`${API_BASE_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          receipt,
          userId,
        }),
      });
      console.log("Response : ", res);
      if (!res.ok) {
        showToast("Network error. Try again later.", "error");
        throw new Error("Failed to create order");
      }
      const order = await res.json();

      // Razorpay options
      const options = {
        key: razorpayKey,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        name: title,
        description,
        handler: async (response) => {
          // Validate payment
          const validateRes = await fetch(`${API_BASE_URL}/order/validate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const json = await validateRes.json();

          if (json.msg === "success") {
            showToast("Payment successful!", "success");
          }
        },
        prefill: {
          //user details- optional
          name: "IIITN Abhivyakti 2026 team",
          email: "support.abhivyakti26@gmail.com",
          contact: "800-555-8889",
        },
        theme: {
          // Checkout accent color-optional
          color: "#2563eb", // Tailwind blue-600
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment error details:", response.error);
        showToast("Payment failed. Try again", "error");
        setProcessing(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
      showToast(getErrorMessage(err), "error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={processing}
      className={`disabled:opacity-50 ${className}`}
    >
      {processing ? "Processing..." : children}
    </button>
  );
}

export default PayButton;
