import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminTest() {
  const { currentUser } = useAuth();
  
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Admin Access Debug
        </h1>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Current User Info:</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Email: {currentUser?.email || 'Not logged in'}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Display Name: {currentUser?.displayName || 'No display name'}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              UID: {currentUser?.uid || 'No UID'}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Environment Variables:</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Admin Email: {ADMIN_EMAIL || 'NOT FOUND'}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Admin Password: {process.env.REACT_APP_ADMIN_PASSWORD || 'NOT FOUND'}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Access Check:</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Is Admin: {currentUser?.email === ADMIN_EMAIL ? 'YES' : 'NO'}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email Match: {currentUser?.email} === {ADMIN_EMAIL}
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900 rounded">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Instructions:</h3>
            <ol className="list-decimal list-inside text-yellow-700 dark:text-yellow-300 mt-2">
              <li>Check if environment variables are loaded correctly</li>
              <li>Verify your email exactly matches the admin email</li>
              <li>Make sure you're logged in with the correct account</li>
              <li>Check browser console for debug messages</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
