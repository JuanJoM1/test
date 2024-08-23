import { InstallmentsParams } from "../../../../models";
import { MercadoPagoInstance } from "../../initMercadoPago/initMercadoPago";

const getInstallments = async (installmentsParams: InstallmentsParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.getInstallments(installmentsParams);
};

export default getInstallments;
