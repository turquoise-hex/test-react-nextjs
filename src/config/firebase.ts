import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSy8aEL5Wm-A19iTycJmxIekWs0VwhNfs",
  authDomain: "fir-course-4d7b4.firebaseapp.com",
  projectId: "fir-course-4d7b4",
  storageBucket: "fir-course-4d7b4.appspot.com",
  messagingSenderId: "1044930086041",
  appId: "1:1044930086041:web:ea53a54aa05e46a1e8e408",
  measurementId: "G-JFMG9JBPW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 
export const db = getFirestore(app);
export const storage = getStorage(app);



