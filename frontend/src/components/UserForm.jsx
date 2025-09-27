"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import useApi from "@/hooks/useApi";

const UserSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid").required("Required"),
  password: Yup.string().min(6).required("Required"),
});

export default function UserForm({ onSuccess }) {
  const { create } = useApi("/users");

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={UserSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await create(values);
          toast.success("User created");
          resetForm();
          onSuccess?.();
        } catch {
          toast.error("Failed to create user");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3">
          <div>
            <label>Username</label>
            <Field name="username" className="border w-full p-2 rounded" />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label>Email</label>
            <Field name="email" type="email" className="border w-full p-2 rounded" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" type="password" className="border w-full p-2 rounded" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Saving..." : "Create User"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
