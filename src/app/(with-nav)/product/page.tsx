import CreateProduct from "@/app/(with-nav)/product/components/CreateProduct";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post ad | Marketplace",
  description: "Marketplace - post ad",
};

export default function Page() {
  return <CreateProduct />;
}
