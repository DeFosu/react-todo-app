import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ROUTES } from "../../utils/routes";
import {
  Divider,
  SubmitButton,
  AuthLink,
  FormInput,
} from "../../components/Form";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";

type FormProps = {
  email: string;
  password: string;
};

export const SignIn: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormProps> = async ({ email, password }) => {
    setAuthError("");
    setIsSubmitting(true);

    try {
      const userAuth = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userAuth.user);
      navigate(ROUTES.home);
    } catch (error) {
      setIsSubmitting(false);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("email", {
              type: "manual",
              message: "Invalid email address",
            });
            break;
          case "auth/user-disabled":
            setAuthError("This account has been disabled");
            break;
          case "auth/user-not-found":
            setError("email", {
              type: "manual",
              message: "No account found with this email",
            });
            break;
          case "auth/wrong-password":
            setError("password", {
              type: "manual",
              message: "Incorrect password",
            });
            break;
          case "auth/too-many-requests":
            setAuthError("Too many attempts. Try again later.");
            break;
          default:
            setAuthError("Failed to sign in. Please try again.");
            console.error("Sign in error:", error);
        }
      } else {
        setAuthError("An unexpected error occurred. Please try again.");
        console.error("Unexpected error:", error);
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-center">Sign In</h1>
      <Divider />

      {authError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {authError}
        </div>
      )}

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

        <SubmitButton
          value="Sign In"
          className="mt-4"
          disabled={isSubmitting}
        />
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
