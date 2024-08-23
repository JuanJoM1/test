import { useState, useEffect } from "react";
import React from 'react';
import { PaymentMethods } from "../models";

/**
 * Custom hook to determine the security code length based on the payment method.
 *
 * @param paymentMethod - The payment methods data used to determine the security code length.
 * @returns The maximum length of the security code for the given payment method.
 */
const useSecurityCodeMaxLength = (
  paymentMethod: PaymentMethods | undefined
) => {
  const [securityCodeMaxLength, setSecurityCodeMaxLength] = useState<number>(3);

  useEffect(() => {
    const paymentMethodId = paymentMethod?.results?.[0]?.id;
    const maxLength = paymentMethodId === "amex" ? 4 : 3;
    setSecurityCodeMaxLength(maxLength);
  }, [paymentMethod]);

  return securityCodeMaxLength;
};

export default useSecurityCodeMaxLength;
