import ProductSection from "@/app/(with-nav)/components/ProductSection";
import { get20LatestProducts } from "@/utils/api-calls";
import { ProductGetAllResponseDTO } from "@/types/endpoint-types-incoming";
import React, { Suspense } from "react";

async function getProducts(): Promise<ProductGetAllResponseDTO | undefined> {
  const product: ProductGetAllResponseDTO = await get20LatestProducts()
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });

  if (product) {
    return product;
  }

  return undefined;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="mx-auto my-3 w-11/12 2md:w-8/12">
      <Suspense fallback={<ProductCardSkeleton />}>
        <ProductSection fallbackData={products} />
      </Suspense>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="mt-4 flex h-96 w-full animate-pulse flex-col sm:h-48 sm:flex-row">
      <div className="h-2/3 w-full rounded bg-gray-200 sm:h-full sm:w-2/5" />
      <div className="mt-2 flex h-auto w-full flex-col sm:mt-0 sm:w-3/5 sm:pl-3">
        <div className="flex justify-between">
          <div className="h-4 w-1/4 rounded bg-gray-200" />
          <div className="h-4 w-1/4 rounded bg-gray-200" />
        </div>
        <div className="mt-2 h-6 w-3/4 rounded bg-gray-200" />
        <div className="mt-4 flex grow flex-row">
          <div className="h-4 w-full rounded" />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="h-6 w-1/4 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
