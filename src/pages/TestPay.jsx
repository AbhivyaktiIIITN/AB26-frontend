import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useToast } from "../contexts/ToastContext";
import {
  getAccommodationTypes,
  getPassesTypes,
} from "../lib/passes-accommodation-client";
import {
  completePayment,
  createPaymentOrder,
  initializeRazorpay,
} from "../lib/payment-client";

export default function TestPay() {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [passes, setPasses] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadingPassId, setLoadingPassId] = useState(null);
  const [loadingAccommodationId, setLoadingAccommodationId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const [passesResult, accommodationsResult] = await Promise.all([
          getPassesTypes(),
          getAccommodationTypes(),
        ]);

        if (passesResult.success) {
          setPasses(passesResult.data || []);
        }
        if (accommodationsResult.success) {
          setAccommodations(accommodationsResult.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBuyPass = async (pass) => {
    if (!isAuthenticated) {
      showToast("Please login first", "error");
      return;
    }

    setLoadingPassId(pass.id);

    try {
      // Step 1: Create payment order
      console.log("Step 1: Creating payment order...");
      const orderData = await createPaymentOrder({
        userId: user.id,
        amount: 100,
        eventId: "event1",
        teamId: "team-1",
        passTypeId: pass.id.toString(),
        accommodationTypeId: null,
      });
      console.log("Order created:", orderData);

      // Step 2: Initialize Razorpay
      console.log("Step 2: Opening Razorpay...");
      const razorpayResponse = await initializeRazorpay(
        orderData,
        {
          name: user.name || `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: user.phoneNumber || "",
        },
        "pass",
      );
      console.log("Payment completed:", razorpayResponse);

      // Step 3: Complete payment
      console.log("Step 3: Completing payment...");
      const result = await completePayment({
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        userId: user.id,
      });
      console.log("Payment verified:", result);

      showToast("Pass purchased successfully!", "success");
    } catch (error) {
      console.error("Error:", error);
      showToast(error.message || "Payment failed", "error");
    } finally {
      setLoadingPassId(null);
    }
  };

  const handleBuyAccommodation = async (accommodation) => {
    if (!isAuthenticated) {
      showToast("Please login first", "error");
      return;
    }

    setLoadingAccommodationId(accommodation.id);

    try {
      // Step 1: Create payment order
      console.log("Step 1: Creating payment order...");
      const orderData = await createPaymentOrder({
        userId: user.id,
        amount: accommodation.price * 100,
        eventId: "event1",
        teamId: "team-1",
        passTypeId: null,
        accommodationTypeId: accommodation.id.toString(),
      });
      console.log("Order created:", orderData);

      // Step 2: Initialize Razorpay
      console.log("Step 2: Opening Razorpay...");
      const razorpayResponse = await initializeRazorpay(
        orderData,
        {
          name: user.name || `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: user.phoneNumber || "",
        },
        "accommodation",
      );
      console.log("Payment completed:", razorpayResponse);

      // Step 3: Complete payment
      console.log("Step 3: Completing payment...");
      const result = await completePayment({
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        userId: user.id,
      });
      console.log("Payment verified:", result);

      showToast("Accommodation booked successfully!", "success");
    } catch (error) {
      console.error("Error:", error);
      showToast(error.message || "Payment failed", "error");
    } finally {
      setLoadingAccommodationId(null);
    }
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <p className="text-white text-lg">
          Loading passes and accommodations...
        </p>
      </div>
    );
  } 

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-6 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Passes Section */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-12">Passes</h1>
          {passes.length === 0 ? (
            <p className="text-gray-400">No passes available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {passes.map((pass) => (
                <div
                  key={pass.id}
                  className="p-6 rounded-lg border border-gray-700 bg-gray-900 hover:border-yellow-300 transition-all"
                >
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {pass.name}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <p className="text-gray-400">
                      <span className="text-gray-500">Available:</span>{" "}
                      {pass.count - pass.countPurchased} / {pass.count}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">Purchased:</span>{" "}
                      {pass.countPurchased}
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-300 h-2 rounded-full"
                        style={{
                          width: `${(pass.countPurchased / pass.count) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuyPass(pass)}
                    disabled={loadingPassId === pass.id}
                    className="w-full px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loadingPassId === pass.id ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accommodations Section */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-12">
            Accommodations
          </h1>
          {accommodations.length === 0 ? (
            <p className="text-gray-400">No accommodations available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations.map((accommodation) => (
                <div
                  key={accommodation.id}
                  className="p-6 rounded-lg border border-gray-700 bg-gray-900 hover:border-yellow-300 transition-all"
                >
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {accommodation.name}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <p className="text-gray-400">
                      <span className="text-gray-500">Available:</span>{" "}
                      {accommodation.count - accommodation.countBooked} /{" "}
                      {accommodation.count}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">Booked:</span>{" "}
                      {accommodation.countBooked}
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-300 h-2 rounded-full"
                        style={{
                          width: `${(accommodation.countBooked / accommodation.count) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-3xl font-bold text-yellow-300 mb-6">
                    ₹{accommodation.price}/night
                  </p>

                  <button
                    onClick={() => handleBuyAccommodation(accommodation)}
                    disabled={loadingAccommodationId === accommodation.id}
                    className="w-full px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loadingAccommodationId === accommodation.id
                      ? "Processing..."
                      : "Buy Now"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
