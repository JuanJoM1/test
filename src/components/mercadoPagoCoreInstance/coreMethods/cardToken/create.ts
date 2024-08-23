import { CardTokenParams } from "../../../../models";
import { MercadoPagoInstance } from "../../initMercadoPago/initMercadoPago";

const createCardToken = async (cardTokenParams: CardTokenParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.createCardToken(cardTokenParams);
};

export default createCardToken;
