"use client";

import { useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "READER" | "CONTRIBUTOR" | "EDITOR" | "ADMIN";
  avatarUrl?: string;
  roleLabel: string;
  institution?: string;
}

export const DEMO_USERS: Record<string, UserProfile> = {
  pelajar: {
    id: "user-student-1",
    name: "Raden Wijaya",
    email: "raden.wijaya@student.ac.id",
    role: "READER",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    roleLabel: "Pelajar Seni Murni",
    institution: "Institut Seni Indonesia",
  },
  kurator: {
    id: "user-editor-1",
    name: "Siti Nurhaliza",
    email: "siti.kurator@jejakperupa.id",
    role: "ADMIN",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    roleLabel: "Kurator Editorial",
    institution: "Dewan Kesenian Nasional",
  },
};

let globalUser: UserProfile | null = DEMO_USERS.pelajar;
const listeners = new Set<(user: UserProfile | null) => void>();

export function getAuthState() {
  return globalUser;
}

export function setAuthState(userKey: "pelajar" | "kurator" | null) {
  if (userKey === null) {
    globalUser = null;
  } else {
    globalUser = DEMO_USERS[userKey] || DEMO_USERS.pelajar;
  }
  listeners.forEach((listener) => listener(globalUser));
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(globalUser);

  useEffect(() => {
    const handleChange = (user: UserProfile | null) => {
      setCurrentUser(user);
    };
    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  const login = (userKey: "pelajar" | "kurator" = "pelajar") => {
    setAuthState(userKey);
  };

  const logout = () => {
    setAuthState(null);
  };

  return {
    currentUser,
    isAuthenticated: currentUser !== null,
    login,
    logout,
  };
}
