import React from "react";
import { useCallback, useMemo } from "react"
import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatSecurityCode,
  formatIdentificationByType,
  validateCardNumber,
  validationExpirationDate,
  validateSecurityCode,
  validateIdentificationNumber,
} from "../utils";
import {
  FormField,
  IdentificationType,
  Installments,
  MercadoPagoFormValues,
  PayerCost,
  PaymentMethods,
  Result,
  SelectFieldProps,
  SetFieldValue,
} from "../models";

const useFormFieldHandlers = (
  paymentMethods: PaymentMethods | undefined,
  installments: Installments[] | undefined,
  identificationTypes: IdentificationType[] | undefined,
  setCardNumber: React.Dispatch<React.SetStateAction<string>>,
  securityCodeMaxLength: number
) => {
  const handleCardNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: SetFieldValue) => {
      const value = formatCreditCardNumber(
        e.target.value,
        paymentMethods?.results?.[0].id
      );
      setCardNumber(value);
      setFieldValue("cardNumber", value);
    },
    [paymentMethods, setCardNumber]
  );

  const handleExpirationDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: SetFieldValue) => {
      const value = formatExpirationDate(e.target.value);
      setFieldValue("expirationDate", value);
    },
    []
  );

  const handleSecurityCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: SetFieldValue) => {
      const value = formatSecurityCode(e.target.value);
      setFieldValue("securityCode", value);
    },
    []
  );

  const handleIdentificationNumberChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      setFieldValue: SetFieldValue,
      values: MercadoPagoFormValues
    ) => {
      const value = e.target.value;
      const formattedValue = formatIdentificationByType(
        value,
        values.identificationTypes
      );
      setFieldValue("identificationNumber", formattedValue);
    },
    []
  );

  const formFields: FormField[] = useMemo(
    () => [
      {
        label: "Card Number",
        name: "cardNumber",
        validate: validateCardNumber,
        placeholder: "Enter number",
        onChange: handleCardNumberChange,
      },
      {
        label: "Expiration Date",
        name: "expirationDate",
        validate: validationExpirationDate,
        placeholder: "MM/YY",
        onChange: handleExpirationDateChange,
      },
      {
        label: "CVV",
        name: "securityCode",
        validate: (value: string) =>
          validateSecurityCode(value, paymentMethods?.results?.[0].id || ""),
        placeholder: "CVV",
        maxLength: securityCodeMaxLength,
        minLength: securityCodeMaxLength,
        onChange: handleSecurityCodeChange,
      },
      {
        label: "Cardholder",
        name: "cardholderName",
        placeholder: "Nombre y Apellido",
        onChange: (
          e: React.ChangeEvent<HTMLInputElement>,
          setFieldValue: SetFieldValue
        ) => {
          const value = e.target.value;
          setFieldValue("cardholderName", value);
        },
      },
      {
        label: "Document number",
        name: "identificationNumber",
        validate: (value: string) =>
          validateIdentificationNumber(
            value,
            identificationTypes?.[0].name || ""
          ),
        placeholder: "Number",
        onChange: handleIdentificationNumberChange,
      },
    ],
    [
      handleCardNumberChange,
      handleExpirationDateChange,
      handleSecurityCodeChange,
      handleIdentificationNumberChange,
      securityCodeMaxLength,
      paymentMethods,
      identificationTypes,
    ]
  );

  const selectFields: SelectFieldProps[] = useMemo(
    () => [
      {
        label: "Identification Types",
        name: "identificationTypes",
        options:
          identificationTypes?.map(
            (identificationType: IdentificationType) => ({
              name: identificationType.name,
              value: identificationType.name,
            })
          ) || [],
        onChange: (
          e: React.ChangeEvent<HTMLInputElement>,
          setFieldValue: SetFieldValue
        ) => {
          const value = e.target.value;
          setFieldValue("identificationNumber", "");
          setFieldValue("identificationTypes", value);
        },
      },
      {
        label: "Issuer",
        name: "issuer",
        options:
          paymentMethods?.results?.map((type: Result) => ({
            name: type.name,
            value: type.name,
          })) || [],
        onChange: (
          e: React.ChangeEvent<HTMLInputElement>,
          setFieldValue: SetFieldValue
        ) => {
          const value = e.target.value;
          setFieldValue("issuer", value);
        },
      },
      {
        label: "Installments",
        name: "installments",
        options:
          installments?.[0]?.payer_costs.map((payerCost: PayerCost) => ({
            name: payerCost.recommended_message,
            value: payerCost.installments,
          })) || [],
        onChange: (
          e: React.ChangeEvent<HTMLInputElement>,
          setFieldValue: SetFieldValue
        ) => {
          const value = e.target.value;
          setFieldValue("installments", value);
        },
      },
    ],
    [paymentMethods, installments, identificationTypes]
  );

  return { formFields, selectFields };
};

export default useFormFieldHandlers;
