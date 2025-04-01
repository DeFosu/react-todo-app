import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Divider, FormInput, SubmitButton, FormTextarea } from "../../Form";

type TaskFormProps = {
  onSubmit: (title: string, description?: string) => void;
  onCancel?: () => void;
};

type FormProps = {
  title: string;
  description: string;
};

const AddTaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleFormSubmit = ({ title, description }: FormProps) => {
    onSubmit(title, description);
  };

  return (
    <div className="bg-neutral-800 text-neutral-300 fill-neutral-300 border border-neutral-700 rounded-2xl px-4 py-6 w-full min-w-60 max-w-md ">
      <form onSubmit={handleSubmit(handleFormSubmit)} className=" w-full ">
        <h1 className="text-2xl font-semibold text-center">Add Task</h1>
        <Divider />
        <div className="mb-5 flex flex-col gap-4">
          <Controller
            name="title"
            control={control}
            rules={{
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            }}
            render={({ field }) => (
              <FormInput
                label="Title"
                type="text"
                name="title"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                errors={errors}
                required
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: false,
              minLength: {
                value: 3,
                message: "Description must be at least 3 characters",
              },
            }}
            render={({ field }) => (
              <FormTextarea
                label="Description"
                name="description"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                errors={errors}
              />
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
          <SubmitButton value="Add" className="mt-4" />
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
