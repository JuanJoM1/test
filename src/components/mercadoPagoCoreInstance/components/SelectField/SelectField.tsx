import React from "react";
import { Field } from "formik";
import { SelectFieldProps } from "../../../../models";
import { getFieldClassName } from "../../../../utils";

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  onChange,
  errors,
  touched,
}) => (
  <div className={`mercado-pago-form__container__${name}`}>
    <label className="mercado-pago-form__container__label" htmlFor={name}>
      {label}
    </label>
    <div className="mercado-pago-form__container__select">
      <Field
        className={getFieldClassName(errors, touched)}
        as="select"
        id={name}
        name={name}
        aria-describedby={errors && touched ? `${name}-error` : undefined}
        aria-invalid={errors && touched}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </Field>
    </div>
    {errors && touched && (
      <div className="mercado-pago-form__container__error" role="alert">
        {errors}
      </div>
    )}
  </div>
);

export default SelectField;
