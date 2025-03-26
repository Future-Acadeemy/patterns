import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
        The Big Five Personality Test
      </h2>
      <div className="flex-1">{children}</div>
      <footer className="mt-12 text-center text-sm text-gray-600">
        <p>Dr. Mohamed Saad</p>
      </footer>
    </div>
  );
}
