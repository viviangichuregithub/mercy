"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function UsersPage() {
  const [mode, setMode] = useState("login"); // "login" or "signup"

  // Validation Schemas
  const signupSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handlers
  const handleSignup = async (values, { resetForm }) => {
    try {
      const { confirmPassword, ...payload } = values; // omit confirmPassword
      await api.post("/users/", payload);
      toast.success("Account created! You can now log in.");
      resetForm();
      setMode("login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
    }
  };

  const handleLogin = async (values, { resetForm }) => {
    try {
      const res = await api.post("/users/login", values);
      localStorage.setItem("token", res.data.token);
      toast.success(`Welcome back, ${res.data.username}!`);
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">User Authentication</h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4">
        <button
          className={`px-4 py-2 rounded ${
            mode === "login" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 rounded ${
            mode === "signup" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Signup Form */}
      {mode === "signup" && (
        <Formik
          initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={signupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 bg-white p-4 rounded shadow">
              <div>
                <label className="block text-sm font-medium">Username</label>
                <Field name="username" className="w-full border px-3 py-2 rounded" />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field type="email" name="email" className="w-full border px-3 py-2 rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <Field type="password" name="password" className="w-full border px-3 py-2 rounded" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* Login Form */}
      {mode === "login" && (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 bg-white p-4 rounded shadow">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field type="email" name="email" className="w-full border px-3 py-2 rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <Field type="password" name="password" className="w-full border px-3 py-2 rounded" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
