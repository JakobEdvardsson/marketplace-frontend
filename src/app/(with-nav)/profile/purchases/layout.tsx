import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "My Purchases | Marketplace",
  description: "Purchases",
};

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
