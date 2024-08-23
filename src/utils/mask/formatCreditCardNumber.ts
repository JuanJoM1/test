import { getNumbersStringArray } from "../shared";

const formatCreditCardNumber = (
  value: string,
  paymentMethod: string = ""
): string => {
  const DEFAULT_MASK = [4, 4, 4, 4];
  const masks: Record<string, number[]> = {
    amex: [4, 6, 5],
  };
  const partitions = masks[paymentMethod] || DEFAULT_MASK;
  const textFormated = value.replace(/\D/g, "");

  return getNumbersStringArray(textFormated, partitions).join(" ");
};

export default formatCreditCardNumber;
