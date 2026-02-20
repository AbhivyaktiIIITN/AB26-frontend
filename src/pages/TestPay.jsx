import { useEffect, useState } from "react";
import { getAccommodationTypes, getPassesTypes } from "../lib/passes-accommodation-client";
import { serialIdToABID } from "../utils/abid-utils";
import { createPaymentOrder } from "../lib/payment-client";
import { getUserProfile } from "../lib/user-client";
import { useAuth } from "../contexts/AuthProvider";
import { useToast } from "../contexts/ToastContext";

export default function TestPay() {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [passes, setPasses] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadingPassId, setLoadingPassId] = useState(null);
  const [loadingAccommodationId, setLoadingAccommodationId] = useState(null);
  const [profileSerialId, setProfileSerialId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const [passesResult, accommodationsResult] = await Promise.all([
          getPassesTypes(),
          getAccommodationTypes(),
        ]);
        if (passesResult.success) setPasses(passesResult.data || []);
        if (accommodationsResult.success) setAccommodations(accommodationsResult.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    getUserProfile(user.id)
      .then((data) => setProfileSerialId(data?.user?.serialId ?? null))
      .catch((e) => console.error("[TestPay] getUserProfile error:", e));
  }, [user?.id]);


  const buildPaymentUrl = (baseLink, orderId) => {
    const url = new URL(baseLink);
    url.searchParams.set("order_id", orderId);
    url.searchParams.set("ab_id", serialIdToABID(profileSerialId) || "");
    url.searchParams.set("email", user?.email || "");
    const rawPhone = user?.phoneNumber || "";
    url.searchParams.set("phone", rawPhone.startsWith("+91") ? rawPhone : `+91${rawPhone}`);
    return url.toString();
  };

  const handleBuyPass = async (pass) => {
    if (!isAuthenticated) {
      showToast("Please login first", "error");
      return;
    }
    setLoadingPassId(pass.id);
    try {
      const { order } = await createPaymentOrder({ passTypeId: pass.id });
      showToast("Redirecting to payment...", "success");
      window.location.href = buildPaymentUrl(pass.paymentPageLink, order.id);
    } catch (error) {
      console.error("Error:", error);
      showToast(error.message || "Failed to create order", "error");
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
      const { order } = await createPaymentOrder({ accommodationTypeId: accommodation.id });
      showToast("Redirecting to payment...", "success");
      window.location.href = buildPaymentUrl(accommodation.paymentPageLink, order.id);
    } catch (error) {
      console.error("Error:", error);
      showToast(error.message || "Failed to create order", "error");
    } finally {
      setLoadingAccommodationId(null);
    }
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <p className="text-white text-lg">Loading passes and accommodations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-6 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Passes */}
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
                  <h3 className="text-2xl font-semibold text-white mb-4">{pass.name}</h3>

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
                        style={{ width: `${(pass.countPurchased / pass.count) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuyPass(pass)}
                    disabled={loadingPassId === pass.id || pass.count <= pass.countPurchased}
                    className="w-full px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loadingPassId === pass.id
                      ? "Redirecting..."
                      : pass.count <= pass.countPurchased
                        ? "Sold Out"
                        : "Buy Now"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accommodations */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-12">Accommodations</h1>
          {accommodations.length === 0 ? (
            <p className="text-gray-400">No accommodations available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations.map((accommodation) => (
                <div
                  key={accommodation.id}
                  className="p-6 rounded-lg border border-gray-700 bg-gray-900 hover:border-yellow-300 transition-all"
                >
                  <h3 className="text-2xl font-semibold text-white mb-4">{accommodation.name}</h3>

                  <div className="space-y-3 mb-6">
                    <p className="text-gray-400">
                      <span className="text-gray-500">Available:</span>{" "}
                      {accommodation.count - accommodation.countBooked} / {accommodation.count}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">Booked:</span>{" "}
                      {accommodation.countBooked}
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-300 h-2 rounded-full"
                        style={{ width: `${(accommodation.countBooked / accommodation.count) * 100}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-3xl font-bold text-yellow-300 mb-6">
                    ₹{accommodation.price}/night
                  </p>

                  <button
                    onClick={() => handleBuyAccommodation(accommodation)}
                    disabled={loadingAccommodationId === accommodation.id || accommodation.count <= accommodation.countBooked}
                    className="w-full px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loadingAccommodationId === accommodation.id
                      ? "Redirecting..."
                      : accommodation.count <= accommodation.countBooked
                        ? "Fully Booked"
                        : "Book Now"}
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
