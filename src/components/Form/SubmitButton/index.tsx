import React from "react";

type SubmitButtonProps = {
  value: string;
  className?: string;
  disabled?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  value,
  className = "",
  disabled = false,
}) => {
  return (
    <input
      type="submit"
      value={value}
      disabled={disabled}
      className={`p-2 w-full bg-neutral-300 text-neutral-800 cursor-pointer rounded border-2 border-neutral-300 outline-2 outline-neutral-800 hover:outline-neutral-300 hover:border-neutral-800 duration-300 transition font-semibold focus-within:outline-neutral-300 focus-within:border-neutral-800 ${className}`}
    />
  );
};

export default SubmitButton;
