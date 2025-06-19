import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Get admin credentials from environment variables
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

const ProtectedRoute = ({ children, requireAuth = true, adminOnly = false }) => {
  const { currentUser, loading } = useAuth();

  // Debug logging for admin check
  if (adminOnly) {
    console.log('Admin check debug:');
    console.log('Current user email:', currentUser?.email);
    console.log('Admin email from env:', ADMIN_EMAIL);
    console.log('Email match:', currentUser?.email === ADMIN_EMAIL);
    console.log('Current user exists:', !!currentUser);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (requireAuth && !currentUser) {
    return <Navigate to="/" replace />;
  }

  // Check if user is admin by email
  if (adminOnly && (!currentUser || currentUser.email !== ADMIN_EMAIL)) {
    console.log('Admin access denied - redirecting to home');
    return <Navigate to="/home" replace />;
  }

  if (!requireAuth && currentUser) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
