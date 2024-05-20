"use client";


import { deleteProductById, handleBuyOrderRequest } from "@/utils/api-calls";
import {
  mutateMyActiveListings,
  useMyActiveListings
} from "@/utils/api-calls-swr";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MyAds() {
  const { toast } = useToast();

  const { data: products } = useMyActiveListings();


  const setProductStatus = (id: string, status: boolean) => {
    handleBuyOrderRequest(id, status).then((res) => {
      if (res.ok) {
        toast({
          title: "Purchase request handled.",
          variant: "default"
        });
        mutateMyActiveListings();
      }
    });
  };

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
        className=" my-3 flex flex-col items-center justify-between rounded-lg bg-white p-5 shadow-md">
        <div className="flex w-full items-center justify-between">
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
        {product.productStatus === 1 ?
          <div className="my-3 flex flex-col items-center">
            <p className="mt-2 font-bold">Purchase request:</p>
            <div>
              <Button className="m-2 bg-green-500 hover:bg-green-600" type="button" onClick={()=>{setProductStatus(product.id,true)}}>Accept</Button>
              <Button className="m-2 bg-red-500 hover:bg-red-800" type="button" onClick={()=>{setProductStatus(product.id,false)}}>Deny</Button>
            </div>

          </div>
          : null}

      </div>

    ))
  ) : (
    <div>
      <h1 className="text-2xl font-bold">Loading...</h1>

      <div
        className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
      <div
        className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
      <div
        className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
      <div
        className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
      <div
        className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
      <div
        className=" my-3 flex h-24 animate-pulse flex-row items-center justify-between rounded-lg bg-gray-300 p-5 shadow-md" />
    </div>
  );

  return (

    <div className="mt-3 w-8/12 px-2">
      <div className="flex space-x-2 ">
        <Link className="text-sm hover:underline" href="/profile">
          My Marketplace
        </Link>
        <Image src="/images/arrow.svg" alt="arrow" width="8" height="8" />
        <p className="text-sm text-gray-500">My Ads</p>
      </div>

      <h1 className="my-5 text-4xl font-bold">My Ads</h1>
      {unpackedProducts}
    </div>
  );
}
