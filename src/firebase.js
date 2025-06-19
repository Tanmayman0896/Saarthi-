// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Import additional Firebase services that your app uses
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Validate that all required environment variables are present
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

// Check for missing environment variables
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required Firebase environment variables:', missingVars);
  console.error('Please check your .env file and ensure all Firebase configuration variables are set.');
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId is optional - only include if you're using Analytics
  ...(process.env.REACT_APP_FIREBASE_MEASUREMENT_ID && {
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  })
};

// Initialize Firebase
let app;
let analytics = null;
let auth = null;
let db = null;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Analytics only if measurementId is provided
  if (process.env.REACT_APP_FIREBASE_MEASUREMENT_ID) {
    analytics = getAnalytics(app);
  }
  
  // Initialize Authentication
  auth = getAuth(app);
  
  // Initialize Firestore
  db = getFirestore(app);
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw new Error('Failed to initialize Firebase. Please check your configuration.');
}

// Export the initialized services
export { auth, analytics, db };
export default app;