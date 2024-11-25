"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Error {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const contentType = "application/json";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formValidate = () => {
    const err: Error = {};
    if (!email) err.email = "Email is required";
    if (!password) err.password = "Password is required";
    return err;
  };

  const postData = async (email: string, password: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      postData(email, password);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-style"
            placeholder="email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-style"
            placeholder="password"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p>{message}</p>
      <ul>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoginForm;
