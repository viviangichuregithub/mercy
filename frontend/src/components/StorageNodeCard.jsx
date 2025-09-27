"use client";
import { useState } from "react";

export default function StorageNodeCard({ node, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow border flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-blue-700">{node.name}</h3>
        <p className="text-sm text-gray-500">{node.location}</p>
        <p className="mt-2 text-sm">
          <strong>Status:</strong> {node.status}
        </p>
        <p className="text-sm">
          <strong>Capacity:</strong> {node.capacity} MB
        </p>
        <p className="text-sm">
          <strong>Used:</strong> {node.used || 0} MB
        </p>
        <p className="text-sm">
          <strong>Remaining:</strong>{" "}
          {node.capacity - (node.used || 0)} MB
        </p>
      </div>

      <div className="mt-3">
        {confirming ? (
          <div className="flex gap-2">
            <button
              onClick={() => onDelete(node.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Confirm
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
