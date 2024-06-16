"use client";

import { deleteProductById, handleBuyOrderRequest } from "@/utils/api-calls";
import { useMyActiveListings } from "@/utils/api-calls-swr";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MyAds() {
  const { toast } = useToast();

  const { data: products, isLoading, mutate } = useMyActiveListings();

  const setProductStatus = async (id: string, accept: boolean) => {
    if (!products) {
      return;
    }

    const updatedProducts = products.activeListings.filter(
      (product) => product.id !== id,
    );

    mutate({ activeListings: updatedProducts }, false);

    handleBuyOrderRequest(id, accept)
      .then((res) => {
        if (!res.ok) {
          toast({
            title: "Failed to handle purchase request.",
            variant: "destructive",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Failed to handle purchase request.",
          variant: "destructive",
        });
      })
      .finally(() => mutate());
  };

  const deleteProduct = (id: string) => {
    if (!products) {
      return;
    }

    const updatedProducts = products.activeListings.filter(
      (product) => product.id !== id,
    );
    mutate({ activeListings: updatedProducts }, false);

    deleteProductById(id)
      .then((res) => {
        if (!res.ok) {
          toast({
            title: "Product deletion failed.",
            variant: "destructive",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Product deletion failed.",
          variant: "destructive",
        });
      })
      .finally(() => mutate());
  };

  const unpackedProducts =
    products && products.activeListings.length
      ? products.activeListings.map((product) => (
          <div
            key={product.id}
            className=" my-3 flex flex-col items-center justify-between rounded-lg bg-white p-5 shadow-md"
          >
            <div className="flex w-full items-center justify-between">
              <h1>{product.productName}</h1>
              <Button
                variant="destructive"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </Button>
            </div>
            {product.productStatus === 1 ? (
              <div className="my-3 flex flex-col items-center">
                <p className="mt-2 font-bold">Purchase request:</p>
                <div>
                  <Button
                    className="m-2 bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      setProductStatus(product.id, true);
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    className="m-2 bg-red-500 hover:bg-red-800"
                    onClick={() => {
                      setProductStatus(product.id, false);
                    }}
                  >
                    Deny
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        ))
      : null;

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex space-x-2 ">
          <Link className="text-sm hover:underline" href="/profile">
            My Marketplace
          </Link>
          <Image src="/images/arrow.svg" alt="arrow" width="8" height="8" />
          <p className="text-sm text-gray-500">My Ads</p>
        </div>

        <h1 className="my-5 text-2xl font-bold">My Ads</h1>

        <div className="my-3 h-24 animate-pulse rounded-lg bg-gray-300 p-5 shadow-md" />
        <div className="my-3 h-24 animate-pulse rounded-lg bg-gray-300 p-5 shadow-md" />
        <div className="my-3 h-24 animate-pulse rounded-lg bg-gray-300 p-5 shadow-md" />
        <div className="my-3 h-24 animate-pulse rounded-lg bg-gray-300 p-5 shadow-md" />
        <div className="my-3 h-24 animate-pulse rounded-lg bg-gray-300 p-5 shadow-md" />
        <div className="my-3 h-24 animate-pulse rounded-lg bg-gray-300 p-5 shadow-md" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex space-x-2 ">
        <Link className="text-sm hover:underline" href="/profile">
          My Marketplace
        </Link>
        <Image src="/images/arrow.svg" alt="arrow" width="8" height="8" />
        <p className="text-sm text-gray-500">My Ads</p>
      </div>

      <h1 className="my-5 text-2xl font-bold">My Ads</h1>
      {unpackedProducts ? unpackedProducts : <p>No active ads found.</p>}
    </div>
  );
}
