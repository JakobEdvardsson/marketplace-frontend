import CreateProduct from "@/app/(with-nav)/product/components/CreateProduct";
import React from "react";
import { Metadata } from "next";
import Navigation from "@/app/(with-nav)/product/components/Navigation";

export const metadata: Metadata = {
  title: "Post ad | Marketplace",
  description: "Marketplace - post ad",
};

export default function Page() {
  return (
    <div className="mx-auto w-8/12 mobile-br:w-11/12">
      <Navigation name="Post Ad" />
      <CreateProduct />
    </div>
  );
}
