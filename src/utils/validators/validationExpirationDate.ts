const CENTURY = 2000;
const FIRST_DAY_OF_MONTH = 1;
const DATE_LENGTH = 2;
const DATE_SEPARATOR = "/";
const MIN_MONTH = 1;
const MAX_MONTH = 12;
const MIN_YEAR = 0;
const MAX_YEAR = 99;

/**
 * Checks if the given month and year are valid.
 * @param month The month part of the expiration date.
 * @param year The year part of the expiration date.
 * @returns True if the month and year are valid, otherwise false.
 */
const isValidDate = (month: string, year: string) => {
  if (!month || !year) return false;
  if (month.length !== DATE_LENGTH || year.length !== DATE_LENGTH) return false;

  const monthNumber = Number(month);
  const yearNumber = Number(year);

  if (isNaN(monthNumber) || isNaN(yearNumber)) return false;
  if (monthNumber < MIN_MONTH || monthNumber > MAX_MONTH) return false;
  if (yearNumber < MIN_YEAR || yearNumber > MAX_YEAR) return false;

  return true;
};

/**
 * Checks if the given expiration date is valid and not expired.
 * @param expirationDate The expiration date in MM/YY format.
 * @returns True if the expiration date is valid and not expired, otherwise false.
 */
const isValidExpirationDate = (expirationDate: string) => {
  const [month, year] = expirationDate.split(DATE_SEPARATOR);

  if (!isValidDate(month, year)) return false;

  const expiryDate = new Date(
    Number(year) + CENTURY,
    Number(month) - 1,
    FIRST_DAY_OF_MONTH
  );
  const currentDate = new Date();
  return currentDate < expiryDate;
};

/**
 * Validates the expiration date.
 * @param value The expiration date in MM/YY format.
 * @returns An error message if the validation fails, otherwise undefined.
 */
const validationExpirationDate = (value: string) => {
  const isValidDate = isValidExpirationDate(value);
  return isValidDate ? undefined : "Invalid expiration date";
};

export default validationExpirationDate;
