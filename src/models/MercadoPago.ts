import { FormikErrors, FormikHelpers } from "formik";
import { MercadoPagoInstance } from "../components/mercadoPagoCoreInstance";

export enum actionTypes {
  SET_MP = "SET_MP",
  SET_ERROR = "SET_ERROR",
}

export enum FieldName {
  ISSUER = "issuer",
  INSTALLMENTS = "installments",
}

export enum DocumentTypes {
  DNI_FORMAT = "DNI",
}

export const mercadoPagoInstanceState = {
  mp: null,
  error: null,
};

export const initialValues = {
  cardNumber: "",
  expirationDate: "",
  securityCode: "",
  cardholderName: "",
  issuer: "",
  installments: "",
  identificationTypes: "",
  identificationNumber: "",
};


export type TOptions = {
  locale?:
    | "es-AR"
    | "es-CL"
    | "es-CO"
    | "es-MX"
    | "es-VE"
    | "es-UY"
    | "es-PE"
    | "pt-BR"
    | "en-US";
  advancedFraudPrevention?: boolean;
  trackingDisabled?: boolean;
  frontEndStack?: string;
  siteId?: string;
};

export type TInstanceMercadoPago = {
  getIdentificationTypes: () => Promise<IdentificationType[]>;
  getPaymentMethods: (
    paymentMethodsParams: PaymentMethodsParams
  ) => Promise<PaymentMethods>;
  getIssuers: (issuersParams: IssuersParams) => Promise<Issuers[]>;
  getInstallments: (
    installmentsParams: InstallmentsParams
  ) => Promise<Installments[]>;
  createCardToken: (cardTokenParams: CardTokenParams) => Promise<CardToken>;
  updateCardToken: (
    paymentMethodsParams: CardTokenUpdateParams
  ) => Promise<CardToken>;
};

export type Identification = {
  number: string;
  type: string;
};

export type Cardholder = {
  identification: Identification;
  name: string;
};

export type CardToken = {
  id?: string;
  public_key?: string;
  card_id?: string;
  luhn_validation?: boolean;
  status?: string;
  date_used?: Date;
  card_number_length?: number;
  date_created?: Date;
  first_six_digits?: string;
  last_four_digits?: string;
  security_code_length?: number;
  expiration_month?: number;
  expiration_year?: number;
  date_last_updated?: Date;
  date_due?: Date;
  live_mode?: boolean;
  cardholder?: Cardholder;
  installments?: number;
  issuerId?: number;
  paymentMethodId?: string;
};

export type CardTokenParams = {
  cardNumber?: string;
  cardholderName?: string;
  identificationType?: string;
  identificationNumber?: string;
  securityCode?: string;
  cardExpirationMonth?: string;
  cardExpirationYear?: string;
  cardId?: string;
};

export type CardTokenUpdateParams = {
  securityCode?: string;
  cardExpirationMonth?: string;
  cardExpirationYear?: string;
  token?: string;
};

export type IdentificationType = {
  id: string;
  name: string;
  type: string;
  min_length: number;
  max_length: number;
};

export type InstallmentsParams = {
  locale?: string;
  amount: string;
  bin: string;
  paymentMethodId?: string;
  payment_method_id?: string;
  processingMode?: ProcessingMode;
  processing_mode?: ProcessingMode;
  paymentTypeId?: string;
  payment_type_id?: string;
};

export type Installments = {
  payment_method_id?: string;
  payment_type_id?: string;
  issuer?: Issuer;
  processing_mode?: string;
  merchant_account_id?: string;
  payer_costs: PayerCost[];
  agreements?: unknown;
};

export type IssuersParams = {
  payment_method_id?: string;
  paymentMethodId?: string;
  bin: string;
};

export type PaymentInfo = {
  issuerId?: number;
  paymentMethodId?: string;
};

export type Issuers = {
  id: string;
  name: string;
  secure_thumbnail: string;
  thumbnail: string;
  processing_mode: string;
  merchant_account_id: string;
};

export type PaymentMethodsParams = {
  bin: string;
  processingMode?: ProcessingMode;
};

export type PaymentMethods = {
  paging?: Paging;
  results?: Result[];
};

