"use client";

import React from "react";
import dynamic from "next/dynamic";

const AuthModal = dynamic(
  () =>
    import("@/components/organisms/exploration/AuthModal").then(
      (mod) => mod.AuthModal
    ),
  { ssr: false }
);

const SearchModal = dynamic(
  () =>
    import("@/components/organisms/exploration/SearchModal").then(
      (mod) => mod.SearchModal
    ),
  { ssr: false }
);

export function GlobalModalsContainer() {
  return (
    <>
      <AuthModal />
      <SearchModal />
    </>
  );
}
