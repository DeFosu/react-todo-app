import React from "react";
import { ErrorMessage } from "@hookform/error-message";

type FormTextareaProps = {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  errors?: any;
  required?: boolean;
  className?: string;
  validationMessage?: string;
  autoComplete?: string;
  rows?: number;
};

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  errors,
  required = false,
  className = "",
  validationMessage,
  autoComplete,
  rows = 3,
}) => {
  return (
    <div className="relative">
      <label className="absolute z-10 left-2 -top-2.5 text-sm px-2 bg-neutral-800">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        rows={rows}
        className={`px-2 py-2.5 border w-full focus-within:outline-0 rounded text-neutral-50 bg-neutral-800 ${className} ${
          errors?.[name] ? "border-red-500" : "border-neutral-700"
        }`}
        aria-invalid={errors?.[name] ? "true" : "false"}
        aria-describedby={`${name}-error`}
      />
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
              {message || validationMessage}
            </p>
          )}
        />
      )}
    </div>
  );
};

export default FormTextarea;
