/**
 * Formats the security code by removing non-numeric characters.
 *
 * @param value - The security code to be formatted.
 * @returns The security code with only numeric characters.
 */
const formatSecurityCode = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");
  return numericValue;
};

export default formatSecurityCode;
