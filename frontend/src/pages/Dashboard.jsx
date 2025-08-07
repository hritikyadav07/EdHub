import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { enrollmentAPI } from "../services/api";
import toast from "react-hot-toast";

// Dashboard Components
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardStats from "../components/dashboard/DashboardStats";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import ContinueLearning from "../components/dashboard/ContinueLearning";
import CertificatesSection from "../components/dashboard/CertificatesSection";

function Dashboard() {
  const { currentUser } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch enrolled courses
  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const response = await enrollmentAPI.getEnrolledCourses();

      if (response.success) {
        setEnrolledCourses(response.data);
      } else {
        throw new Error(response.error || "Failed to fetch enrolled courses");
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      toast.error("Failed to load your courses");

      // Fallback to mock data
      setEnrolledCourses(mockEnrolledCourses);
    } finally {
      setLoading(false);
    }
  };

  // Mock data as fallback
  const mockEnrolledCourses = [
    {
      _id: "1",
      title: "Complete Web Development Bootcamp",
      progress: 75,
      instructor: "Sarah Johnson",
      nextLesson: "React Hooks Deep Dive",
      duration: "8h",
      thumbnail:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    },
    {
      _id: "2",
      title: "Data Science with Python",
      progress: 45,
      instructor: "Dr. Michael Chen",
      nextLesson: "Machine Learning Basics",
      duration: "12h",
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    },
    {
      _id: "3",
      title: "UI/UX Design Fundamentals",
      progress: 90,
      instructor: "Emma Wilson",
      nextLesson: "Final Project Review",
      duration: "2h",
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    },
  ];

  // Sample data - in real app, this would come from an API
  const certificates = [
    {
      id: 1,
      course: "UI/UX Design Complete Course",
      completedDate: "2024-11-15",
      instructor: "Emma Wilson",
    },
    {
      id: 2,
      course: "JavaScript Fundamentals",
      completedDate: "2024-10-28",
      instructor: "John Smith",
    },
  ];

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileMenuOpen && !event.target.closest(".profile-dropdown")) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNavbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isProfileMenuOpen={isProfileMenuOpen}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
      />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {currentUser?.name?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Continue your learning journey and track your progress
            </p>
          </div>

          {/* Stats Cards */}
          <DashboardStats
            enrolledCourses={enrolledCourses}
            certificates={certificates}
          />

          {/* Quick Actions */}
          <QuickActions />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ContinueLearning enrolledCourses={enrolledCourses} />
              <CertificatesSection certificates={certificates} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <RecentActivity />

              {/* Study Streak Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    7 Day Streak! 🔥
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    Keep up the great work! You're on fire.
                  </p>
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Upcoming Deadlines
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        Portfolio Project
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Due in 2 days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        React Quiz
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Due in 1 week
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        Final Assessment
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Due in 2 weeks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
