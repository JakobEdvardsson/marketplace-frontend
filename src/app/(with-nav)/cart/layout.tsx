import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cart | Marketplace",
  description: "Marketplace checkout",
};

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
