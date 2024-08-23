import { useEffect, useReducer } from "react";
import React from 'react';
import initMercadoPago, {
  MercadoPagoInstance,
} from "../components/mercadoPagoCoreInstance/initMercadoPago/initMercadoPago";
import {
  Action,
  actionTypes,
  mercadoPagoInstanceState,
  State,
} from "../models";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_MP:
      return { ...state, mp: action.payload.mp };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

const useMercadoPagoInstance = (apiKey: string) => {
  const [state, dispatch] = useReducer(reducer, mercadoPagoInstanceState);

  useEffect(() => {
    const initialize = async () => {
      try {
        initMercadoPago(apiKey);
        const instanceMercadoPago = await MercadoPagoInstance.getInstance();
        if (instanceMercadoPago) {
          dispatch({
            type: actionTypes.SET_MP,
            payload: { mp: instanceMercadoPago },
          });
        } else {
          throw new Error("Failed to initialize MercadoPago instance.");
        }
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: {
            error:
              error instanceof Error
                ? error
                : new Error("Unknown error occurred."),
          },
        });
      }
    };
    initialize();
  }, [apiKey]);

  return {
    mp: state.mp,
    error: state.error,
  };
};

export default useMercadoPagoInstance;