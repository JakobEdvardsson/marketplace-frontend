"use client";

import Link from "next/link";
import {
  deleteWatchlistEntryById,
  getAllInboxMessages,
  getAllWatchlistEntries,
  getMyProductsFromSubscribedCategories,
  getProducts,
} from "@/utils/api-calls";
import { useEffect, useState } from "react";
import {
  InboxGetAllResponseDTO,
  ProductCategoryDTO,
  ProductGetAllResponseDTO,
  WatchListResponseDTO,
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

export default function MyWatchlist() {
  const [selected, setSelected] = useState("-1");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [categories, setCategories] = useState<
    WatchListResponseDTO[] | undefined
  >();

  const [products, setProducts] = useState<
    ProductGetAllResponseDTO | undefined
  >();

  const [messages, setMessages] = useState<
    InboxGetAllResponseDTO[] | undefined
  >();

  useEffect(() => {
    getAllWatchlistEntries()
      .then((response) => {
        response.json().then((categories) => {
          setCategories(categories);
          console.log(categories);
        });
      })
      .catch((_) => console.log(_));
  }, []);

  useEffect(() => {
    if (selected === "-1") {
      getMyProductsFromSubscribedCategories()
        .then((response) => {
          response.json().then((allTheProducts: ProductGetAllResponseDTO) => {
            setProducts(allTheProducts);
          });
        })
        .catch((_) => console.log(_));
      return;
    }

    getProducts(
      selected,
      null,
      null,
      null,
      ProductSortMode.DESCENDING,
      undefined,
    ).then((response) => {
      response
        .json()
        .then((productsFromSelectedCategory: ProductGetAllResponseDTO) => {
          setProducts(productsFromSelectedCategory);
        });
    });
  }, [selected]);

  useEffect(() => {
    getAllInboxMessages()
      .then((response) => {
        response.json().then((allTheMessages: InboxGetAllResponseDTO[]) => {
          setMessages(allTheMessages);
        });
      })
      .catch((_) => console.log(_));
  }, [selected]);

  const handleCategoryUpdate = (productCategory: ProductCategoryDTO) => {
    setSelected(productCategory.name);
    setSelectedCategoryId(productCategory.id);
  };

  const handleClickDeleteWatchlist = () => {
    deleteWatchlistEntryById(selectedCategoryId).catch((e) => {
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
      </div>
    </div>
  );
}
