import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { userService } from '../services/userService';
import { 
  TrashIcon, 
  PencilIcon, 
  UserIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  MagnifyingGlassIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

export default function UserManagement() {
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [userStats, setUserStats] = useState({ totalUsers: 0, activeUsers: 0, inactiveUsers: 0 });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
    fetchUserStats();
  }, []);

  // Filter users based on search term and status
  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => {
        if (filterStatus === 'active') return user.isActive !== false;
        if (filterStatus === 'inactive') return user.isActive === false;
        return true;
      });
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterStatus]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await userService.getAllUsers();
      setUsers(allUsers);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const stats = await userService.getUserStats();
      setUserStats(stats);
    } catch (err) {
      console.error('Error fetching user stats:', err);
    }
  };

  const handleDeactivateUser = async (uid) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      try {
        await userService.deactivateUser(uid);
        await fetchUsers();
        await fetchUserStats();
      } catch (err) {
        alert('Failed to deactivate user');
        console.error('Error deactivating user:', err);
      }
    }
  };

  const handleReactivateUser = async (uid) => {
    try {
      await userService.reactivateUser(uid);
      await fetchUsers();
      await fetchUserStats();
    } catch (err) {
      alert('Failed to reactivate user');
      console.error('Error reactivating user:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (user) => {
    const isActive = user.isActive !== false;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {isActive ? (
          <CheckCircleIcon className="w-3 h-3 mr-1" />
        ) : (
          <XCircleIcon className="w-3 h-3 mr-1" />
        )}
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Total Users
              </h3>
              <p className={`text-3xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {userStats.totalUsers}
              </p>
            </div>
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Active Users
              </h3>
              <p className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                {userStats.activeUsers}
              </p>
            </div>
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="flex items-center">
            <XCircleIcon className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Inactive Users
              </h3>
              <p className={`text-3xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                {userStats.inactiveUsers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-600 border-gray-500 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Users</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className={`rounded-lg shadow overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            User Management ({filteredUsers.length} users)
          </h3>
        </div>
        
        {error && (
          <div className="px-6 py-4 bg-red-50 dark:bg-red-900 border-b border-red-200 dark:border-red-700">
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className={isDarkMode ? 'bg-gray-600' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  User
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Created
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Last Login
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-gray-600 ${
              isDarkMode ? 'bg-gray-700' : 'bg-white'
            }`}>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.photoURL ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.photoURL}
                            alt=""
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {user.displayName || 'No name'}
                        </div>
                        <div className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {formatDate(user.createdAt)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {formatDate(user.lastLoginAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      {user.isActive !== false ? (
                        <button
                          onClick={() => handleDeactivateUser(user.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Deactivate User"
                        >
                          <XCircleIcon className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReactivateUser(user.id)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          title="Reactivate User"
                        >
                          <CheckCircleIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="px-6 py-12 text-center">
              <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className={`mt-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-900'
              }`}>
                No users found
              </h3>
              <p className={`mt-1 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {searchTerm || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No users have been registered yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
