"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StorageNodeCard from "@/components/StorageNodeCard";
import useApi from "@/hooks/useApi";
import toast from "react-hot-toast";

export default function HomePage() {
  const { list } = useApi("/storage-nodes/summary");
  const [nodes, setNodes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login or sign up to access the dashboard.");
      router.push("/users");
      return;
    }

    (async () => {
      try {
        const data = await list();
        setNodes(data);
      } catch {
        toast.error("Failed to load dashboard data");
      }
    })();
  }, [list, router]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nodes.map((node) => (
          <StorageNodeCard key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
