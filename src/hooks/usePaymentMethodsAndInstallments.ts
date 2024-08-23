import { useState, useEffect, Dispatch, SetStateAction } from "react";
import React from 'react';
import { Installments, PaymentInfo, PaymentMethods } from "../models";
import {
  getInstallments,
  getPaymentMethods,
} from "../components/mercadoPagoCoreInstance/coreMethods";

const usePaymentMethodsAndInstallments = (
  cardNumber: string,
  amount: number
) => {
  const [bin, setBin]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  const [paymentMethods, setPaymentMethods]: [
    PaymentMethods | undefined,
    Dispatch<SetStateAction<PaymentMethods | undefined>>
  ] = useState<PaymentMethods | undefined>(undefined);
  const [installments, setInstallments]: [
    Installments[] | undefined,
    Dispatch<SetStateAction<Installments[] | undefined>>
  ] = useState<Installments[] | undefined>([]);
  const [paymentInfo, setPaymentInfo]: [
    PaymentInfo | undefined,
    Dispatch<SetStateAction<PaymentInfo | undefined>>
  ] = useState<PaymentInfo | undefined>(undefined);

  const BIN_MAX_LENGTH = 6;

  useEffect(() => {
    const fetchPaymentMethodsAndInstallments = async () => {
      if (bin.length === BIN_MAX_LENGTH) {
        try {
          const _paymentMethods = await getPaymentMethods({ bin });
          const _installments = await getInstallments({
            amount: String(amount),
            bin,
          });

          const issuerId = _paymentMethods?.results?.[0]?.issuer?.id;
          const paymentMethodId = _paymentMethods?.results?.[0]?.id;

          const _paymentInfo = {
            issuerId,
            paymentMethodId,
          };

          setPaymentMethods(_paymentMethods);
          setInstallments(_installments);
          setPaymentInfo(_paymentInfo);
        } catch (error) {
          console.error("Error getting payment methods or installments", error);
          setPaymentMethods(undefined);
          setInstallments([]);
          setPaymentInfo(undefined);
        }
      } else {
        setPaymentMethods(undefined);
        setInstallments([]);
        setPaymentInfo(undefined);
      }
    };

    fetchPaymentMethodsAndInstallments();
  }, [bin, amount]);

  useEffect(() => {
    const cleanCardNumber = cardNumber.replaceAll(/\s+/g, "");
    const binValue = cleanCardNumber.slice(0, BIN_MAX_LENGTH);
    if (binValue.length <= BIN_MAX_LENGTH) {
      setBin(binValue);
    }
  }, [cardNumber]);

  return { paymentMethods, installments, paymentInfo };
};

export default usePaymentMethodsAndInstallments;
