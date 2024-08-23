import { MercadoPagoInstance } from "../../initMercadoPago/initMercadoPago";

const getIdentificationTypes = async () => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.getIdentificationTypes();
};

export default getIdentificationTypes;
