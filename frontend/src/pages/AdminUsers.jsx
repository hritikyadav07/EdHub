import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import Modal from '../components/Modal';
import Select from '../components/Select';
import Badge from '../components/Badge';
import { PencilIcon, UserIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

function AdminUsers() {
  const { theme } = useTheme();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [updateInProgress, setUpdateInProgress] = useState(false);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/users');
      setUsers(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching users');
      setLoading(false);
    }
  };
  
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowEditModal(true);
  };
  
  const handleRoleUpdate = async () => {
    try {
      setUpdateInProgress(true);
      
      const response = await axios.put(`/api/admin/users/${selectedUser._id}/role`, {
        role: newRole
      });
      
      // Update the user in the local state
      setUsers(users.map(user => 
        user._id === selectedUser._id ? response.data.data : user
      ));
      
      setShowEditModal(false);
      setUpdateInProgress(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating user role');
      setUpdateInProgress(false);
    }
  };
  
  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });
  
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'danger';
      case 'instructor': return 'primary';
      case 'student': return 'success';
      default: return 'secondary';
    }
  };
  
  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>
      </div>
      
      <Card className="mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
            <div className="w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="instructor">Instructors</option>
                <option value="admin">Admins</option>
              </select>
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
                    <th className="py-3 px-4 text-left">User</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-center">Role</th>
                    <th className="py-3 px-4 text-center">Joined</th>
                    <th className="py-3 px-4 text-center">Courses</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className={theme === 'dark' ? 'border-b border-gray-700' : 'border-b'}>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                            } mr-3`}>
                              {user.avatar ? (
                                <img 
                                  src={user.avatar} 
                                  alt={user.name} 
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              ) : (
                                <UserIcon className="h-6 w-6 text-gray-500" />
                              )}
                            </div>
                            <div className="font-medium">{user.name}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {user.email}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={getRoleBadgeColor(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {user.enrolledCourses?.length || 0}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleEditClick(user)}
                            >
                              <PencilIcon className="h-4 w-4 mr-1" />
                              Edit Role
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
      
      {/* Edit Role Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit User Role"
      >
        {selectedUser && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">
                Change role for {selectedUser.name}
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} mb-4`}>
                Current role: <Badge variant={getRoleBadgeColor(selectedUser.role)}>
                  {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                </Badge>
              </p>
              
              <label className="block mb-2">Select new role:</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
              
              {newRole === 'admin' && (
                <Alert type="warning" className="mt-4">
                  <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                  Granting admin privileges will give this user full access to all platform features including user management.
                </Alert>
              )}
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleRoleUpdate}
                isLoading={updateInProgress}
              >
                Update Role
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminUsers;
