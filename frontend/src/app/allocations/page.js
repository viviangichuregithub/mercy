"use client";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import AllocationForm from "@/components/AllocationForm";
import toast from "react-hot-toast";

export default function AllocationsPage() {
  const { list, remove } = useApi("/allocations");
  const [allocations, setAllocations] = useState([]);

  const fetchAllocations = async () => {
    try {
      setAllocations(await list());
    } catch {
      toast.error("Failed to load allocations");
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Allocations</h1>

      {/* Form */}
      <AllocationForm onSuccess={fetchAllocations} />

      {/* List */}
      <div>
        <h2 className="font-semibold mb-2">Existing Allocations</h2>
        {allocations.length === 0 ? (
          <p className="text-gray-500">No allocations found.</p>
        ) : (
          <ul className="space-y-2">
            {allocations.map((a) => (
              <li
                key={a.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  Upload #{a.upload_id} → Node #{a.storage_node_id} (
                  {a.allocated_size} MB)
                </span>
                <button
                  onClick={async () => {
                    try {
                      await remove(a.id);
                      toast.success("Allocation deleted");
                      fetchAllocations();
                    } catch {
                      toast.error("Failed to delete allocation");
                    }
                  }}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
