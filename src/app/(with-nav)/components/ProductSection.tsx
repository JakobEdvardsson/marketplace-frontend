"use client";

import CategorySelector from "@/app/(with-nav)/components/CategorySelector";
import SearchBar from "@/app/(with-nav)/components/SearchBar";
import ProductCard from "@/app/(with-nav)/components/ProductCard";
import {
  addEntryToWatchlist,
  deleteWatchlistEntryById,
} from "@/utils/api-calls";
import React, { ChangeEvent, useState } from "react";
import { ProductCondition, ProductSortMode } from "@/utils/api-call-types";
import { Button } from "@/components/ui/button";
import ConditionSelector from "@/app/(with-nav)/components/ConditionSelector";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { WatchListResponseDTO } from "@/types/endpoint-types-incoming";
import { useAllWatchlistEntries, useProducts } from "@/utils/api-calls-swr";
import { useSearchParams } from "next/navigation";

interface SearchParams {
  productCategoryName: string | null;
  minimumPrice: number | null;
  maximumPrice: number | null;
  condition: ProductCondition | null;
  sortMode: ProductSortMode | null;
  query: string | undefined;
}

export default function ProductSection() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [search, setSearch] = useState<SearchParams>({
    productCategoryName: categoryParam ? categoryParam : null,
    minimumPrice: null,
    maximumPrice: null,
    condition: null,
    sortMode: null,
    query: undefined,
  });

  const { data: subscribedCategories, mutate: mutateSubscribedCategories } =
    useAllWatchlistEntries();

  const { data: products } = useProducts(
    search.productCategoryName,
    search.minimumPrice,
    search.maximumPrice,
    search.condition,
    ProductSortMode.DESCENDING,
    search.query,
  );

  const handleMinimumPriceChange = (value: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(value.target.value);

    if (search.maximumPrice && search.maximumPrice < numberValue) {
      setSearch((prevState) => ({ ...prevState, maximumPrice: numberValue }));
    }

    setSearch((prevState) => ({ ...prevState, minimumPrice: numberValue }));
  };

  const handleMaximumPriceChange = (value: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(value.target.value);
    setSearch((prevState) => ({ ...prevState, maximumPrice: numberValue }));
  };

  const handleQuerySearch = (query: string) => {
    setSearch((prevState) => ({
      ...prevState,
      query,
    }));
  };

  const reset = () => {
    setSearch((prevState) => ({
      ...prevState,
      condition: null,
      minimumPrice: null,
      maximumPrice: null,
      productCategoryName: null,
      query: undefined,
    }));
  };

  const handleClickSubscribe = () => {
    if (search.productCategoryName !== null) {
      addEntryToWatchlist(search.productCategoryName)
        .then((_) => {
          mutateSubscribedCategories();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleClickUnsubscribe = () => {
    if (search.productCategoryName !== null) {
      if (subscribedCategories) {
        const categoryId: WatchListResponseDTO | undefined =
          subscribedCategories.find((category) => {
            if (category.productCategory.name === search.productCategoryName) {
              return category.productCategory.id;
            }

            return "";
          });
        if (categoryId) {
          deleteWatchlistEntryById(categoryId.productCategory.id)
            .then((_) => {
              mutateSubscribedCategories();
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-3 flex w-4/5 justify-center">
        <div className="w-4/5 py-4 text-center">
          <CategorySelector
            setProductCategoryName={(_) =>
              setSearch((prevState) => ({
                ...prevState,
                productCategoryName: _,
              }))
            }
            selectedCategory={search.productCategoryName}
          />

          <Separator />
          <div className="mt-2" />

          <ConditionSelector
            condition={search.condition}
            setCondition={(_) =>
              setSearch((prevState) => ({ ...prevState, condition: _ }))
            }
          />

          <Separator />

          <div className="mt-2 flex items-center">
            <p>Max:</p>
            <Input
              className="m-1"
              type="number"
              placeholder="Max price:"
              min={search.minimumPrice ? search.minimumPrice : 0}
              value={search.maximumPrice ? search.maximumPrice : ""}
              onChange={handleMaximumPriceChange}
            />
          </div>

          <div className="mb-10 flex items-center">
            <p>Min:</p>
            <Input
              className="m-1"
              type="number"
              placeholder="Min price:"
              min={0}
              value={search.minimumPrice ? search.minimumPrice : ""}
              onChange={handleMinimumPriceChange}
            />
          </div>

          {/*// search*/}
          <SearchBar handleSearch={handleQuerySearch} query={search.query} />
          <div className="flex justify-between p-2">
            <div>
              <Button className="mx-2" onClick={reset}>
                Search
              </Button>
              <Button className="mx-2 bg-red-500" type="button" onClick={reset}>
                Reset
              </Button>
            </div>
            {subscribedCategories && search.productCategoryName ? (
              subscribedCategories.find(
                (category) =>
                  category.productCategory.name === search.productCategoryName,
              ) ? (
                <Button
                  variant="outline"
                  className="mx-2 border-black"
                  type="button"
                  onClick={handleClickUnsubscribe}
                >
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 fill-black"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                  </div>
                  Watching
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="mx-2 border-black"
                  type="button"
                  onClick={handleClickSubscribe}
                >
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                  </div>
                  Create watchlist
                </Button>
              )
            ) : null}
          </div>
        </div>
      </div>

      {products &&
        products.products.map((product) => (
          <ProductCard
            key={product.productId}
            name={product.name}
            description={product.description}
            price={product.price}
            productionYear={product.productionYear}
            createdAt={new Date(product.createdAt).toISOString()}
            condition={product.condition}
            buyer={product.buyer}
            color={product.color}
            imageUrls={product.imageUrls}
            productCategory={product.productCategory}
            productId={product.productId}
            seller={product.seller}
            status={product.status}
          />
        ))}
    </div>
  );
}
