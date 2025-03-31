import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ROUTES } from "../../utils/routes";
import {
  Divider,
  SubmitButton,
  AuthLink,
  FormInput,
} from "../../components/Form";

type FormProps = {
  email: string;
  password: string;
};

export const SignIn: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormProps> = (data) => console.log(data);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-center">Sign In</h1>
      <Divider />
      <div className="flex flex-col gap-4">
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
              onTogglePassword={togglePasswordVisibility}
              showPassword={showPassword}
              autoComplete="current-password"
            />
          )}
        />

        <SubmitButton value="Sign In" className="mt-4" />
        <AuthLink
          promptText="Don't have an account?"
          linkText="Sign Up"
          to={ROUTES.singUp}
        />
      </div>
    </form>
  );
};

export default SignIn;
