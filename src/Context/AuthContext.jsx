/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  updatePassword,
} from "firebase/auth";

import app from "../firebase/firebase.config";
import useAxiosSecure from "../Hook/useAxios";
import { toast } from 'react-hot-toast';

const auth = getAuth(app);

export const ContextData = createContext(null);

const AuthContext = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  // Create user with email and password
  const createUser = async (email, password) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential;
  };

  // Sign user in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  };

  // Update user profile name and photo
  const profileUpdate = async (name, photo) => {
    setLoading(true);
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    const updatedUser = {
      ...auth.currentUser,
      displayName: name,
      photoURL: photo,
    };
    setUser(updatedUser);
    await saveUser(updatedUser);
  };

  // Log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Save user
  const saveUser = async (newUser) => {
    const currentUser = {
      name: newUser.displayName,
      email: newUser.email,
      profile: newUser.photoURL,
      role: "Co-Admin",
      status: "pending",
    };
    console.log(currentUser, "users create");
    const { data } = await axiosSecure.post("/users", currentUser);
    return data;
  };



  const changePassword = async (newPassword) => {
    if (auth.currentUser) {
        try {
            await updatePassword(auth.currentUser, newPassword);
            toast.success("Password updated successfully");
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Failed to update password. Please try again.");
        }
    } else {
        toast.error("No user is signed in.");
    }
};







  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(false);
      } else {
        setLoading(false);
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const contextData = {
    createUser,
    signIn,
    profileUpdate,
    user,
    logOut,
    loading,
    setLoading,
    changePassword,
    setUser,
    open,
    setOpen,
  };

  return (
    <ContextData.Provider value={contextData}>{children}</ContextData.Provider>
  );
};

export default AuthContext;
