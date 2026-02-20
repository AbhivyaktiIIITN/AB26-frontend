/**
 * ABID Utility Functions
 * ABID Format: AB + serialID padded to 5 digits with leading zeros
 * Examples: AB00001, AB00123, AB10000
 */

/**
 * Convert Serial ID to ABID format
 * @param {number} serialId - The serial ID
 * @returns {string} - ABID in format AB##### (e.g., AB00123)
 */
export const serialIdToABID = (serialId) => {
  if (!serialId && serialId !== 0) return "";
  const padded = String(serialId).padStart(5, "0");
  return `AB${padded}`;
};

/**
 * Convert ABID to Serial ID
 * @param {string} abid - The ABID (e.g., AB00123)
 * @returns {number} - The serial ID or null if invalid
 */
export const abidToSerialId = (abid) => {
  if (!abid || typeof abid !== "string") return null;

  // Remove AB prefix if present
  let cleaned = abid.trim().toUpperCase();
  if (cleaned.startsWith("AB")) {
    cleaned = cleaned.substring(2);
  }

  // Parse the remaining 5-digit number
  const serialId = parseInt(cleaned, 10);

  // Validate it's a valid number
  if (isNaN(serialId) || serialId < 0) {
    return null;
  }

  return serialId;
};

/**
 * Validate ABID format
 * @param {string} abid - The ABID to validate
 * @returns {boolean} - True if valid format
 */
export const isValidABID = (abid) => {
  if (!abid || typeof abid !== "string") return false;

  const trimmed = abid.trim().toUpperCase();
  // Should be AB followed by 5 digits, or just 5 digits
  const pattern = /^(AB)?[\d]{5}$/;
  return pattern.test(trimmed);
};

/**
 * Format ABID for display
 * @param {string} abid - The ABID
 * @returns {string} - Formatted ABID
 */
export const formatABID = (abid) => {
  if (!abid) return "";

  const serialId = abidToSerialId(abid);
  if (serialId === null) return abid;

  return serialIdToABID(serialId);
};

export default {
  serialIdToABID,
  abidToSerialId,
  isValidABID,
  formatABID,
};
