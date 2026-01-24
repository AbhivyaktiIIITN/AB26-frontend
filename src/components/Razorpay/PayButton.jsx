import { useState } from "react";

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
            console.log("Response : ",res);
            if (!res.ok) {
                alert("Network Error")
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
                    const validateRes = await fetch(
                        `${API_BASE_URL}/order/validate`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(response),
                        }
                    );

                    const json = await validateRes.json();

                    if (json.msg === "success") {
                        alert("Successfully paid");
                    }
                },
                prefill: {//user details- optional
                    name: "IIITN Abhivyakti 2026 team",
                    email: "support.abhivyakti26@gmail.com",
                    contact: "800-555-8889",
                },
                theme: {// Checkout accent color-optional
                    color: "#2563eb", // Tailwind blue-600
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
                setProcessing(false);
            });
            rzp.open();
        } catch (err) {
            console.error("Payment failed:", err);
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
