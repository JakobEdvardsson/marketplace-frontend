"use client";

import CategorySelector from "@/app/(with-nav)/components/CategorySelector";
import SearchBar from "@/app/(with-nav)/components/SearchBar";
import ProductCard from "@/app/(with-nav)/components/ProductCard";
import { getProducts } from "@/utils/api-calls";
import { ProductGetAllResponseDTO } from "@/types/endpoint-types-incoming";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ProductCondition } from "@/utils/api-call-types";
import { Button } from "@/components/ui/button";
import ConditionSelector from "@/app/(with-nav)/components/ConditionSelector";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function ProductSection() {
  const [productCategoryName, setProductCategoryName] = useState<string | null>(
    null,
  );
  const [minimumPrice, setMinimumPrice] = useState<number | null>(null);
  const [maximumPrice, setMaximumPrice] = useState<number | null>(null);
  const [condition, setCondition] = useState<ProductCondition | null>(null);
  const [query, setQuery] = useState<string | undefined>(undefined);

  const [products, setProducts] = useState<
    ProductGetAllResponseDTO | undefined
  >();

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
        null,
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
    //Remove to the next comment if functionality is added for combining search terms with other filters
    setCondition(null);
    setMinimumPrice(null);
    setMaximumPrice(null);
    setProductCategoryName(null);
    // To here

    setQuery(query);
  };

  const reset = () => {
    setCondition(null);
    setMinimumPrice(null);
    setMaximumPrice(null);
    setProductCategoryName(null);
    setQuery("");
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-3 flex w-4/5 justify-center rounded-3xl bg-gray-100">
        <div className="w-4/5 py-4 text-center">
          <h1 className="text-4xl font-black text-red-600">Marketplace</h1>

          <CategorySelector
            setProductCategoryName={setProductCategoryName}
            selectedCategory={productCategoryName}
          />

          <Separator />

          <ConditionSelector
            condition={condition}
            setCondition={setCondition}
          />

          <Separator />

          <div className="flex items-center">
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

          <div className="flex items-center">
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

          <h3 className="my-2 text-xl font-bold">OR:</h3>

          {/*// search*/}
          <SearchBar handleSearch={handleQuerySearch} query={query} />

          <Button className="mx-2" onClick={updateProduct}>
            Search
          </Button>
          <Button className="mx-2 bg-red-500" type="button" onClick={reset}>
            Reset
          </Button>
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
