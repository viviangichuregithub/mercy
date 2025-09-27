"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import UploadForm from "@/components/UploadForm"; // ✅ import form

export default function UploadsPage() {
  const [uploads, setUploads] = useState([]);

  // fetch uploads
  const fetchUploads = async () => {
    try {
      const res = await api.get("/uploads");
      setUploads(res.data);
    } catch {
      toast.error("Failed to load uploads");
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  // delete upload
  const handleDelete = async (id) => {
    try {
      await api.delete(`/uploads/${id}`);
      toast.success("Upload deleted");
      fetchUploads();
    } catch {
      toast.error("Failed to delete upload");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Uploads</h1>

      {/* ✅ Use the reusable UploadForm */}
      <UploadForm onSuccess={fetchUploads} />

      {/* Uploads List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {uploads.map((upload) => (
          <motion.div
            key={upload.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white shadow rounded-xl">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{upload.filename}</p>
                  <p className="text-sm text-gray-500">
                    {upload.size} MB •{" "}
                    {new Date(upload.timestamp).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(upload.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
