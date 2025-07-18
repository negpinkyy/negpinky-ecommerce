"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "../store/features/auth/authapi";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../store/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await loginUser(data).unwrap();
      console.log("Login response:", response);
      const {token,user} = response;
      dispatch(setUser(user))
      enqueueSnackbar("Login successful!", { variant: "success" });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch  {
      enqueueSnackbar("Please provide a valid email and password", { variant: "error" });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold text-center">Please Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto pt-8">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full mt-5 bg-[var(--primary-color)] text-white hover:bg-indigo-500 font-medium py-3 rounded-md disabled:opacity-50"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="my-5 italic text-sm text-center">
          Don&apos;t have an account?
          <Link className="text-red-500 px-1 underline-offset-2" href="/register">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