export type SetFieldValue = (
  field: string,
  value: string,
  shouldValidate?: boolean
) => Promise<void | FormikErrors<MercadoPagoFormValues>>;

export type Action = SetMPAction | SetErrorAction;

export type ProcessingMode = "gateway" | "aggregator";

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  validate?: (value: string) => string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
  touched?: boolean;
  maxLength?: number;
  minLength?: number;
}

export interface MercadoPagoFormValues {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  cardholderName: string;
  issuer: string;
  installments: string;
  identificationTypes: string;
  identificationNumber: string;
}

export interface MercadoPagoOptions {
  locale?: string;
}

export interface MercadoPago {
  new (publicKey: string, options: MercadoPagoOptions): TInstanceMercadoPago;
}

declare global {
  interface Window {
    MercadoPago: MercadoPago;
  }
}

export interface Issuer {
  default: boolean;
  name: string;
  id: number;
}

export interface PayerCost {
  installment_rate?: number;
  discount_rate?: number;
  min_allowed_amount?: number;
  labels?: string[];
  installments?: number;
  reimbursement_rate?: unknown;
  max_allowed_amount?: number;
  payment_method_option_id?: string;
  installment_amount?: number;
  recommended_message?: string;
  total_amount?: number;
}

export interface FinancingDeals {
  legals?: unknown;
  installments?: unknown;
  expiration_date?: unknown;
  start_date?: unknown;
  status: string;
}

export interface SecurityCode {
  mode: string;
  length: number;
}

export interface CardNumber {
  length: number;
  validation: string;
}

export interface Bin {
  pattern: string;
  installments_pattern: string;
  exclusion_pattern: string;
}

export interface Setting {
  security_code: SecurityCode;
  card_number: CardNumber;
  bin: Bin;
}

export interface Result {
  financial_institutions?: unknown[];
  secure_thumbnail?: string;
  payer_costs?: PayerCost[];
  issuer?: Issuer;
  total_financial_cost?: unknown;
  min_accreditation_days?: number;
  max_accreditation_days?: number;
  merchant_account_id?: string;
  id?: string;
  payment_type_id?: string;
  accreditation_time?: number;
  thumbnail?: string;
  bins?: unknown[];
  marketplace?: string;
  deferred_capture?: string;
  agreements?: unknown[];
  labels?: string[];
  financing_deals?: FinancingDeals;
  name?: string;
  site_id?: string;
  processing_mode?: string;
  additional_info_needed?: string[];
  status?: string;
  settings?: Setting[];
}

export interface Paging {
  total: number;
  limit: number;
  offset: number;
}

export interface UpdateFieldsProps {
  installments?: PayerCost;
  issuer?: Result;
}

export interface FormField {
  label: string;
  name: keyof MercadoPagoFormValues;
  placeholder?: string;
  validate?: (value: string) => string | undefined;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: SetFieldValue,
    values: MercadoPagoFormValues
  ) => void;
  maxLength?: number;
  minLength?: number;
}

interface SelectFieldOption {
  name: string | undefined;
  value: string | number | undefined;
}

export interface SelectFieldProps {
  label: string;
  name: keyof MercadoPagoFormValues;
  options: SelectFieldOption[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: SetFieldValue
  ) => void;
  errors?: string;
  touched?: boolean;
}

export interface State {
  mp: MercadoPagoInstance | null;
  error: Error | null;
}

interface SetMPActionPayload {
  mp: MercadoPagoInstance;
}

interface SetErrorActionPayload {
  error: Error;
}

interface SetMPAction {
  type: typeof actionTypes.SET_MP;
  payload: SetMPActionPayload;
}

interface SetErrorAction {
  type: typeof actionTypes.SET_ERROR;
  payload: SetErrorActionPayload;
}

export interface MercadoPagoFormComponentProps {
  apiKey: string;
  amount: number;
  onValidityChange: (isValid: boolean) => void;
  onSubmitSuccess: (token: CardToken | undefined) => void;
  formikRef?: (formik: FormikHelpers<MercadoPagoFormValues> | null) => void;
}

export interface ErrorMessageProps {
  message: string;
}
