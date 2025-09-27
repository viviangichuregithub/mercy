"use client";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import useApi from "@/hooks/useApi";

const AllocationSchema = Yup.object().shape({
  upload_id: Yup.number().required("Upload is required"),
  storage_node_id: Yup.number().required("Storage node is required"),
  user_id: Yup.number().required("User is required"),
});

export default function AllocationForm({ onSuccess }) {
  const { list: listUploads } = useApi("/uploads");
  const { list: listNodes } = useApi("/storagenodes");
  const { list: listUsers } = useApi("/users");
  const { create } = useApi("/allocations");

  const [uploads, setUploads] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setUploads(await listUploads());
        setNodes(await listNodes());
        setUsers(await listUsers());
      } catch {
        toast.error("Failed to fetch data for allocation");
      }
    })();
  }, []);

  return (
    <Formik
      initialValues={{ upload_id: "", storage_node_id: "", user_id: "" }}
      validationSchema={AllocationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await create(values);
          toast.success("Allocation created successfully");
          resetForm();
          onSuccess?.();
        } catch {
          toast.error("Failed to create allocation");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3 bg-white p-4 rounded shadow">
          {/* Upload Select */}
          <div>
            <label htmlFor="upload_id">Upload *</label>
            <Field
              as="select"
              name="upload_id"
              className="border w-full p-2 rounded"
            >
              <option value="">Select Upload</option>
              {uploads.map((upload) => (
                <option key={upload.id} value={upload.id}>
                  {upload.filename} ({upload.size} MB)
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="upload_id"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Storage Node Select */}
          <div>
            <label htmlFor="storage_node_id">Storage Node *</label>
            <Field
              as="select"
              name="storage_node_id"
              className="border w-full p-2 rounded"
            >
              <option value="">Select Storage Node</option>
              {nodes.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.name} ({node.location})
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="storage_node_id"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* User Select */}
          <div>
            <label htmlFor="user_id">User *</label>
            <Field
              as="select"
              name="user_id"
              className="border w-full p-2 rounded"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="user_id"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Saving..." : "Create Allocation"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
