import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Eye, EyeOff } from "lucide-react";

type FormInputProps = {
  label: string;
  type: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  errors?: any;
  required?: boolean;
  className?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
  validationMessage?: string;
  autoComplete?: string;
  placeholder?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  errors,
  required = false,
  className = "",
  showPasswordToggle = false,
  onTogglePassword,
  showPassword,
  validationMessage,
  autoComplete,
  placeholder,
}) => {
  return (
    <div className="relative">
      <label className="absolute z-10 left-2 -top-2.5 text-sm px-2 bg-neutral-800">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className={`px-2 ${
            showPasswordToggle ? "pr-12" : ""
          } py-2.5 border w-full focus-within:outline-0 rounded text-neutral-50 bg-neutral-800 ${className} ${
            errors?.[name] ? "border-red-500" : "border-neutral-700"
          }`}
          aria-invalid={errors?.[name] ? "true" : "false"}
          aria-describedby={`${name}-error`}
        />
        {showPasswordToggle && onTogglePassword && (
          <div className="absolute z-10 right-2 top-0 bottom-0 flex items-center">
            <button
              type="button"
              className=" cursor-pointer aspect-square p-1"
              onClick={onTogglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        )}
      </div>
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

export default FormInput;
