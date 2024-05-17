import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile | Marketplace",
  description: "Profile",
};

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
