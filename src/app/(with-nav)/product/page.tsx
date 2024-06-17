import CreateProduct from "@/app/(with-nav)/product/components/CreateProduct";
import React from "react";
import { Metadata } from "next";
import Navigation from "@/app/(with-nav)/product/components/Navigation";
import { getAllProductCategories } from "@/utils/api-calls";
import { ProductCategoryDTO } from "@/types/endpoint-types-incoming";

export const metadata: Metadata = {
  title: "Post ad | Marketplace",
  description: "Marketplace - post ad",
};

async function getCategories(): Promise<ProductCategoryDTO[] | undefined> {
  const categories: ProductCategoryDTO[] = await getAllProductCategories()
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });

  if (categories) {
    return categories;
  }

  return undefined;
}

export default async function Page() {
  const categories = await getCategories();

  return (
    <div className="mx-auto w-8/12 mobile-br:w-11/12">
      <Navigation name="Post Ad" />
      <CreateProduct categories={categories} />
    </div>
  );
}
