import React from 'react';
import "./FormSkeleton.scss";

const FormSkeleton = () => {
  return (
    <div className="form-skeleton">
      <div
        className="form-skeleton__input"
        data-testid="form-skeleton-input"
      ></div>
      <div
        className="form-skeleton__input"
        data-testid="form-skeleton-input"
      ></div>
      <div
        className="form-skeleton__input"
        data-testid="form-skeleton-input"
      ></div>
      <div
        className="form-skeleton__input"
        data-testid="form-skeleton-input"
      ></div>
      <div
        className="form-skeleton__input"
        data-testid="form-skeleton-input"
      ></div>
      <div
        className="form-skeleton__input"
        data-testid="form-skeleton-input"
      ></div>
    </div>
  );
};

export default FormSkeleton;
