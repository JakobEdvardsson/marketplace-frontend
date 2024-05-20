"use client";

import { deleteProductById } from "@/utils/api-calls";
import {
  mutateMyActiveListings,
  useMyActiveListings,
} from "@/utils/api-calls-swr";
import { useToast } from "@/components/ui/use-toast";

export default function MyProducts() {
  const { toast } = useToast();

  const { data: products } = useMyActiveListings();

  const deleteProduct = (id: string) => {
    deleteProductById(id).then((res) => {
      if (res.ok) {
        toast({
          title: "Product deleted.",
          variant: "default",
        });
        mutateMyActiveListings();
      }
    });
  };

  const unpackedProducts = products ? (
    products.activeListings.map((product) => (
      <div
        key={product.id}
        className=" my-3 flex h-24 flex-row items-center justify-between rounded-lg bg-white p-5 shadow-md"
      >
        <h1>{product.productName}</h1>
        <p>{product.productCategoryName}</p>
        <p>{product.price + " kr"}</p>
        <button
          className="cursor-help font-bold text-red-700"
          type="button"
          onClick={() => deleteProduct(product.id)}
        >
          Delete
        </button>
      </div>
    ))
  ) : (
    <div>
      <h1 className="text-2xl font-bold">Loading...</h1>
      <div className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
      <div className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
      <div className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
      <div className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
      <div className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
      <div className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
    </div>
  );

  return (
    <div className="size-full p-10">
      <h1 className="text-4xl font-bold">My Products</h1>
      {unpackedProducts}
    </div>
  );
}
