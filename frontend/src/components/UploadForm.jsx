"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import useApi from "@/hooks/useApi";
import { Button } from "@/components/ui/button";

const UploadSchema = Yup.object().shape({
  filename: Yup.string().required("Filename is required"),
  size: Yup.number().positive("Must be greater than 0").required("Size is required"),
  user_id: Yup.number().required("User ID is required"),
});

export default function UploadForm({ onSuccess }) {
  const { create } = useApi("/uploads");

  return (
    <Formik
      initialValues={{ filename: "", size: "", user_id: "" }}
      validationSchema={UploadSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          // Ensure numeric values are sent as numbers
          const payload = {
            ...values,
            size: Number(values.size),
            user_id: Number(values.user_id),
          };

          await create(payload);
          toast.success("Upload created");
          resetForm();
          onSuccess?.();
        } catch {
          toast.error("Failed to create upload");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 bg-white p-4 rounded-xl shadow">
          {/* Filename */}
          <div>
            <label htmlFor="filename" className="block text-sm font-medium">
              Filename
            </label>
            <Field
              id="filename"
              name="filename"
              className="border w-full p-2 rounded mt-1"
              placeholder="Enter filename"
            />
            <ErrorMessage name="filename" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Size */}
          <div>
            <label htmlFor="size" className="block text-sm font-medium">
              Size (MB)
            </label>
            <Field
              id="size"
              name="size"
              type="number"
              className="border w-full p-2 rounded mt-1"
              placeholder="e.g. 120"
            />
            <ErrorMessage name="size" component="div" className="text-red-500 text-sm" />
          </div>

          {/* User ID */}
          <div>
            <label htmlFor="user_id" className="block text-sm font-medium">
              User ID
            </label>
            <Field
              id="user_id"
              name="user_id"
              type="number"
              className="border w-full p-2 rounded mt-1"
              placeholder="Enter your user ID"
            />
            <ErrorMessage name="user_id" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isSubmitting} variant="default" size="lg" style={{ width: "100%" }}>
            {isSubmitting ? "Saving..." : "Add Upload"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
