const SECURITY_CODE_LENGTHS: { [key: string]: number } = {
  amex: 4,
};
const DEFAULT_SECURITY_CODE_LENGTH = 3;

/**
 * Gets the security code length based on the payment method ID.
 * @param paymentMethodId The payment method ID.
 * @returns The security code length.
 */
const getSecurityCodeLength = (paymentMethodId: string): number => {
  return SECURITY_CODE_LENGTHS[paymentMethodId] || DEFAULT_SECURITY_CODE_LENGTH;
};

/**
 * Validates the security code based on its length for the given payment method.
 * @param value The security code value.
 * @param paymentMethodId The payment method ID.
 * @returns An error message if the validation fails, otherwise undefined.
 */
const validateSecurityCode = (
  value: string,
  paymentMethodId: string
): string | undefined => {
  const length = getSecurityCodeLength(paymentMethodId);
  return value.length === length
    ? undefined
    : `El CVV debe tener ${length} dígitos.`;
};

export default validateSecurityCode;
