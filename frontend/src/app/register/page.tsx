"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useRegisterUserMutation } from "../store/features/auth/authapi";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { username, email, password };
    try {
      const response = await registerUser(data).unwrap();
      console.log("Register response:", response);
      enqueueSnackbar("Registration successful!", { variant: "success" });
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      enqueueSnackbar(error?.data?.message || "Registration failed", { variant: "error" });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold text-center">Please Register</h2>

        <form onSubmit={handleSubmit} className="space-y-5 pt-8">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-5 bg-[var(--primary-color)] text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="my-5 italic text-sm text-center">
          Have an account?
          <Link className="text-red-500 px-1 underline-offset-2" href="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
