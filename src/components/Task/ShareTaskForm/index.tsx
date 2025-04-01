import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Divider, FormInput, SubmitButton } from "../../Form";

type SharedWith = {
  email: string;
  role: "admin" | "user";
};

interface ShareTaskFormProps {
  onSubmit: (email: string, role: "admin" | "user") => void;
  onCancel: () => void;
  sharedWith?: SharedWith[];
  onUnshare?: (email: string) => void;
  isOwner?: boolean;
}

type FormProps = {
  email: string;
  role: "admin" | "user";
};

const ShareTaskForm: React.FC<ShareTaskFormProps> = ({
  onSubmit,
  onCancel,
  sharedWith = [],
  onUnshare,
  isOwner = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormProps>({
    defaultValues: {
      email: "",
      role: "user",
    },
  });

  const handleFormSubmit = ({ email, role }: FormProps) => {
    onSubmit(email, role);
    reset();
  };

  return (
    <div className="bg-neutral-800 text-neutral-300 fill-neutral-300 border border-neutral-700 rounded-2xl px-4 py-6 w-full min-w-60 max-w-md">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
        <h1 className="text-2xl font-semibold text-center">Share Task</h1>
        <Divider />
        <div className="mb-5 flex flex-col gap-4">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            }}
            render={({ field }) => (
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                errors={errors}
                required
                placeholder="Enter user's email"
              />
            )}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={field.value === "admin"}
                      onChange={() => field.onChange("admin")}
                      className="mr-2"
                    />
                    Admin (can edit)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={field.value === "user"}
                      onChange={() => field.onChange("user")}
                      className="mr-2"
                    />
                    User (view only)
                  </label>
                </div>
              </div>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            type="button"
            className="p-2 w-full mt-4 bg-neutral-800 text-neutral-300 cursor-pointer rounded font-semibold hover:underline focus-within:underline"
          >
            Cancel
          </button>
          <SubmitButton value="Share" className="mt-4" />
        </div>
      </form>

      {isOwner && sharedWith.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-3">Shared with:</h4>
          <ul className="divide-y divide-neutral-700">
            {sharedWith.map((item) => (
              <li
                key={item.email}
                className="py-3 flex justify-between items-center"
              >
                <span>
                  {item.email} ({item.role})
                </span>
                {onUnshare && (
                  <button
                    onClick={() => onUnshare(item.email)}
                    className="text-red-500 hover:text-red-400 text-sm px-2 py-1 rounded hover:bg-red-900/20"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareTaskForm;
