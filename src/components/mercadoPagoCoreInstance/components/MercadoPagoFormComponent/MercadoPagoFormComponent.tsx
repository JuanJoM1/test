import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useState } from "react";
import usePaymentMethodsAndInstallments from "../../../../hooks/usePaymentMethodsAndInstallments";
import useIdentificationTypes from "../../../../hooks/useIdentificationTypes";
import useSecurityCodeMaxLength from "../../../../hooks/useSecurityCodeMaxLength";
import {
  initialValues,
  MercadoPagoFormComponentProps,
  MercadoPagoFormValues,
} from "../../../../models";
import { useMercadoPagoInstance } from "../../../../hooks";
import "./MercadoPagoFormComponent.scss";
import {
  hasPaymentMethodsAndInstallments,
  validationSchema,
} from "../../../../utils";
import { UpdateFormFields, useFormFieldHandlers } from "../../../../handlers";
import { cardToken } from "../../../../services";
import { SelectField } from "../SelectField";
import { FormField } from "../FormField";
import { FormSkeleton } from "../FormSkeleton";
import { ErrorMessage } from "../ErrorMessage";

const MercadoPagoFormComponent: React.FC<MercadoPagoFormComponentProps> = ({
  apiKey,
  amount,
  onValidityChange,
  onSubmitSuccess,
  formikRef,
}) => {
  const { error } = useMercadoPagoInstance(apiKey);
  const [cardNumber, setCardNumber] = useState("");
  const { paymentMethods, installments, paymentInfo } =
    usePaymentMethodsAndInstallments(cardNumber, amount);
  const { identificationTypes, errorFetch } = useIdentificationTypes();
  const securityCodeMaxLength = useSecurityCodeMaxLength(paymentMethods);
  const { formFields, selectFields } = useFormFieldHandlers(
    paymentMethods,
    installments,
    identificationTypes,
    setCardNumber,
    securityCodeMaxLength
  );
  
  if (error || errorFetch) {
    return <ErrorMessage message={error?.message || errorFetch} />;
  }
  console.log("here")
  const handleSubmit = async (
    values: MercadoPagoFormValues,
    { setSubmitting }: FormikHelpers<MercadoPagoFormValues>
  ) => {
    setSubmitting(false);
    const responseCardToken = await cardToken(values);
    const normalizeResponseData = {
      ...responseCardToken,
      installments: Number(values.installments),
      issuerId: paymentInfo?.issuerId,
      paymentMethodId: paymentInfo?.paymentMethodId,
    };
    onSubmitSuccess(normalizeResponseData);
  };

  return (
    <>
      {identificationTypes && identificationTypes.length > 0 ? (
        <Formik
          initialValues={{
            ...initialValues,
            identificationTypes: identificationTypes[0].name,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          innerRef={(formik) => {
            if (formikRef) {
              formikRef(formik);
            }
          }}
        >
          {({ values, errors, touched, setFieldValue, isValid, dirty }) => {
            const formIsValid = isValid && dirty;
            onValidityChange(formIsValid);
            return (
              <Form id="mercado-pago-form" role="mercado-pago-form">
                <div className="mercado-pago-form__container">
                  {formFields.map((field) => (
                    <FormField
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      placeholder={field.placeholder}
                      validate={field.validate}
                      onChange={(e) =>
                        field.onChange &&
                        field.onChange(e, setFieldValue, values)
                      }
                      errors={errors[field.name]}
                      touched={touched[field.name]}
                      maxLength={field.maxLength}
                      minLength={field.minLength}
                    />
                  ))}
                  {selectFields
                    .filter((field) =>
                      hasPaymentMethodsAndInstallments(
                        paymentMethods,
                        installments,
                        field.name
                      )
                    )
                    .map((field) => (
                      <React.Fragment key={field.name}>
                        <SelectField
                          key={field.name}
                          label={field.label}
                          name={field.name}
                          options={field.options}
                          onChange={(e) =>
                            field.onChange && field.onChange(e, setFieldValue)
                          }
                          errors={errors[field.name]}
                          touched={touched[field.name]}
                        />
                        {paymentMethods &&
                          paymentMethods.results &&
                          installments &&
                          installments[0]?.payer_costs && (
                            <UpdateFormFields
                              issuer={paymentMethods.results[0]}
                              installments={installments[0].payer_costs[0]}
                            />
                          )}
                      </React.Fragment>
                    ))}
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <FormSkeleton />
      )}
    </>
  );
};

export default MercadoPagoFormComponent;
