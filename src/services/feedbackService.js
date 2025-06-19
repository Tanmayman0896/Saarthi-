import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Feedback service for storing feedback in Firestore
export const feedbackService = {
  // Save feedback to Firestore
  async saveFeedback(feedbackData) {
    try {
      const docRef = await addDoc(collection(db, 'feedback'), {
        ...feedbackData,
        timestamp: serverTimestamp(),
        status: 'new',
        responded: false
      });
      
      console.log('Feedback saved to Firestore with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error saving feedback to Firestore:', error);
      throw error;
    }
  },

  // Get all feedback (admin only)
  async getAllFeedback() {
    try {
      const feedbackRef = collection(db, 'feedback');
      const querySnapshot = await getDocs(feedbackRef);
      
      const feedback = [];
      querySnapshot.forEach((doc) => {
        feedback.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return feedback;
    } catch (error) {
      console.error('Error getting feedback:', error);
      throw error;
    }
  }
};

export default feedbackService;
