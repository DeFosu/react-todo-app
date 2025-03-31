import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ROUTES } from "../../utils/routes";
import {
  AuthLink,
  Divider,
  FormInput,
  SubmitButton,
} from "../../components/Form";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

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
    setError,
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
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormProps> = async ({
    name,
    email,
    password,
  }) => {
    setAuthError("");
    setIsSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      console.log("Registered:", userCredential.user);
      navigate(ROUTES.home);
    } catch (error) {
      setIsSubmitting(false);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("email", {
              type: "manual",
              message: "This email is already registered",
            });
            break;
          case "auth/invalid-email":
            setError("email", {
              type: "manual",
              message: "Invalid email address",
            });
            break;
          case "auth/weak-password":
            setError("password", {
              type: "manual",
              message: "Password should be at least 6 characters",
            });
            break;
          case "auth/operation-not-allowed":
            setAuthError("Registration is currently disabled");
            break;
          case "auth/too-many-requests":
            setAuthError("Too many attempts. Try again later.");
            break;
          default:
            setAuthError("Failed to create account. Please try again.");
            console.error("Registration error:", error);
        }
      } else {
        setAuthError("An unexpected error occurred. Please try again.");
        console.error("Unexpected error:", error);
      }
    }
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-center">Create Account</h1>
      <Divider />

      {authError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {authError}
        </div>
      )}

      <div className="flex flex-col gap-4">
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
              onTogglePassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
              autoComplete="new-password"
            />
          )}
        />

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

        <SubmitButton
          value="Sign Up"
          className="mt-4"
          disabled={isSubmitting}
        />

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
