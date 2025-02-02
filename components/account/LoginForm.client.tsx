"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput.client";
import FormButton from "./FormButton.client";

interface FormErrors {
  email?: string;
  password?: string;
}

/**
 * LoginForm Component (Client-Side)
 *
 * A form component for user login. Handles form validation, submission, and error display.
 * Fetches data from the `/api/auth/login` endpoint and redirects to the account page on success.
 *
 * @returns {JSX.Element} - A login form with email and password fields.
 */

const LoginForm = () => {
  const contentType = "application/json";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /**
   * Validates the form fields and returns an object of errors.
   *
   * @returns {FormErrors} - An object containing validation errors.
   */
  const formValidate = () => {
    const err: FormErrors = {};
    if (!email) err.email = "Email is required";
    if (!password) err.password = "Password is required";
    return err;
  };

  /**
   * Sends a login request to the API and handles the response.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   */
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(response.status.toString());
      }

      router.push("/account");
    } catch (error) {
      console.error(error);
      setMessage("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles form submission, validates the form, and initiates the login process.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      login(email, password);
    } else {
      setErrors(errs);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={loading}
          error={errors.email}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={loading}
          error={errors.password}
        />

        <FormButton
          loading={loading}
          text="Log In"
          loadingText="Logging in..."
        />
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default LoginForm;
