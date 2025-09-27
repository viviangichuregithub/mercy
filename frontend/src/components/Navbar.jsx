"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <div className="flex gap-4">
        <Link href="/">Dashboard</Link>
        <Link href="/users">Users</Link>
        <Link href="/uploads">Uploads</Link>
        <Link href="/allocations">Allocations</Link>
        <Link href="/storage-nodes">Storage Nodes</Link>
      </div>
      <div>
        {user ? (
          <div className="flex gap-3 items-center">
            <span>{user.username} ({user.role})</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
