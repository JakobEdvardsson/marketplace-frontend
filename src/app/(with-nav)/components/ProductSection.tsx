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
import {
  ProductGetAllResponseDTO,
  WatchListResponseDTO,
} from "@/types/endpoint-types-incoming";
import { useAllWatchlistEntries, useProducts } from "@/utils/api-calls-swr";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useAuth } from "@/components/AuthContext";

interface SearchParams {
  productCategoryName: string | null;
  minimumPrice: number | null;
  maximumPrice: number | null;
  condition: ProductCondition | null;
  sortMode: ProductSortMode | null;
  query: string | undefined;
}

// eslint-disable-next-line complexity
export default function ProductSection(props: {
  readonly fallbackData: ProductGetAllResponseDTO | undefined;
}) {
  const { replace } = useRouter();
  const { toast } = useToast();
  const { loggedIn } = useAuth();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q");
  const minimumPriceParam = Number(searchParams.get("minPrice"));
  const maximumPriceParam = Number(searchParams.get("maxPrice"));
  const conditionParam =
    searchParams.get("condition") === null
      ? -1
      : Number(searchParams.get("condition"));
  const sortModeParam = Number(searchParams.get("sort"));

  const [search, setSearch] = useState<SearchParams>({
    productCategoryName: categoryParam ? categoryParam : null,
    minimumPrice:
      Number.isNaN(minimumPriceParam) || !minimumPriceParam
        ? null
        : minimumPriceParam,
    maximumPrice:
      Number.isNaN(maximumPriceParam) || !maximumPriceParam
        ? null
        : maximumPriceParam,
    condition:
      Number.isNaN(conditionParam) || !ProductCondition[conditionParam]
        ? null
        : conditionParam,
    sortMode: Number.isNaN(sortModeParam)
      ? ProductSortMode.ASCENDING
      : sortModeParam,
    query: queryParam ? queryParam : undefined,
  });

  const { data: subscribedCategories, mutate: mutateSubscribedCategories } =
    useAllWatchlistEntries(Boolean(loggedIn));

  const { data: searchProducts } = useProducts(
    search.productCategoryName,
    search.minimumPrice,
    search.maximumPrice,
    search.condition,
    search.sortMode,
    search.query,
  );

  const products =
    searchParams.size ||
    search.productCategoryName ||
    search.minimumPrice ||
    search.maximumPrice ||
    search.condition !== null ||
    search.sortMode !== null ||
    search.query
      ? searchProducts
      : props.fallbackData;

  const handleReset = () => {
    setSearch({
      productCategoryName: null,
      minimumPrice: null,
      maximumPrice: null,
      condition: null,
      sortMode: ProductSortMode.ASCENDING,
      query: undefined,
    });
    replace(`${pathname}?`);
  };

  const handleMinimumPriceChange = (value: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const numberValue = Number(value.target.value);

    if (search.maximumPrice && search.maximumPrice < numberValue) {
      setSearch((prevState) => ({
        ...prevState,
        maximumPrice: numberValue ? numberValue : null,
      }));
      params.set("maxPrice", value.target.value);
    }

    setSearch((prevState) => ({
      ...prevState,
      minimumPrice: numberValue ? numberValue : null,
    }));
    if (numberValue) {
      params.set("minPrice", value.target.value);
    } else {
      params.delete("minPrice");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleMaximumPriceChange = (value: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(value.target.value);

    setSearch((prevState) => ({
      ...prevState,
      maximumPrice: numberValue ? numberValue : null,
    }));

    const params = new URLSearchParams(searchParams);
    if (numberValue) {
      params.set("maxPrice", value.target.value);
    } else {
      params.delete("maxPrice");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleQuerySearch = (query: string) => {
    setSearch((prevState) => ({
      ...prevState,
      query,
    }));
  };

  const handleClickSubscribe = () => {
    const { productCategoryName } = search;
    if (!productCategoryName) {
      return;
    }

    const newCategory: WatchListResponseDTO = {
      id: "",
      productCategory: {
        id: "",
        name: productCategoryName,
      },
    };

    // optimistic subscribe
    mutateSubscribedCategories(
      (current) => (current ? [...current, newCategory] : [newCategory]),
      false,
    );

    addEntryToWatchlist(productCategoryName)
      .catch((error) => {
        toast({
          title: "Could not add to watchlist",
          variant: "destructive",
        });
        console.error(error);
      })
      .finally(() => mutateSubscribedCategories());
  };

  const handleClickUnsubscribe = () => {
    if (!search.productCategoryName || !subscribedCategories) {
      return;
    }

    const categoryToRemove = subscribedCategories.find(
      (category) =>
        category.productCategory.name === search.productCategoryName,
    );
    if (!categoryToRemove) {
      return;
    }

    // optimistic unsubscribe
    mutateSubscribedCategories(
      (current) =>
        current
          ? current.filter(
              (category) =>
                category.productCategory.name !==
                categoryToRemove.productCategory.name,
            )
          : undefined,
      false,
    );

    deleteWatchlistEntryById(categoryToRemove.productCategory.id)
      .catch((error) => {
        toast({
          title: "Could not remove from watchlist",
          variant: "destructive",
        });
        console.error(error);
      })
      .finally(() => mutateSubscribedCategories());
  };

  return (
    <div className="w-full flex-col items-center">
      <CategorySelector
        setProductCategoryName={(categoryName) => {
          const params = new URLSearchParams(searchParams);

          if (search.productCategoryName === categoryName) {
            setSearch((prevState) => ({
              ...prevState,
              productCategoryName: null,
            }));
            params.delete("category");
          } else {
            setSearch((prevState) => ({
              ...prevState,
              productCategoryName: categoryName,
            }));
            if (categoryName !== null) {
              params.set("category", categoryName);
            }
          }

          replace(`${pathname}?${params.toString()}`);
        }}
        selectedCategoryName={search.productCategoryName}
      />

      <Separator />

      <div className="mt-2 flex flex-wrap-reverse items-center justify-center sm:flex-nowrap">
        <div className="mt-1 flex w-full sm:mr-1 sm:mt-0">
          <Input
            className="mr-1"
            type="number"
            placeholder="Minimum price"
            min={0}
            value={search.minimumPrice ? search.minimumPrice : ""}
            onChange={handleMinimumPriceChange}
          />
          <Input
            type="number"
            placeholder="Maximum price"
            min={search.minimumPrice ? search.minimumPrice : 0}
            value={search.maximumPrice ? search.maximumPrice : ""}
            onChange={handleMaximumPriceChange}
          />
        </div>
        <div className="flex w-full min-w-fit">
          <ConditionSelector
            condition={search.condition}
            setCondition={(condition) => {
              setSearch((prevState) => ({ ...prevState, condition }));

              const params = new URLSearchParams(searchParams);
              if (condition === null) {
                params.delete("condition");
              } else {
                params.set("condition", condition.toString());
              }

              replace(`${pathname}?${params.toString()}`);
            }}
          />
          <select
            className="ml-1 w-full rounded-md p-2.5"
            value={
              search.sortMode ? search.sortMode : ProductSortMode.ASCENDING
            }
            onChange={(event) => {
              const sortModeString = event.target.value;
              const sortMode = Number(event.target.value);
              const params = new URLSearchParams(searchParams);
              params.set("sort", sortModeString);
              replace(`${pathname}?${params.toString()}`);

              setSearch((prevState) => ({ ...prevState, sortMode }));
            }}
          >
            <option key="ASCENDING" value={0}>
              Newest first
            </option>
            <option key="DESCENDING" value={1}>
              Oldest first
            </option>
          </select>
        </div>
      </div>

      {/* search */}
      <SearchBar handleSearch={handleQuerySearch} />
      <div className="border-b border-gray-300 py-4" />

      <div className="mt-4 flex flex-wrap justify-between">
        <div
          className={
            search.productCategoryName ||
            search.query ||
            search.condition !== null ||
            search.minimumPrice ||
            search.maximumPrice ||
            search.sortMode === ProductSortMode.DESCENDING
              ? ""
              : "hidden"
          }
        >
          <Button variant="ghost" className="p-1" onClick={handleReset}>
            <Image
              src="/images/trash.svg"
              alt="Clear filters"
              width={20}
              height={20}
            />
            <p className="ml-1 text-base">Clear filters</p>
          </Button>
        </div>
        <div>
          {subscribedCategories && search.productCategoryName ? (
            subscribedCategories.find(
              (category) =>
                category.productCategory.name === search.productCategoryName,
            ) ? (
              <Button
                variant="outline"
                className="border-black"
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
                className="border-black"
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

      {products ? (
        products.products.map((product) => (
          <div
            key={product.productId}
            className="border-b border-gray-300 py-4 last:border-b-0"
          >
            <ProductCard
              key={product.productId}
              product={product}
              setCategory={(category) => {
                const params = new URLSearchParams(searchParams);

                if (search.productCategoryName === category.name) {
                  setSearch((prevState) => ({
                    ...prevState,
                    productCategoryName: null,
                  }));
                  params.delete("category");
                } else {
                  setSearch((prevState) => ({
                    ...prevState,
                    productCategoryName: category.name,
                  }));
                  if (category.name !== null) {
                    params.set("category", category.name);
                  }
                }

                replace(`${pathname}?${params.toString()}`);
              }}
            />
          </div>
        ))
      ) : (
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      )}
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
