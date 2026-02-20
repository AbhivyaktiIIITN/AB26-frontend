const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const createPaymentOrder = async ({
  userId,
  amount,
  eventId,
  teamId,
  passTypeId,
  accommodationTypeId,
}) => {
  const response = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      amount,
      eventId,
      teamId,
      passTypeId,
      accommodationTypeId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create payment order");
  }

  return data;
};

export const completePayment = async (paymentData) => {
  const response = await fetch(`${BACKEND_URL}/api/payment/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Payment verification failed: ${response.status}`,
    );
  }

  return data;
};

export const initializeRazorpay = (orderData, userDetails, purchaseType) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      let description = "Event Registration Payment";
      if (purchaseType === "pass") {
        description = "Pass Purchase";
      } else if (purchaseType === "accommodation") {
        description = "Accommodation Booking";
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "Abhivyakti Fest",
        description: description,
        handler: function (response) {
          resolve(response);
        },
        prefill: {
          name: userDetails.name || "Guest User",
          email: userDetails.email || "",
          contact: userDetails.contact || "",
        },
        modal: {
          ondismiss: function () {
            reject(new Error("Payment cancelled by user"));
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        reject(new Error(`Payment failed: ${response.error.description}`));
      });

      rzp.open();
    };
    script.onerror = () => {
      reject(new Error("Failed to load Razorpay script"));
    };
    document.body.appendChild(script);
  });
};
