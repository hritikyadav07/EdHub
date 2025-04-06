import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

function AdminCourseForm() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [instructors, setInstructors] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    instructor: '',
    price: 0,
    image: '',
    level: 'beginner',
    category: '',
    language: 'English',
    tags: [],
    requirements: [],
    whatYoullLearn: [],
    isPublished: false,
    modules: []
  });
  
  // For adding new items to arrays
  const [newTag, setNewTag] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newLearningPoint, setNewLearningPoint] = useState('');
  
  useEffect(() => {
    fetchInstructors();
    
    if (isEditMode) {
      fetchCourse();
    }
  }, [id]);
  
  const fetchCourse = async () => {
    try {
      const response = await axios.get(`/api/admin/courses/${id}`);
      setFormData(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching course details');
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
      setError('Error loading instructors. Please refresh the page.');
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSlugGeneration = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    setFormData({
      ...formData,
      slug
    });
  };
  
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index)
    });
  };
  
  const handleAddRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, newRequirement.trim()]
      });
      setNewRequirement('');
    }
  };
  
  const handleRemoveRequirement = (index) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index)
    });
  };
  
  const handleAddLearningPoint = () => {
    if (newLearningPoint.trim() && !formData.whatYoullLearn.includes(newLearningPoint.trim())) {
      setFormData({
        ...formData,
        whatYoullLearn: [...formData.whatYoullLearn, newLearningPoint.trim()]
      });
      setNewLearningPoint('');
    }
  };
  
  const handleRemoveLearningPoint = (index) => {
    setFormData({
      ...formData,
      whatYoullLearn: formData.whatYoullLearn.filter((_, i) => i !== index)
    });
  };
  
  const handleAddModule = () => {
    setFormData({
      ...formData,
      modules: [...formData.modules, {
        title: '',
        lessons: []
      }]
    });
  };
  
  const handleRemoveModule = (index) => {
    setFormData({
      ...formData,
      modules: formData.modules.filter((_, i) => i !== index)
    });
  };
  
  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...formData.modules];
    updatedModules[index][field] = value;
    
    setFormData({
      ...formData,
      modules: updatedModules
    });
  };
  
  const handleAddLesson = (moduleIndex) => {
    const updatedModules = [...formData.modules];
    updatedModules[moduleIndex].lessons.push({
      title: '',
      content: '',
      duration: 0,
      isPreview: false
    });
    
    setFormData({
      ...formData,
      modules: updatedModules
    });
  };
  
  const handleRemoveLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...formData.modules];
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons
      .filter((_, i) => i !== lessonIndex);
    
    setFormData({
      ...formData,
      modules: updatedModules
    });
  };
  
  const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
    const updatedModules = [...formData.modules];
    updatedModules[moduleIndex].lessons[lessonIndex][field] = 
      field === 'isPreview' ? value : value;
    
    setFormData({
      ...formData,
      modules: updatedModules
    });
  };
  
  const validateForm = () => {
    // Basic validation
    if (!formData.title) return 'Course title is required';
    if (!formData.slug) return 'Course slug is required';
    if (!formData.description) return 'Course description is required';
    if (!formData.instructor) return 'Please select an instructor';
    if (formData.price < 0) return 'Price cannot be negative';
    if (!formData.category) return 'Category is required';
    if (formData.modules.length === 0) return 'At least one module is required';
    
    // Validate modules have titles and at least one lesson
    for (let i = 0; i < formData.modules.length; i++) {
      if (!formData.modules[i].title) {
        return `Module ${i + 1} must have a title`;
      }
      if (formData.modules[i].lessons.length === 0) {
        return `Module ${i + 1} must have at least one lesson`;
      }
      
      // Validate lessons have titles
      for (let j = 0; j < formData.modules[i].lessons.length; j++) {
        if (!formData.modules[i].lessons[j].title) {
          return `Lesson ${j + 1} in Module ${i + 1} must have a title`;
        }
      }
    }
    
    return null;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      window.scrollTo(0, 0);
      return;
    }
    
    // Clear any previous errors
    setError(null);
    setSaving(true);
    
    try {
      if (isEditMode) {
        await axios.put(`/api/admin/courses/${id}`, formData);
      } else {
        await axios.post('/api/admin/courses', formData);
      }
      
      setSaving(false);
      setSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/admin/courses');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Error saving course');
      setSaving(false);
      window.scrollTo(0, 0);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="lg" />
      </div>
    );
  }
  
  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isEditMode ? 'Edit Course' : 'Create New Course'}
        </h1>
        <Button 
          variant="outline"
          onClick={() => navigate('/admin/courses')}
        >
          Back to Courses
        </Button>
      </div>
      
      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert type="success" className="mb-6">
          Course {isEditMode ? 'updated' : 'created'} successfully! Redirecting...
        </Alert>
      )}
      
      <Card className="mb-8">
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 font-medium">Course Title *</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter course title"
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">
                Slug * 
                <Button 
                  variant="secondary" 
                  size="xs" 
                  className="ml-2"
                  onClick={handleSlugGeneration}
                  type="button"
                >
                  Generate from Title
                </Button>
              </label>
              <Input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="course-slug-url"
                required
                className="w-full"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium">Course Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide a detailed description of the course"
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              rows={5}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block mb-2 font-medium">Instructor *</label>
              <select
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Select Instructor</option>
                {instructors.map(instructor => (
                  <option key={instructor._id} value={instructor._id}>
                    {instructor.name} ({instructor.email})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Price *</label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="49.99"
                min="0"
                step="0.01"
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Level *</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block mb-2 font-medium">Category *</label>
              <Input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Web Development"
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Language *</label>
              <Input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                placeholder="e.g., English"
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Cover Image URL</label>
              <Input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/course-image.jpg"
                className="w-full"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Tags
              <span className="text-sm font-normal ml-2 text-gray-500">
                (Add keywords to help students find your course)
              </span>
            </label>
            <div className="flex mb-2">
              <Input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter a tag and press Add"
                className="flex-grow mr-2"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddTag}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <div 
                  key={index} 
                  className={`flex items-center rounded-full py-1 px-3 text-sm ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <hr className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} />
          
          <h2 className="text-xl font-semibold my-4">Course Requirements</h2>
          <div className="mb-6">
            <div className="flex mb-2">
              <Input
                type="text"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="e.g., Basic understanding of HTML and CSS"
                className="flex-grow mr-2"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddRequirement}
              >
                Add
              </Button>
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {formData.requirements.map((req, index) => (
                <li key={index} className="flex items-center">
                  <span className="flex-grow">{req}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(index)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
              {formData.requirements.length === 0 && (
                <li className="text-gray-500 italic">No requirements added yet</li>
              )}
            </ul>
          </div>
          
          <h2 className="text-xl font-semibold my-4">What Students Will Learn</h2>
          <div className="mb-6">
            <div className="flex mb-2">
              <Input
                type="text"
                value={newLearningPoint}
                onChange={(e) => setNewLearningPoint(e.target.value)}
                placeholder="e.g., Build a responsive website from scratch"
                className="flex-grow mr-2"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddLearningPoint}
              >
                Add
              </Button>
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {formData.whatYoullLearn.map((point, index) => (
                <li key={index} className="flex items-center">
                  <span className="flex-grow">{point}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLearningPoint(index)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
              {formData.whatYoullLearn.length === 0 && (
                <li className="text-gray-500 italic">No learning objectives added yet</li>
              )}
            </ul>
          </div>
          
          <hr className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} />
          
          <h2 className="text-xl font-semibold my-4">Course Content</h2>
          <div className="mb-6">
            <Button
              type="button"
              variant="primary"
              onClick={handleAddModule}
              className="mb-4"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Module
            </Button>
            
            {formData.modules.map((module, moduleIndex) => (
              <div 
                key={moduleIndex} 
                className={`mb-4 p-4 border rounded-md ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Module {moduleIndex + 1}</h3>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveModule(moduleIndex)}
                  >
                    Remove
                  </Button>
                </div>
                
                <div className="mb-3">
                  <label className="block mb-2">Module Title *</label>
                  <Input
                    type="text"
                    value={module.title}
                    onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
                    placeholder="e.g., Introduction to JavaScript"
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center">
                    <label className="block font-medium">Lessons</label>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAddLesson(moduleIndex)}
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Lesson
                    </Button>
                  </div>
                  
                  {module.lessons.length === 0 ? (
                    <p className="text-gray-500 italic mt-2">No lessons added yet</p>
                  ) : (
                    <div className="mt-2 space-y-3">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div 
                          key={lessonIndex} 
                          className={`p-3 border rounded-md ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Lesson {lessonIndex + 1}</h4>
                            <Button
                              type="button"
                              variant="danger"
                              size="xs"
                              onClick={() => handleRemoveLesson(moduleIndex, lessonIndex)}
                            >
                              Remove
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                            <div>
                              <label className="block mb-1 text-sm">Lesson Title *</label>
                              <Input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'title', e.target.value)}
                                placeholder="e.g., Variables and Data Types"
                                required
                                className="w-full"
                              />
                            </div>
                            
                            <div>
                              <label className="block mb-1 text-sm">Duration (minutes) *</label>
                              <Input
                                type="number"
                                value={lesson.duration}
                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'duration', parseInt(e.target.value))}
                                min="1"
                                required
                                className="w-full"
                              />
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <label className="block mb-1 text-sm">Content/Video URL</label>
                            <Input
                              type="text"
                              value={lesson.content}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'content', e.target.value)}
                              placeholder="e.g., https://example.com/video.mp4"
                              className="w-full"
                            />
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`preview-${moduleIndex}-${lessonIndex}`}
                              checked={lesson.isPreview}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'isPreview', e.target.checked)}
                              className="mr-2"
                            />
                            <label htmlFor={`preview-${moduleIndex}-${lessonIndex}`} className="text-sm">
                              Make this lesson available as preview
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {formData.modules.length === 0 && (
              <p className="text-gray-500 italic">No modules added yet. Please add at least one module.</p>
            )}
          </div>
          
          <hr className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} />
          
          <h2 className="text-xl font-semibold my-4">Publishing Options</h2>
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="isPublished">
                Publish this course (make it available to students)
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/courses')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={saving}
            >
              {isEditMode ? 'Update Course' : 'Create Course'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AdminCourseForm;
