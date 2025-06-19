import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { userService } from '../services/userService';
import UserManagement from '../components/UserManagement';

export default function AdminPanel() {
  const { currentUser } = useAuth();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCourses: 12,
    totalLectures: 300
  });

  // Fetch statistics on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const userStats = await userService.getUserStats();
      setStats(prev => ({
        ...prev,
        totalUsers: userStats.totalUsers,
        activeUsers: userStats.activeUsers
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Total Users
                </h3>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {stats.totalUsers}
                </p>
              </div>
              <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Active Users
                </h3>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {stats.activeUsers}
                </p>
              </div>
              <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Active Courses
                </h3>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  {stats.totalCourses}
                </p>
              </div>
              <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Total Lectures
                </h3>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {stats.totalLectures}+
                </p>
              </div>
            </div>
            
            <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                    isDarkMode 
                      ? 'border-gray-600 hover:border-blue-400 hover:bg-gray-600' 
                      : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <h4 className="font-medium">Manage Users</h4>
                    <p className="text-sm mt-1">View and manage all users</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                    isDarkMode 
                      ? 'border-gray-600 hover:border-purple-400 hover:bg-gray-600' 
                      : 'border-gray-300 hover:border-purple-500 hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <h4 className="font-medium">Manage Courses</h4>
                    <p className="text-sm mt-1">Add and edit courses</p>
                  </div>
                </button>
                <button
                  className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                    isDarkMode 
                      ? 'border-gray-600 hover:border-green-400 hover:bg-gray-600' 
                      : 'border-gray-300 hover:border-green-500 hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <h4 className="font-medium">System Settings</h4>
                    <p className="text-sm mt-1">Configure application</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UserManagement />;
      case 'courses':
        return (
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Course Management
            </h3>
            <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Course management features will be implemented here.
              </p>
              <ul className={`list-disc list-inside mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Add new courses</li>
                <li>Edit existing courses</li>
                <li>Manage course content</li>
                <li>Upload lectures and materials</li>
                <li>Set course pricing and access</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Panel
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Welcome, {currentUser?.displayName || currentUser?.email}!
          </p>
        </div>

        {/* Admin Credentials Info */}
        <div className={`mb-8 p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
            Admin Access Information
          </h2>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>
            <p><strong>Admin Email:</strong> {process.env.REACT_APP_ADMIN_EMAIL}</p>
            <p><strong>Admin Password:</strong> {process.env.REACT_APP_ADMIN_PASSWORD}</p>
            <p className="mt-2 text-xs">
              <em>Only users with these exact credentials can access this admin panel.</em>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'users', label: 'Users' },
              { id: 'courses', label: 'Courses' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? 'border-blue-400 text-blue-400'
                      : 'border-blue-500 text-blue-600'
                    : isDarkMode
                    ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
