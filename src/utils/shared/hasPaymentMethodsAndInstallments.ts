import { FieldName, Installments, PaymentMethods } from "../../models";

const hasPaymentMethods = (paymentMethods: PaymentMethods | undefined) =>
  Boolean(paymentMethods?.results?.length);

const hasInstallments = (installments: Installments[] | undefined) =>
  Boolean(installments?.[0]?.payer_costs?.length);

export const hasPaymentMethodsAndInstallments = (
  paymentMethods: PaymentMethods | undefined,
  installments: Installments[] | undefined,
  fieldName: string
) => {
  const isIssuerOrInstallments =
    fieldName === FieldName.ISSUER || fieldName === FieldName.INSTALLMENTS;

  return isIssuerOrInstallments
    ? hasPaymentMethods(paymentMethods) && hasInstallments(installments)
    : true;
};
