import React from "react";
import { Field } from "formik";
import { getFieldClassName } from "../../../../utils";
import { FormFieldProps } from "../../../../models";

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  validate,
  onChange,
  errors,
  touched,
  maxLength,
  minLength,
}) => (
  <div className={`mercado-pago-form__container__${name}`}>
    <label className="mercado-pago-form__container__label" htmlFor={name}>
      {label}
    </label>
    <Field
      className={getFieldClassName(errors, touched)}
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      validate={validate}
      aria-describedby={errors && touched ? `${name}-error` : undefined}
      aria-invalid={errors && touched}
      onChange={onChange}
      maxLength={maxLength}
      minLength={minLength}
    />
    {errors && touched && (
      <div className="mercado-pago-form__container__error" role="alert">
        {errors}
      </div>
    )}
  </div>
);

export default FormField;
