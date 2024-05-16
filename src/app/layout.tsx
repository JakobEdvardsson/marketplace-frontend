import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { SSEListener } from "@/components/SSEListener";
import { AuthProvider } from "@/components/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <AuthProvider>
          {children}
          <Toaster />
          <SSEListener />
        </AuthProvider>
      </body>
    </html>
  );
}
