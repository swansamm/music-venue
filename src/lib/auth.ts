"use client";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface AdminUser extends User {
  isAdmin?: boolean;
}

// Sign in admin user
export async function signInAdmin(email: string, password: string): Promise<AdminUser | null> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if user is admin
    const adminDoc = await getDoc(doc(db, 'admins', user.uid));
    const isAdmin = adminDoc.exists();

    return {
      ...user,
      isAdmin
    } as AdminUser;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

// Sign out user
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

// Listen to auth state changes
export function onAuthChange(callback: (user: AdminUser | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Check if user is admin
      try {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        const isAdmin = adminDoc.exists();

        callback({
          ...user,
          isAdmin
        } as AdminUser);
      } catch (error) {
        console.error('Error checking admin status:', error);
        callback({
          ...user,
          isAdmin: false
        } as AdminUser);
      }
    } else {
      callback(null);
    }
  });
}

// Check if current user is admin
export async function isCurrentUserAdmin(): Promise<boolean> {
  if (!auth.currentUser) return false;

  try {
    const adminDoc = await getDoc(doc(db, 'admins', auth.currentUser.uid));
    return adminDoc.exists();
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}
