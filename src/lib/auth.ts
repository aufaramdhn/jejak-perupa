"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
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
    avatarUrl: null,
    roleLabel: "Pelajar Seni Murni",
    institution: "Institut Seni Indonesia",
  },
  kurator: {
    id: "user-editor-1",
    name: "Siti Nurhaliza",
    email: "siti.kurator@jejakperupa.id",
    role: "ADMIN",
    avatarUrl: null,
    roleLabel: "Kurator Editorial",
    institution: "Dewan Kesenian Nasional",
  },
};

function getStoredUser(): UserProfile | null {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("jejak_perupa_auth_user");
      if (saved) return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

let globalUser: UserProfile | null = getStoredUser();
let isAuthModalOpen = false;
let authModalMessage = "Masuk atau buat akun gratis untuk melanjutkan aksi ini.";
let pendingActionCallback: (() => void) | null = null;

const userListeners = new Set<() => void>();
const modalListeners = new Set<() => void>();

function subscribeUser(callback: () => void) {
  userListeners.add(callback);
  return () => userListeners.delete(callback);
}

function getUserSnapshot(): UserProfile | null {
  return globalUser;
}

function getServerUserSnapshot(): UserProfile | null {
  return null;
}

export function setAuthState(user: UserProfile | null) {
  globalUser = user;
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("jejak_perupa_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("jejak_perupa_auth_user");
    }
  }
  userListeners.forEach((l) => l());
}

export function openAuthModal(message?: string, onAuthenticated?: () => void) {
  isAuthModalOpen = true;
  if (message) authModalMessage = message;
  if (onAuthenticated) pendingActionCallback = onAuthenticated;
  modalListeners.forEach((l) => l());
}

export function closeAuthModal() {
  isAuthModalOpen = false;
  pendingActionCallback = null;
  modalListeners.forEach((l) => l());
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
  const currentUser = useSyncExternalStore(
    subscribeUser,
    getUserSnapshot,
    getServerUserSnapshot
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [modalOpen, setModalOpen] = useState(isAuthModalOpen);
  const [modalMsg, setModalMsg] = useState(authModalMessage);

  useEffect(() => {
    const handleModal = () => {
      setModalOpen(isAuthModalOpen);
      setModalMsg(authModalMessage);
    };
    modalListeners.add(handleModal);
    return () => {
      modalListeners.delete(handleModal);
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
    if (currentUser) {
      if (actionCallback) actionCallback();
      return true;
    }
    openAuthModal(message, actionCallback);
    return false;
  };

  return {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    isMounted: mounted,
    isGuest: !currentUser,
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
