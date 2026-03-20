"use client";

import { usePathname } from "next/navigation";
import React from "react";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) return null;

  return <>{children}</>;
}
