import React from 'react';
import { createRoot } from "react-dom/client";
import { FormikHelpers } from "formik";
import { CardToken, MercadoPagoFormValues } from "../../models";
import { MercadoPagoFormComponent } from "./components";

class MercadoPagoCoreInstance {
  private formikInstance: FormikHelpers<MercadoPagoFormValues> | null = null;
  onValidityChangeCallback: (isValid: boolean) => void;
  onSubmitSuccessChangeCallback: (data: CardToken | undefined) => void;

  constructor(
    private apiKey: string,
    private amount: number,
    onValidityChangeCallback: (isValid: boolean) => void,
    onSubmitSuccessChangeCallback: (data: CardToken | undefined) => void
  ) {
    this.onValidityChangeCallback = onValidityChangeCallback;
    this.onSubmitSuccessChangeCallback = onSubmitSuccessChangeCallback;
  }

  mount(domNode: HTMLElement | string): this {
    console.log(domNode);
    console.log("here")
    const node =
      typeof domNode === "string"
        ? document.querySelector<HTMLElement>(domNode)
        : domNode;

    if (!node) {
      throw new Error("Component could not mount. Root node was not found.");
    }
    
    const root = createRoot(node);
    console.log(node)
    root.render(
      <MercadoPagoFormComponent
        apiKey={this.apiKey}
        amount={this.amount}
        onValidityChange={(isValid) => this.handleValidityChange(isValid)}
        onSubmitSuccess={(data) => this.handleonSubmitSuccessChange(data)}
        formikRef={(formik) => (this.formikInstance = formik)}
      />
    );
    
    return this;
  }

  handleValidityChange(isValid: boolean): void {
    this.onValidityChangeCallback(isValid);
  }

  handleonSubmitSuccessChange(data: CardToken | undefined): void {
    this.onSubmitSuccessChangeCallback(data);
  }

  createToken(): void {
    this.formikInstance?.submitForm();
  }
}

export default MercadoPagoCoreInstance;
