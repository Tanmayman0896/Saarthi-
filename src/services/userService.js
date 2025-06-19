import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase';

// Collection name for users
const USERS_COLLECTION = 'users';

// User management service
export const userService = {
  // Create or update user profile in Firestore
  async createUserProfile(user, additionalData = {}) {
    try {
      const userRef = doc(db, USERS_COLLECTION, user.uid);
      
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        isActive: true,
        role: additionalData.role || 'user',
        ...additionalData
      };

      await setDoc(userRef, userData, { merge: true });
      return userData;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  // Get user profile
  async getUserProfile(uid) {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  // Get all users (admin only)
  async getAllUsers() {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const q = query(usersRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  },

  // Update user profile
  async updateUserProfile(uid, updateData) {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      await updateDoc(userRef, {
        ...updateData,
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Update last login time
  async updateLastLogin(uid) {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      await updateDoc(userRef, {
        lastLoginAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating last login:', error);
      // Don't throw error for this non-critical operation
    }
  },

  // Deactivate user (soft delete)
  async deactivateUser(uid) {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      await updateDoc(userRef, {
        isActive: false,
        deactivatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Error deactivating user:', error);
      throw error;
    }
  },

  // Reactivate user
  async reactivateUser(uid) {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      await updateDoc(userRef, {
        isActive: true,
        reactivatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Error reactivating user:', error);
      throw error;
    }
  },

  // Delete user permanently
  async deleteUser(uid) {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      await deleteDoc(userRef);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Get user statistics
  async getUserStats() {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const allUsersQuery = query(usersRef);
      const activeUsersQuery = query(usersRef, where('isActive', '==', true));
      
      const [allUsersSnap, activeUsersSnap] = await Promise.all([
        getDocs(allUsersQuery),
        getDocs(activeUsersQuery)
      ]);
      
      return {
        totalUsers: allUsersSnap.size,
        activeUsers: activeUsersSnap.size,
        inactiveUsers: allUsersSnap.size - activeUsersSnap.size
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw error;
    }
  },

  // Real-time listener for users
  onUsersSnapshot(callback) {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const q = query(usersRef, orderBy('createdAt', 'desc'));
      
      return onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            ...doc.data()
          });
        });
        callback(users);
      });
    } catch (error) {
      console.error('Error setting up users listener:', error);
      throw error;
    }
  }
};

export default userService;
