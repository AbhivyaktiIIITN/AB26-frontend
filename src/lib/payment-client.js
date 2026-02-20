const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const createPaymentOrder = async ({ passTypeId, accommodationTypeId }) => {
  if (passTypeId == null && accommodationTypeId == null) {
    throw new Error("At least one of passTypeId or accommodationTypeId must be provided.");
  }

  const body = {};
  if (passTypeId != null) body.passTypeId = passTypeId;
  if (accommodationTypeId != null) body.accommodationTypeId = accommodationTypeId;

  const response = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // send session cookie
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || `Failed to create payment order (${response.status})`);
  }

  return data; // { success: true, order: { id, userId, passTypeId, accommodationTypeId, status, createdAt } }
};
