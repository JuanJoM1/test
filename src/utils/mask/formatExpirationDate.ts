const formatExpirationDate = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");
  if (numericValue.length >= 3) {
    return numericValue.slice(0, 2) + "/" + numericValue.slice(2, 4);
  }
  return numericValue;
};

export default formatExpirationDate;
