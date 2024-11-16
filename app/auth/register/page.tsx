"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Error {
  name?: string;
  email?: string;
  password?: string;
}

const Page = () => {
  const contentType = "application/json";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formValidate = () => {
    const err: Error = {};
    if (!name) err.name = "Name is required";
    if (!email) err.email = "Email is required";
    if (!password) err.password = "Password is required";
    return err;
  };

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
      console.error(error);
      setMessage("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      postData(name, email, password);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-style"
            placeholder="name"
          />
        </div>

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
          {loading ? "Registering..." : "Register"}
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

export default Page;
