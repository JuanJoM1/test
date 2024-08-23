import { createCardToken } from "../components/mercadoPagoCoreInstance/coreMethods";
import { MercadoPagoFormValues } from "../models";

/**
 * Creates a card token using the provided form values.
 *
 * @param values - The form values containing card details.
 * @returns The response from the card token creation.
 * @throws Will throw an error if the card token creation fails.
 */
const cardToken = async (values: MercadoPagoFormValues) => {
  try {
    const [cardExpirationMonth, cardExpirationYear] =
      values.expirationDate.split("/");
    const identificationNumber = values.identificationNumber.replace(/\./g, "");
    const cardNumber = values.cardNumber.replace(/\s+/g, "");

    const cardTokenResponse = await createCardToken({
      cardNumber,
      cardholderName: values.cardholderName,
      cardExpirationMonth,
      cardExpirationYear,
      securityCode: values.securityCode,
      identificationType: values.identificationTypes,
      identificationNumber,
    });

    return cardTokenResponse;
  } catch (error) {
    throw error;
  }
};

export default cardToken;
