"use client";

import CategorySelector from "@/app/(with-nav)/components/CategorySelector";
import SearchBar from "@/app/(with-nav)/components/SearchBar";
import ProductCard from "@/app/(with-nav)/components/ProductCard";
import { get20LatestProducts } from "@/utils/api-calls";
import { ProductGetAllResponseDTO } from "@/types/endpoint-types-incoming";
import { useEffect, useState } from "react";

export default function ProductSection() {
  const [products, setProducts] = useState<
    ProductGetAllResponseDTO | undefined
  >();

  useEffect(() => {
    get20LatestProducts()
      .then((response) => {
        response.json().then((products) => {
          setProducts(products);
        });
      })
      .catch((_) => console.log(_));
  }, []);

  const updateProduct = (products: ProductGetAllResponseDTO) => {
    setProducts(products);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-3 w-4/5 rounded-3xl bg-gray-100 ">
        <div className="py-10 text-center">
          <p
            className="text-4xl"
            style={{ fontFamily: "Roboto", fontWeight: "bold", color: "red" }}
          >
            Marketplace
          </p>
          <CategorySelector setProducts={updateProduct} />
          <SearchBar setProducts={updateProduct} />
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
