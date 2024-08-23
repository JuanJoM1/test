const getFieldClassName = (
  fieldError: string | undefined,
  fieldTouched: boolean | undefined
) =>
  `mercado-pago-form__container__field${
    fieldError && fieldTouched
      ? " mercado-pago-form__container__field--error"
      : ""
  }`;

export default getFieldClassName;
