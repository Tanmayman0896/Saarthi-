import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Temporary hardcoded admin email for debugging
const ADMIN_EMAIL_HARDCODED = 'admin@saarthi.com';

const ProtectedRouteDebug = ({ children, requireAuth = true, adminOnly = false }) => {
  const { currentUser, loading } = useAuth();

  // Get admin credentials from environment variables
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

  // Debug logging for admin check
  if (adminOnly) {
    console.log('=== ADMIN ACCESS DEBUG ===');
    console.log('Current user email:', currentUser?.email);
    console.log('Admin email from env:', ADMIN_EMAIL);
    console.log('Admin email hardcoded:', ADMIN_EMAIL_HARDCODED);
    console.log('Email match (env):', currentUser?.email === ADMIN_EMAIL);
    console.log('Email match (hardcoded):', currentUser?.email === ADMIN_EMAIL_HARDCODED);
    console.log('Current user exists:', !!currentUser);
    console.log('=========================');
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

  // Check if user is admin by email (try both env and hardcoded)
  const isAdmin = currentUser && (
    currentUser.email === ADMIN_EMAIL || 
    currentUser.email === ADMIN_EMAIL_HARDCODED
  );

  if (adminOnly && !isAdmin) {
    console.log('Admin access denied - redirecting to home');
    console.log('User email:', currentUser?.email);
    console.log('Expected email:', ADMIN_EMAIL || ADMIN_EMAIL_HARDCODED);
    return <Navigate to="/home" replace />;
  }

  if (!requireAuth && currentUser) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRouteDebug;
