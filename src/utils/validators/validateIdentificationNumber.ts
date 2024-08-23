import { DocumentTypes } from "../../models";

const DEFAULT_FORMAT_LENGTH = 9;
const DNI_MIN_LENGTH = 7;

const validateIdentificationNumber = (
  value: string,
  formatType: string
): string | undefined => {
  const cleanValue = value.replace(/\./g, "");
  switch (formatType) {
    case DocumentTypes.DNI_FORMAT:
      return cleanValue.length >= DNI_MIN_LENGTH
        ? undefined
        : "Invalid identification number.";
    default:
      return cleanValue.length === DEFAULT_FORMAT_LENGTH
        ? undefined
        : "Invalid identification number.";
  }
};

export default validateIdentificationNumber;
