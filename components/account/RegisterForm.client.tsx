// components/RegisterForm.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput.client";
import FormButton from "./FormButton.client";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

/**
 * RegisterForm Component (Client-Side)
 *
 * A form component for user registration. Handles form validation, submission, and error display.
 * Fetches data from the `/api/auth/register` endpoint and redirects to the home page on success.
 *
 * @returns {JSX.Element} - A registration form with name, email, and password fields.
 */
const RegisterForm = () => {
  const contentType = "application/json";
  const router = useRouter();

  const [name, setName] = useState("");
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
  const formValidate = (): FormErrors => {
    const err: FormErrors = {};
    if (!name) err.name = "Name is required";
    if (!email) err.email = "Email is required";
    if (!password) err.password = "Password is required";
    return err;
  };

  /**
   * Sends a registration request to the API and handles the response.
   *
   * @param {string} name - The user's name.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   */
  const postData = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error(response.status.toString());
      }

      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles form submission, validates the form, and initiates the registration process.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      await postData(name, email, password);
    } else {
      setErrors(errs);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          disabled={loading}
          error={errors.name}
        />

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
          text="Register"
          loadingText="Registering..."
        />
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default RegisterForm;
