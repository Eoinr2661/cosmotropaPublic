import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export interface AuthenticationServiceProps {
  loading: boolean;
  currentUser: FirebaseAuthTypes.User | null;
  getUser: () => FirebaseAuthTypes.User | null;
  loginWithEmailAndPassword: (email: string, password: string) => void;
  signOut: () => void;
  createAccount: (email: string, password: string, confirmPassword: string, displayName: string) => void;
}
/**
 * This is the authentication part of the app, I followed along with the HeroDev tutorial https://youtu.be/kSpKqyJdgts?si=sLiXq9AR9uOfvwlo
 * And also made use of the authentication documentation from Firebase https://firebase.google.com/docs/auth/
 * There isn't really much one can do with this code beyond the boilerplate/documentation,
 * So other than implementing type safety, additional error checking and the specific configurations required for this application, 
 * The code is much the same as that found in the links above. 
 * @returns 
 */
const useAuthenticationService = (): AuthenticationServiceProps => {
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginWithEmailAndPassword = (email: string, password: string) => {
    auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        Alert.alert('Logged in');
      })
      .catch(error => {
        console.log('login button error', error);
        Alert.alert('Alert', error.message);
      });
  };

  const signOut = () => {
    return auth().signOut();
  };

  const createAccount = async (email: string, password: string, confirmPassword: string, displayName: string) => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Update the user's profile with the display name
      await user.updateProfile({ displayName });

      Alert.alert('Success', 'Account created successfully');
      console.log('Account Created');
    } catch (error) {
      console.log("Error message: ", error.message);
      Alert.alert('Alert', error.message);
    }
  };

  const getUser = (): FirebaseAuthTypes.User | null => {
    return auth().currentUser;
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return {
    loading,
    currentUser,
    getUser,
    loginWithEmailAndPassword,
    signOut,
    createAccount,
  };
};

export default useAuthenticationService;
