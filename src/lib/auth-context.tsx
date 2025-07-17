"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, TicketPurchase } from "./types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addToFavorites: (showId: string) => void;
  removeFromFavorites: (showId: string) => void;
  addTicketPurchase: (purchase: Omit<TicketPurchase, 'id'>) => void;
  toggleNewsletterSubscription: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = "swan-dive-users";
const CURRENT_USER_KEY = "swan-dive-current-user";

// Demo users for development
const defaultUsers: User[] = [
  {
    id: "demo-user-1",
    email: "demo@example.com",
    firstName: "Demo",
    lastName: "User",
    createdAt: new Date().toISOString(),
    favorites: ["1", "3", "5"],
    ticketHistory: [
      {
        id: "ticket-1",
        showId: "1",
        quantity: 2,
        totalPrice: 70,
        purchaseDate: "2025-01-15T10:30:00Z",
        status: "confirmed"
      }
    ],
    newsletterSubscribed: true,
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize users in localStorage if not present
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (!storedUsers) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
      }

      // Check for current user session
      const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
      if (currentUserId) {
        const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]");
        const foundUser = users.find((u: User) => u.id === currentUserId);
        if (foundUser) {
          setUser(foundUser);
        }
      }
    }
    setIsLoading(false);
  }, []);

  const getUsersFromStorage = (): User[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]");
  };

  const saveUsersToStorage = (users: User[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.email === email);

    if (foundUser) {
      // In a real app, you'd verify the password hash
      setUser(foundUser);
      localStorage.setItem(CURRENT_USER_KEY, foundUser.id);
      return true;
    }
    return false;
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<boolean> => {
    const users = getUsersFromStorage();

    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date().toISOString(),
      favorites: [],
      ticketHistory: [],
      newsletterSubscribed: false,
    };

    users.push(newUser);
    saveUsersToStorage(users);
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, newUser.id);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      saveUsersToStorage(users);
      setUser(updatedUser);
    }
  };

  const addToFavorites = (showId: string) => {
    if (!user) return;

    const newFavorites = [...user.favorites];
    if (!newFavorites.includes(showId)) {
      newFavorites.push(showId);
      updateUser({ favorites: newFavorites });
    }
  };

  const removeFromFavorites = (showId: string) => {
    if (!user) return;

    const newFavorites = user.favorites.filter(id => id !== showId);
    updateUser({ favorites: newFavorites });
  };

  const addTicketPurchase = (purchase: Omit<TicketPurchase, 'id'>) => {
    if (!user) return;

    const newPurchase: TicketPurchase = {
      ...purchase,
      id: `ticket-${Date.now()}`,
    };

    const newHistory = [...user.ticketHistory, newPurchase];
    updateUser({ ticketHistory: newHistory });
  };

  const toggleNewsletterSubscription = () => {
    if (!user) return;
    updateUser({ newsletterSubscribed: !user.newsletterSubscribed });
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    addToFavorites,
    removeFromFavorites,
    addTicketPurchase,
    toggleNewsletterSubscription,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
