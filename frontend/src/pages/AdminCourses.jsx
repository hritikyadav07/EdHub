import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import Modal from '../components/Modal';
import { PencilIcon, TrashIcon, PlusIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

function AdminCourses() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  
  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, []);
  
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/courses');
      setCourses(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching courses');
      setLoading(false);
    }
  };
  
  const fetchInstructors = async () => {
    try {
      const response = await axios.get('/api/admin/users', {
        params: { role: 'instructor' }
      });
      setInstructors(response.data.data.filter(user => user.role === 'instructor'));
    } catch (err) {
      console.error('Error fetching instructors:', err);
    }
  };
  
  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };
  
  const handleDeleteConfirm = async () => {
    try {
      setDeleteInProgress(true);
      await axios.delete(`/api/admin/courses/${courseToDelete._id}`);
      setCourses(courses.filter(c => c._id !== courseToDelete._id));
      setShowDeleteModal(false);
      setDeleteInProgress(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Error deleting course');
      setDeleteInProgress(false);
    }
  };
  
  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  // Sort and filter courses
  const filteredCourses = courses
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.instructor?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'enrollments':
          comparison = a.enrollments - b.enrollments;
          break;
        case 'rating':
          comparison = a.rating.average - b.rating.average;
          break;
        case 'date':
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  
  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Courses</h1>
        <Button 
          variant="primary"
          onClick={() => navigate('/admin/courses/create')}
          className="flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Course
        </Button>
      </div>
      
      <Card className="mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-6">
            <div className="w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant={sortBy === 'date' ? 'primary' : 'outline'} 
                size="sm" 
                onClick={() => handleSort('date')}
              >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button 
                variant={sortBy === 'enrollments' ? 'primary' : 'outline'} 
                size="sm" 
                onClick={() => handleSort('enrollments')}
              >
                Enrollments {sortBy === 'enrollments' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button 
                variant={sortBy === 'rating' ? 'primary' : 'outline'} 
                size="sm" 
                onClick={() => handleSort('rating')}
              >
                Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button 
                variant={sortBy === 'price' ? 'primary' : 'outline'} 
                size="sm" 
                onClick={() => handleSort('price')}
              >
                Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader size="lg" />
            </div>
          ) : error ? (
            <Alert type="error">{error}</Alert>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className={theme === 'dark' ? 'border-b border-gray-700' : 'border-b'}>
                    <th className="py-3 px-4 text-left">Course Title</th>
                    <th className="py-3 px-4 text-left">Instructor</th>
                    <th className="py-3 px-4 text-center">Price</th>
                    <th className="py-3 px-4 text-center">Enrollments</th>
                    <th className="py-3 px-4 text-center">Rating</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-6 text-center text-gray-500">
                        No courses found
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((course) => (
                      <tr key={course._id} className={theme === 'dark' ? 'border-b border-gray-700' : 'border-b'}>
                        <td className="py-3 px-4">
                          <div className="font-medium">{course.title}</div>
                          <div className="text-xs text-gray-500">
                            Created: {new Date(course.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {course.instructor?.name || 'Unknown'}
                        </td>
                        <td className="py-3 px-4 text-center">${course.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-center">{course.enrollments}</td>
                        <td className="py-3 px-4 text-center">
                          {course.rating.average ? (
                            <span>
                              {course.rating.average.toFixed(1)} ({course.rating.count})
                            </span>
                          ) : (
                            <span className="text-gray-500">No ratings</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            course.isPublished
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {course.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => navigate(`/admin/courses/edit/${course._id}`)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeleteClick(course)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Course"
      >
        <div className="text-center mb-4">
          <ExclamationCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Delete Course?</h3>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
            Are you sure you want to delete the course "{courseToDelete?.title}"? 
            This action cannot be undone and all associated data will be permanently removed.
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirm}
            isLoading={deleteInProgress}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default AdminCourses;
