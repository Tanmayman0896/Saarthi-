import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { userService } from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Sign up function
  const signup = async (email, password, displayName = '') => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name if provided
      if (displayName && result.user) {
        await updateProfile(result.user, {
          displayName: displayName
        });
      }
      
      // Create user profile in Firestore
      if (result.user) {
        await userService.createUserProfile(result.user, {
          displayName: displayName
        });
      }
      
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign in function
  const signin = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time
      if (result.user) {
        await userService.updateLastLogin(result.user.uid);
      }
      
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign out function
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      setError(null);
      if (currentUser) {
        await updateProfile(currentUser, updates);
        // Trigger a re-render by updating the current user
        setCurrentUser({ ...currentUser, ...updates });
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // Create/update user profile when user signs in
      if (user) {
        try {
          await userService.createUserProfile(user);
        } catch (error) {
          console.error('Error creating/updating user profile:', error);
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
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

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
