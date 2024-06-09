"use client";

import CategorySelector from "@/app/(with-nav)/components/CategorySelector";
import SearchBar from "@/app/(with-nav)/components/SearchBar";
import ProductCard from "@/app/(with-nav)/components/ProductCard";
import {
  addEntryToWatchlist,
  deleteWatchlistEntryById,
  getAllWatchlistEntries,
  getProducts,
} from "@/utils/api-calls";
import {
  ProductGetAllResponseDTO,
  WatchListResponseDTO,
} from "@/types/endpoint-types-incoming";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ProductCondition, ProductSortMode } from "@/utils/api-call-types";
import { Button } from "@/components/ui/button";
import ConditionSelector from "@/app/(with-nav)/components/ConditionSelector";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/AuthContext";
import { useSearchParams } from "next/navigation";

export default function ProductSection() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [productCategoryName, setProductCategoryName] = useState<string | null>(
    category ? category : null,
  );

  const [minimumPrice, setMinimumPrice] = useState<number | null>(null);
  const [maximumPrice, setMaximumPrice] = useState<number | null>(null);
  const [condition, setCondition] = useState<ProductCondition | null>(null);
  const [query, setQuery] = useState<string | undefined>(undefined);

  const [products, setProducts] = useState<
    ProductGetAllResponseDTO | undefined
  >();

  const [subscribedCategories, setSubscribedCategories] = useState<
    WatchListResponseDTO[] | undefined
  >();

  const [subscribed, setSubscribed] = useState(true);

  useEffect(() => {
    updateProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProduct = async () => {
    try {
      const fetchedProducts = await getProducts(
        productCategoryName,
        minimumPrice,
        maximumPrice,
        condition,
        ProductSortMode.ASCENDING,
        query,
      );
      if (!fetchedProducts.ok) return;
      const productData = await fetchedProducts.json();
      setProducts(productData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleMinimumPriceChange = (value: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(value.target.value);

    if (maximumPrice && maximumPrice < numberValue) {
      setMaximumPrice(numberValue);
    }

    setMinimumPrice(numberValue);
  };

  const handleMaximumPriceChange = (value: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(value.target.value);
    setMaximumPrice(numberValue);
  };

  const handleQuerySearch = (query: string) => {
    setQuery(query);
  };

  const reset = () => {
    setCondition(null);
    setMinimumPrice(null);
    setMaximumPrice(null);
    setProductCategoryName(null);
    setQuery("");
  };

  const auth = useAuth();
  useEffect(() => {
    if (auth.loggedIn) {
      getAllWatchlistEntries()
        .then((response) => {
          response.json().then((categories) => {
            setSubscribedCategories(categories);
            console.log(categories);
          });
        })
        .catch((_) => console.log(_));
    }
  }, [auth.loggedIn]);

  const handleClickSubscribe = () => {
    if (productCategoryName !== null) {
      addEntryToWatchlist(productCategoryName).catch((e) => {
        console.log(e);
      });
      setSubscribed(true);
    }
  };

  const handleClickUnsubscribe = () => {
    if (productCategoryName !== null) {
      if (subscribedCategories) {
        const categoryId: WatchListResponseDTO | undefined =
          subscribedCategories.find((category) => {
            if (category.productCategory.name === productCategoryName) {
              return category.productCategory.id;
            }

            return "";
          });
        if (categoryId) {
          deleteWatchlistEntryById(categoryId?.productCategory.id).catch(
            (e) => {
              console.log(e);
            },
          );
          setSubscribed(false);
        }
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-3 flex w-4/5 justify-center rounded-3xl bg-gray-100">
        <div className="w-4/5 py-4 text-center">
          <CategorySelector
            setProductCategoryName={setProductCategoryName}
            selectedCategory={productCategoryName}
          />

          <Separator />
          <div className="mt-2" />

          <ConditionSelector
            condition={condition}
            setCondition={setCondition}
          />

          <Separator />

          <div className="mt-2 flex items-center">
            <p>Max:</p>
            <Input
              className="m-1"
              type="number"
              placeholder="Max price:"
              min={minimumPrice ? minimumPrice : 0}
              value={maximumPrice ? maximumPrice : ""}
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
              value={minimumPrice ? minimumPrice : ""}
              onChange={handleMinimumPriceChange}
            />
          </div>

          {/*// search*/}
          <SearchBar handleSearch={handleQuerySearch} query={query} />
          <div className="flex justify-between p-2">
            <div>
              <Button className="mx-2" onClick={updateProduct}>
                Search
              </Button>
              <Button className="mx-2 bg-red-500" type="button" onClick={reset}>
                Reset
              </Button>
            </div>
            {subscribedCategories && productCategoryName ? (
              subscribedCategories.find(
                (category) =>
                  category.productCategory.name === productCategoryName,
              ) ? (
                subscribed ? (
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
