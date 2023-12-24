/**
 * Normalize a phone number by removing non-numeric characters and taking the last 10 digits.
 * @param {string} number - The phone number to normalize.
 * @returns {string} - The normalized phone number.
 */
function normalisePhoneNumber(number){

  // last 10 digits = excludes country code in front
  return number.replace(/\D/g, "").slice(-10);
}

module.exports = normalisePhoneNumber;