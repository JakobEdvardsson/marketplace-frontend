"use client";

import Link from "next/link";
import {
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

export default function MyWatchlist() {
  const [selected, setSelected] = useState("");

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
        <h1 className="text-2xl font-bold">New ads in watchlist</h1>
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
