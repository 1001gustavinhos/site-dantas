"use client";

import { AppProvider } from "@/context/AppContext";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";


export function AppProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      {children}
      <Toaster />
    </AppProvider>
  );
}
