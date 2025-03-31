import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ROUTES } from "../../utils/routes";
import {
  AuthLink,
  Divider,
  FormInput,
  SubmitButton,
} from "../../components/Form";

type FormProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<FormProps> = (data) => console.log(data);

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-center">Create Account</h1>
      <Divider />
      <div className="flex flex-col gap-4">
        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Please enter your name",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          }}
          render={({ field }) => (
            <FormInput
              label="Full Name"
              type="text"
              name="name"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              errors={errors}
              required
              autoComplete="name"
            />
          )}
        />

        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Please enter your email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
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
              autoComplete="email"
            />
          )}
        />

        {/* Password Field */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Please enter your password",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ field }) => (
            <FormInput
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              errors={errors}
              required
              showPasswordToggle
              onTogglePassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
              autoComplete="new-password"
            />
          )}
        />

        {/* Confirm Password Field */}
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <FormInput
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              errors={errors}
              required
              showPasswordToggle
              onTogglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              showPassword={showConfirmPassword}
              autoComplete="new-password"
            />
          )}
        />

        <SubmitButton value="Sign Up" className="mt-4" />

        <AuthLink
          promptText="Already have an account?"
          linkText="Sign In"
          to={ROUTES.signIn}
        />
      </div>
    </form>
  );
};

export default SignUp;
