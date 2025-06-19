import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock AuthContext for testing - removes Firebase dependency
const TestAuthContext = createContext();

export const useAuth = () => {
  const context = useContext(TestAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock authentication functions
  const signup = async (email, password, displayName = '') => {
    console.log('Mock signup called:', { email, displayName });
    return Promise.resolve({ user: { email, displayName } });
  };

  const signin = async (email, password) => {
    console.log('Mock signin called:', { email });
    return Promise.resolve({ user: { email } });
  };

  const logout = async () => {
    console.log('Mock logout called');
    setCurrentUser(null);
    return Promise.resolve();
  };

  const updateUserProfile = async (updates) => {
    console.log('Mock updateUserProfile called:', updates);
    return Promise.resolve();
  };

  // Simulate auth initialization
  useEffect(() => {
    console.log('🔧 DEBUG: Mock AuthProvider initializing...');
    
    // Simulate a delay and then set loading to false
    const timer = setTimeout(() => {
      console.log('🔧 DEBUG: Mock AuthProvider initialized');
      setCurrentUser(null); // No user logged in for testing
      setLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    updateUserProfile,
    error,
    loading
  };

  console.log('🔧 DEBUG: AuthProvider rendering, loading:', loading);

  return (
    <TestAuthContext.Provider value={value}>
      {loading ? (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          fontSize: '16px', 
          color: '#666' 
        }}>
          Initializing Auth...
        </div>
      ) : (
        children
      )}
    </TestAuthContext.Provider>
  );
};
