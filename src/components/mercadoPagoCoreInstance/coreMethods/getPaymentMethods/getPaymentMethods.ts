import { PaymentMethodsParams } from "../../../../models";
import { MercadoPagoInstance } from "../../initMercadoPago/initMercadoPago";

const getPaymentMethods = async (
  paymentMethodsParams: PaymentMethodsParams
) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.getPaymentMethods(paymentMethodsParams);
};

export default getPaymentMethods;
