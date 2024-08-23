import React from "react";
import { useCallback, useEffect } from "react";
import { useFormikContext } from "formik";
import { MercadoPagoFormValues, UpdateFieldsProps } from "../models";

const UpdateFormFields: React.FC<UpdateFieldsProps> = ({
  installments,
  issuer,
}) => {
  const { setFieldValue } = useFormikContext<MercadoPagoFormValues>();

  const updateFields = useCallback(() => {
    if (installments) {
      const initialValueInstallments = installments.installments;
      setFieldValue("installments", initialValueInstallments);
    }
    if (issuer) {
      const initialValueIssuer = issuer.name;
      setFieldValue("issuer", initialValueIssuer);
    }
  }, [installments, issuer, setFieldValue]);

  useEffect(() => {
    updateFields();
  }, [updateFields]);

  return null;
};

export default UpdateFormFields;
