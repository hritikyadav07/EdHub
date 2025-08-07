import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminTest = () => {
  const { currentUser, isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Route Test</h1>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>

          <div className="space-y-2">
            <p>
              <strong>Is Authenticated:</strong>{" "}
              {isAuthenticated ? "✅ Yes" : "❌ No"}
            </p>
            <p>
              <strong>Is Admin:</strong> {isAdmin() ? "✅ Yes" : "❌ No"}
            </p>
            <p>
              <strong>Current User:</strong>
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(currentUser, null, 2)}
            </pre>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4">
          <p className="text-blue-800">
            ✅ If you can see this page, the admin route is working!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminTest;
