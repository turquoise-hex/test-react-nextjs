import { useState, useEffect, use } from 'react';
import { auth, googleProvider } from '../config/firebase'
import { User, signInWithPopup, signOut } from 'firebase/auth';



export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
      try {
        console.log(123)
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error(error);
      }
    };
    
    const logout = async () => {
      try{
          await signOut(auth);
      } catch (err) {
          console.log(err);
      }
    }
    
  
    return { user, loading, signInWithGoogle, logout };
  };