"use client";

import { useState, useEffect } from "react";
import { loginUserAction, registerUserAction } from "./actions/authActions";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "READER" | "CONTRIBUTOR" | "EDITOR" | "ADMIN";
  avatarUrl?: string | null;
  roleLabel: string;
  institution?: string | null;
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

// Global state in memory (starts null to match SSR initial render)
let globalUser: UserProfile | null = null;
let isAuthModalOpen = false;
let authModalMessage = "Masuk atau buat akun gratis untuk melanjutkan aksi ini.";
let pendingActionCallback: (() => void) | null = null;

const userListeners = new Set<(user: UserProfile | null) => void>();
const modalListeners = new Set<(open: boolean, msg: string) => void>();

export function setAuthState(user: UserProfile | null) {
  globalUser = user;
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("jejak_perupa_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("jejak_perupa_auth_user");
    }
  }
  userListeners.forEach((listener) => listener(globalUser));
}

export function openAuthModal(message?: string, onAuthenticated?: () => void) {
  isAuthModalOpen = true;
  if (message) authModalMessage = message;
  if (onAuthenticated) pendingActionCallback = onAuthenticated;
  modalListeners.forEach((l) => l(isAuthModalOpen, authModalMessage));
}

export function closeAuthModal() {
  isAuthModalOpen = false;
  pendingActionCallback = null;
  modalListeners.forEach((l) => l(isAuthModalOpen, authModalMessage));
}

export function triggerPendingAction() {
  if (pendingActionCallback) {
    const cb = pendingActionCallback;
    pendingActionCallback = null;
    cb();
  }
  closeAuthModal();
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(globalUser);
  const [isMounted, setIsMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(isAuthModalOpen);
  const [modalMsg, setModalMsg] = useState(authModalMessage);

  useEffect(() => {
    // Read from localStorage only after client-side hydration mount
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("jejak_perupa_auth_user");
        if (saved && !globalUser) {
          globalUser = JSON.parse(saved);
        }
      } catch (e) {
        globalUser = null;
      }
    }

    setCurrentUser(globalUser);
    setIsMounted(true);

    const handleUserChange = (user: UserProfile | null) => {
      setCurrentUser(user);
    };
    const handleModalChange = (open: boolean, msg: string) => {
      setModalOpen(open);
      setModalMsg(msg);
    };

    userListeners.add(handleUserChange);
    modalListeners.add(handleModalChange);

    return () => {
      userListeners.delete(handleUserChange);
      modalListeners.delete(handleModalChange);
    };
  }, []);

  const loginWithDemo = (roleKey: "pelajar" | "kurator" = "pelajar") => {
    const user = DEMO_USERS[roleKey] || DEMO_USERS.pelajar;
    setAuthState(user);
    triggerPendingAction();
    return { success: true, user };
  };

  const login = async (email: string, pass: string) => {
    const res = await loginUserAction({ email, password: pass });
    if (res.success && res.user) {
      const u: UserProfile = {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role as any,
        avatarUrl: res.user.avatarUrl,
        institution: res.user.institution,
        roleLabel: res.user.roleLabel,
      };
      setAuthState(u);
      triggerPendingAction();
    }
    return res;
  };

  const register = async (name: string, email: string, pass: string, inst?: string) => {
    const res = await registerUserAction({
      name,
      email,
      password: pass,
      institution: inst,
      role: "READER",
    });
    if (res.success && res.user) {
      const u: UserProfile = {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role as any,
        avatarUrl: res.user.avatarUrl,
        institution: res.user.institution,
        roleLabel: res.user.roleLabel,
      };
      setAuthState(u);
      triggerPendingAction();
    }
    return res;
  };

  const logout = () => {
    setAuthState(null);
  };

  const requireAuth = (actionCallback?: () => void, message?: string) => {
    if (isMounted && currentUser) {
      if (actionCallback) actionCallback();
      return true;
    }
    openAuthModal(message, actionCallback);
    return false;
  };

  return {
    currentUser,
    isAuthenticated: isMounted && !!currentUser,
    isMounted,
    isGuest: !isMounted || !currentUser,
    loginWithDemo,
    login,
    register,
    logout,
    requireAuth,
    modalOpen,
    modalMsg,
    isAuthModalOpen: modalOpen,
    authModalMessage: modalMsg,
    openAuthModal,
    closeAuthModal,
  };
}
