import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { courseAPI } from "../services/api";
import toast from "react-hot-toast";

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    "All",
    "Web Development",
    "Data Science",
    "Design",
    "Marketing",
    "Mobile Development",
    "DevOps",
    "AI/ML",
    "Cybersecurity",
    "Business",
  ];

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const priceRanges = ["All", "Free", "$0-$50", "$50-$100", "$100+"];

  // Fetch courses from API
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const filters = {
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        level: selectedLevel !== "All" ? selectedLevel : undefined,
        search: searchTerm || undefined,
      };

      const response = await courseAPI.getAllCourses(filters);

      if (response.success) {
        setCourses(response.data);
        setError(null);
      } else {
        throw new Error(response.error || "Failed to fetch courses");
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.message);
      toast.error("Failed to load courses. Please try again.");

      // Fallback to mock data if API fails
      setCourses(mockCourses);
    } finally {
      setLoading(false);
    }
  };

  // Refetch courses when filters change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchCourses();
    }, 500); // Debounce API calls

    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, selectedLevel, searchTerm]);

  // Mock data as fallback
  const mockCourses = [
    {
      _id: "1",
      title: "Complete Web Development Bootcamp",
      instructor: { name: "Sarah Johnson", avatar: null },
      rating: 4.9,
      students: 12543,
      price: 89,
      category: "Web Development",
      level: "Beginner",
      totalDuration: "40 hours",
      language: "English",
      description:
        "Learn HTML, CSS, JavaScript, React, Node.js and build amazing websites from scratch",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      bestseller: true,
      featured: false,
      createdAt: "2024-12-01T00:00:00Z",
    },
    {
      _id: "2",
      title: "Data Science with Python Masterclass",
      instructor: { name: "Dr. Michael Chen", avatar: null },
      rating: 4.8,
      students: 8765,
      price: 79,
      category: "Data Science",
      level: "Intermediate",
      totalDuration: "35 hours",
      language: "English",
      description:
        "Master Python, Pandas, NumPy, Matplotlib, Machine Learning and Data Visualization",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      bestseller: false,
      featured: true,
      createdAt: "2024-11-15T00:00:00Z",
    },
  ];

  // Filter courses based on search and filters (for client-side filtering if needed)
  const filteredCourses = courses.filter((course) => {
    const instructorName =
      typeof course.instructor === "string"
        ? course.instructor
        : course.instructor?.name || "";

    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "All" || course.level === selectedLevel;

    let matchesPrice = true;
    if (priceRange === "Free") matchesPrice = course.price === 0;
    else if (priceRange === "$0-$50")
      matchesPrice = course.price >= 0 && course.price <= 50;
    else if (priceRange === "$50-$100")
      matchesPrice = course.price > 50 && course.price <= 100;
    else if (priceRange === "$100+") matchesPrice = course.price > 100;

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Loading courses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen">
      {/* Hero Section */}
      <section className=" pt-48 bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Explore Our Courses
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover {courses.length}+ courses from expert instructors and
              advance your skills
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg text-gray-900 rounded-full border-0 ring-4 ring-white/20 outline-none"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Content */}
      <section className="py-12 bg-violet-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/4 space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mt-18">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Filters
                </h3>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedLevel("All");
                    setPriceRange("All");
                    setSearchTerm("");
                  }}
                  className="w-full px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>

            {/* Course Grid */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredCourses.length} courses found
                </h2>
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                  <option>Most Popular</option>
                  <option>Newest</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course._id || course.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div
                        className="w-full h-48  flex items-center justify-center"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url('${
                            course.image ||
                            course.thumbnail ||
                            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
                          }')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/90 text-blue-600 text-sm font-medium rounded-full">
                          {course.category}
                        </span>
                        {course.bestseller && (
                          <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                            Bestseller
                          </span>
                        )}
                        {course.price === 0 && (
                          <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                            Free
                          </span>
                        )}
                        {course.featured && (
                          <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-black/50 text-white text-sm font-medium rounded-full">
                          {course.totalDuration || course.duration || "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {course.level}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {course.language || "English"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {course.description}
                      </p>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        by{" "}
                        {typeof course.instructor === "string"
                          ? course.instructor
                          : course.instructor?.name || "Unknown Instructor"}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {course.rating}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            (
                            {(
                              course.students ||
                              course.studentsCount ||
                              0
                            ).toLocaleString()}
                            )
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {course.price === 0 ? (
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                              Free
                            </div>
                          ) : (
                            <>
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                ${course.price}
                              </div>
                              {course.originalPrice &&
                                course.originalPrice > course.price && (
                                  <div className="text-lg text-gray-500 dark:text-gray-400 line-through">
                                    ${course.originalPrice}
                                  </div>
                                )}
                            </>
                          )}
                        </div>

                        <Link
                          to={`/course/${course._id}`}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg text-sm hover:shadow-lg transition-all duration-300"
                        >
                          View Course
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* No Results */}
              {filteredCourses.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    No courses found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Try adjusting your search criteria or browse all courses
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedLevel("All");
                      setPriceRange("All");
                      setSearchTerm("");
                    }}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;
