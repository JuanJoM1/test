import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  cardNumber: Yup.string().required("Card number is required"),
  expirationDate: Yup.string().required("Expiration date is required"),
  securityCode: Yup.string().required("Security code is required"),
  cardholderName: Yup.string().required("Cardholder name is required"),
  identificationNumber: Yup.string().required(
    "Identification number is required"
  ),
});

export default validationSchema;
