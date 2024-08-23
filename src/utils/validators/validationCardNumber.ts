export const luhnCheck = (cardNumber: string) => {
  if (!cardNumber.length) {
    return false;
  }
  const cardNumberWithoutSpaces = cardNumber.replace(/\s/g, "");
  const lastDigit = Number(
    cardNumberWithoutSpaces[cardNumberWithoutSpaces.length - 1]
  );
  const reverseCardNumber = cardNumberWithoutSpaces
    .slice(0, cardNumberWithoutSpaces.length - 1)
    .split("")
    .reverse()
    .map((x) => Number(x));

  let sum = 0;
  for (let i = 0; i <= reverseCardNumber.length - 1; i += 2) {
    reverseCardNumber[i] = reverseCardNumber[i] * 2;
    if (reverseCardNumber[i] > 9) {
      reverseCardNumber[i] = reverseCardNumber[i] - 9;
    }
  }
  sum = reverseCardNumber.reduce((acc, currValue) => acc + currValue, 0);
  return (sum + lastDigit) % 10 === 0;
};

const validateCardNumber = (value: string) => {
  if (!value) return "Card number is required";
  const isValidCardNumber = luhnCheck(value);
  if (!isValidCardNumber) return "Invalid credit card number";
  return undefined;
};

export default validateCardNumber;
