"use client";

import Link from "next/link";
import { deleteWatchlistEntryById } from "@/utils/api-calls";
import React, { useState } from "react";
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
  mutateAllWatchlistEntries,
  useAllInboxMessages,
  useAllWatchlistEntries,
} from "@/utils/api-calls-swr";
import useSWR from "swr";
import { authedFetcher } from "@/lib/fetcher-authed";

function ProductSkeleton() {
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

export default function MyWatchlist() {
  const [selected, setSelected] = useState("-1");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const { data: categories } = useAllWatchlistEntries(true);

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
        mutateAllWatchlistEntries();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex w-full flex-col 2md:flex-row">
      <div className="mr-4 2md:w-1/3">
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
      <div className="mt-4 2md:mt-0 2md:w-2/3">
        {selected === "-1" ? (
          <h1 className="mb-4 text-2xl font-bold">New ads in watchlist</h1>
        ) : (
          <div>
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
              <Link
                className="text-sky-400 hover:text-sky-300"
                href={`/?category=${selected}`}
              >
                &quot;{selected}&quot;
              </Link>
            </div>
            <Separator />
          </div>
        )}
        {products &&
          products.products.map((product) => (
            <div
              key={product.productId}
              className="border-b border-gray-300 py-4 last:border-b-0"
            >
              <ProductCardIsRead
                product={product}
                isRead={
                  messages
                    ? messages.find(
                        (msg) => msg.productId === product.productId,
                      )
                      ? messages.find(
                          (msg) => msg.productId === product.productId,
                        )?.isRead === true
                      : true
                    : false
                } // TODO: Optimize this cursed code (map or something similar?)
              />
            </div>
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
