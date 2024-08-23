import React from "react";
import "./ErrorMessage.scss";
import { ErrorMessageProps } from "../../../../models";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-message" role="alert" data-testid="error-message">
      <p className="error-message__text">{message}</p>
    </div>
  );
};

export default ErrorMessage;
