"use client";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
          <div className="px-6 py-4 text-xl font-bold border-b">Data Hub</div>
          <nav className="flex-1 p-4 space-y-2">
            <a href="/" className="block px-3 py-2 rounded-md hover:bg-gray-100">
              Dashboard
            </a>
            <a
              href="/allocations"
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Allocations
            </a>
            <a
              href="/uploads"
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Uploads
            </a>
            <a
              href="/users"
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Users
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
          <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}
