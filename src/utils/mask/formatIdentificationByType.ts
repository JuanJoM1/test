import { DocumentTypes } from "../../models";
import { getNumbersStringArray } from "../shared";

export const formatDNI = (textFormated: string) => {
  const partitions = textFormated.length > 7 ? [2, 3, 3] : [1, 3, 3];
  const separator = ".";

  return getNumbersStringArray(textFormated, partitions).join(separator);
};

export const formatDefault = (textFormated: string) => {
  const partitions = [3, 3, 3];

  return getNumbersStringArray(textFormated, partitions).join("");
};

const formatIdentificationByType = (value: string, formatType: string) => {
  const textFormatedNumber = value.replace(/\s+/g, "").replace(/\D/g, "");
  const textFormatedAlphanumeric = value.replace(/\W/g, "");

  switch (formatType) {
    case DocumentTypes.DNI_FORMAT:
      return formatDNI(textFormatedNumber);
    default:
      return formatDefault(textFormatedAlphanumeric);
  }
};

export default formatIdentificationByType;
