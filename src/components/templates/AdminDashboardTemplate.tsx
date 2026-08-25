"use client";

import React from "react";
import { AdminLayout } from "@/components/templates/AdminLayout";

export interface AdminDashboardTemplateProps {
  children: React.ReactNode;
  activeTab?: "overview" | "articles" | "artists" | "submissions" | "settings";
  className?: string;
}

export function AdminDashboardTemplate({
  children,
}: AdminDashboardTemplateProps) {
  return <AdminLayout>{children}</AdminLayout>;
}
