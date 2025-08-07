import React, { useState } from "react";
import toast from "react-hot-toast";
import { authAPI, courseAPI, adminAPI, enrollmentAPI } from "../services/api";

const ApiTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (endpoint, status, message, data = null) => {
    const result = {
      id: Date.now(),
      endpoint,
      status,
      message,
      data: data ? JSON.stringify(data, null, 2) : null,
      timestamp: new Date().toLocaleTimeString(),
    };
    setTestResults((prev) => [result, ...prev]);
  };

  const testEndpoint = async (name, apiCall) => {
    try {
      console.log(`Testing ${name}...`);
      const result = await apiCall();
      addResult(name, "success", "Success", result);
      toast.success(`${name} - Success`);
    } catch (error) {
      addResult(name, "error", error.message);
      toast.error(`${name} - ${error.message}`);
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    setTestResults([]);

    const tests = [
      // Course API Tests
      {
        name: "GET /api/courses",
        call: () => courseAPI.getAllCourses(),
      },
      {
        name: "GET /api/courses (with filters)",
        call: () =>
          courseAPI.getAllCourses({
            category: "Web Development",
            level: "Beginner",
          }),
      },

      // Auth API Tests (without authentication)
      {
        name: "GET /api/auth/me (should fail without auth)",
        call: () => authAPI.getMe(),
      },

      // These will need actual IDs to work properly
      // {
      //   name: 'GET /api/courses/:id',
      //   call: () => courseAPI.getCourse('test-id')
      // },
    ];

    for (const test of tests) {
      await testEndpoint(test.name, test.call);
      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setLoading(false);
  };

  const testSpecificEndpoint = async (endpointName) => {
    const specificTests = {
      courses: () => courseAPI.getAllCourses(),
      "courses-filtered": () =>
        courseAPI.getAllCourses({ category: "Web Development" }),
      "auth-me": () => authAPI.getMe(),
      enrollments: () => enrollmentAPI.getEnrolledCourses(),
      "admin-stats": () => adminAPI.getDashboardStats(),
      "admin-users": () => adminAPI.getAllUsers(),
      "admin-courses": () => adminAPI.getAllCourses(),
    };

    if (specificTests[endpointName]) {
      await testEndpoint(endpointName, specificTests[endpointName]);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          API Integration Test
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Test the frontend-backend integration with axios. This will help
          identify any issues with API calls.
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={runAllTests}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Running Tests..." : "Run All Tests"}
          </button>

          <button
            onClick={() => setTestResults([])}
            className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700"
          >
            Clear Results
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => testSpecificEndpoint("courses")}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            Test Courses
          </button>
          <button
            onClick={() => testSpecificEndpoint("courses-filtered")}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            Test Courses (Filtered)
          </button>
          <button
            onClick={() => testSpecificEndpoint("auth-me")}
            className="px-4 py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
          >
            Test Auth
          </button>
          <button
            onClick={() => testSpecificEndpoint("enrollments")}
            className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
          >
            Test Enrollments
          </button>
          <button
            onClick={() => testSpecificEndpoint("admin-stats")}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Test Admin Stats
          </button>
          <button
            onClick={() => testSpecificEndpoint("admin-users")}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Test Admin Users
          </button>
          <button
            onClick={() => testSpecificEndpoint("admin-courses")}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Test Admin Courses
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Test Results ({testResults.length})
        </h2>

        {testResults.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No tests run yet. Click "Run All Tests" or test individual
            endpoints.
          </div>
        ) : (
          <div className="space-y-3">
            {testResults.map((result) => (
              <div
                key={result.id}
                className={`p-4 rounded-lg border-l-4 ${
                  result.status === "success"
                    ? "bg-green-50 border-green-500 dark:bg-green-900/20"
                    : "bg-red-50 border-red-500 dark:bg-red-900/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        result.status === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      }`}
                    >
                      {result.status === "success" ? "✅" : "❌"}{" "}
                      {result.status.toUpperCase()}
                    </span>
                    <h3 className="font-bold text-gray-800 dark:text-white">
                      {result.endpoint}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {result.timestamp}
                  </span>
                </div>

                <p
                  className={`mb-2 ${
                    result.status === "success"
                      ? "text-green-700 dark:text-green-300"
                      : "text-red-700 dark:text-red-300"
                  }`}
                >
                  {result.message}
                </p>

                {result.data && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                      View Response Data
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto text-gray-700 dark:text-gray-300">
                      {result.data}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Status Info */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">
          API Connection Info
        </h3>
        <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
          <p>
            <strong>Base URL:</strong>{" "}
            {import.meta.env.VITE_API_URL || "http://localhost:5000/api"}
          </p>
          <p>
            <strong>Environment:</strong> {import.meta.env.MODE}
          </p>
          <p>
            <strong>Axios Configured:</strong> ✅
          </p>
          <p>
            <strong>CORS:</strong> Credentials included
          </p>
          <p>
            <strong>Timeout:</strong> 10 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;
