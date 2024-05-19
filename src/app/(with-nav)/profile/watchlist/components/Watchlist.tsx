"use client";

import Link from "next/link";
import { deleteWatchlistEntryById } from "@/utils/api-calls";
import { useState } from "react";
import {
  ProductCategoryDTO,
  ProductGetAllResponseDTO,
} from "@/types/endpoint-types-incoming";
import CategoryCard from "@/app/(with-nav)/profile/watchlist/components/CategoryCard";
import { Separator } from "@/components/ui/separator";
import ProductCardIsRead from "@/app/(with-nav)/profile/watchlist/components/ProductCardIsRead";
import { ProductSortMode } from "@/utils/api-call-types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import {
  BACKEND_URL,
  useAllInboxMessages,
  useAllWatchlistEntries,
} from "@/utils/api-calls-swr";
import useSWR, { mutate } from "swr";
import { authedFetcher } from "@/lib/fetcher-authed";

function ProductSkeleton() {
  return (
    <div className="m-2 flex h-96 w-9/12 flex-col items-center rounded-2xl bg-gray-100 p-2 shadow-md sm:h-48 sm:w-2/3  sm:flex-row">
      <div className="mr-0 h-2/3 w-full animate-pulse rounded-2xl bg-gray-300 sm:mr-2 sm:h-full sm:w-2/5" />

      <div className="mt-2 flex h-auto w-full flex-col justify-around rounded-2xl bg-gray-50 p-3 sm:mt-0 sm:w-3/5">
        <div>
          <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-300" />
          <div className="mb-2 h-6 w-1/2 animate-pulse rounded bg-gray-300" />
          <div className="mb-2 h-6 w-1/4 animate-pulse rounded bg-gray-300" />
          <div className="mb-2 h-6 w-1/3 animate-pulse rounded bg-gray-300" />
        </div>

        <div className="flex h-full flex-row flex-wrap items-end justify-between align-top">
          <div className="h-6 w-1/4 animate-pulse rounded bg-gray-300" />
          <div className="h-10 w-1/4 animate-pulse rounded bg-gray-300" />
        </div>
      </div>
    </div>
  );
}

export default function MyWatchlist() {
  const [selected, setSelected] = useState("-1");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const { data: categories } = useAllWatchlistEntries();

  const { data: messages } = useAllInboxMessages();

  const { data: products, isLoading } = useSWR<ProductGetAllResponseDTO>(
    selected === "-1"
      ? `${BACKEND_URL}/products/my-subscribed-categories`
      : `${BACKEND_URL}/products?category=${selected}&sort=${ProductSortMode.DESCENDING}`,
    authedFetcher,
  );

  const handleCategoryUpdate = (productCategory: ProductCategoryDTO) => {
    setSelected(productCategory.name);
    setSelectedCategoryId(productCategory.id);
  };

  const handleClickDeleteWatchlist = () => {
    deleteWatchlistEntryById(selectedCategoryId)
      .then((_) => {
        setSelected("-1");
        mutate(`${BACKEND_URL}/watchlist`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="mt-10 flex w-full">
      <div className="mr-4 w-1/3 ">
        <h1 className="text-2xl font-bold">Watchlist</h1>
        <Link
          className={
            selected === "-1"
              ? "mt-4 flex rounded-t-lg bg-sky-100 p-4 hover:font-bold"
              : "mt-4 flex rounded-t-lg p-4 hover:font-bold"
          }
          href="/profile/watchlist"
          onClick={() => {
            setSelected("-1");
          }}
        >
          New ads
        </Link>
        <Separator />
        {categories ? (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              productInfo={category}
              handleCategoryUpdate={handleCategoryUpdate}
              selected={selected}
            />
          ))
        ) : (
          <div className="mb-2.5 h-3 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
        )}
      </div>
      <div className="w-2/3">
        {selected === "-1" ? (
          <h1 className="mb-4 text-2xl font-bold">New ads in watchlist</h1>
        ) : (
          <div>
            <h1 className="mb-4 text-2xl font-bold">Category: {selected}</h1>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="outline">
                  <Image
                    className="mr-2 size-4"
                    width="8"
                    height="8"
                    src="/images/trash.svg"
                    alt="trash"
                  />{" "}
                  Remove
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to remove the subscription &quot;
                    {selected}&quot;?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClickDeleteWatchlist}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex flex-row p-4 text-sm">
              <p className="mr-1 font-bold">Searching on: </p>
              <Link className="text-sky-400 hover:text-sky-300" href="/bajs">
                &quot;{selected}&quot;
              </Link>
            </div>
            <Separator />
          </div>
        )}
        {products &&
          products.products.map((product) => (
            <ProductCardIsRead
              key={product.productId}
              productInfo={product}
              isRead={
                messages
                  ? messages.find((msg) => msg.productId === product.productId)
                    ? messages.find(
                        (msg) => msg.productId === product.productId,
                      )?.isRead === true
                    : true
                  : false
              } // TODO: Optimize this cursed code (map or something similar?)
            />
          ))}
        {isLoading && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}
      </div>
    </div>
  );
}
