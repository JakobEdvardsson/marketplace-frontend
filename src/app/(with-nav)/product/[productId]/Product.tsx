"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProductColor, ProductCondition } from "@/utils/api-call-types";
import { getProductById } from "@/utils/api-calls";
import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";

export default function Product({ id }: { readonly id: string }) {
  const [product, setProduct] = useState<ProductGetResponseDTO | undefined>();

  useEffect(() => {
    getProductById(id).then((response) => {
      response.json().then((data: ProductGetResponseDTO) => {
        setProduct(data);
      });
    });
  }, [id]);

  console.log(product?.productId);

  const renderFiles = () => {
    if (product?.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls.map((url) => (
        <div key={product.name} className="mx-auto h-72 w-full shrink-0 pr-2">
          <Image
            src={url}
            alt={product.name}
            className="size-full rounded object-cover"
            width={100}
            height={100}
          />
        </div>
      ));
    }

    return (
      <div className="mx-auto flex h-72 w-full cursor-default items-center justify-center rounded border-2 border-dotted border-gray-300 bg-white">
        <span className="text-gray-500">No pics :(</span>
      </div>
    );
  };

  return (
    <div className="fixed right-64 top-20 w-1/4 rounded-xl bg-white p-2">
      <div className=" mx-auto flex w-11/12 overflow-x-auto">
        {renderFiles()}
      </div>

      <div className="w-full">
        <h1
          className={` mx-auto mt-3 w-10/12 cursor-default text-2xl font-bold ${product?.name ? "" : "text-gray-300"}`}
        >
          {product?.name === "" ? "No name" : product?.name}
        </h1>
      </div>

      <div className="w-full">
        <h1
          className={`mx-auto w-10/12 cursor-default text-sm text-gray-400 ${product?.productCategory ? "" : "text-gray-300"}`}
        >
          {product?.productCategory
            ? "Category: " + product.productCategory
            : ""}
        </h1>
      </div>

      <div className="w-full">
        <h1 className="mx-auto w-10/12 cursor-default text-sm text-gray-400">
          {product?.condition
            ? "Condition: " + ProductCondition[product.condition]
            : ""}
        </h1>
      </div>

      <div className="w-full">
        <h1 className="mx-auto w-10/12 cursor-default text-sm text-gray-400">
          {product?.color ? "Color: " + ProductColor[product.color] : ""}
        </h1>
      </div>

      <div className="w-full">
        <h1 className="mx-auto w-10/12 cursor-default text-sm text-gray-400">
          {product?.productionYear
            ? "Production year: " + product.productionYear
            : ""}
        </h1>
      </div>

      <div className="w-full">
        <p
          className={`mx-auto my-3 w-10/12 cursor-default text-xl ${product?.price ? "" : "text-gray-300"}`}
        >
          {product?.price ? product.price + " kr" : "No price"}
        </p>
      </div>

      <div className="w-full">
        <h1 className="mx-auto w-11/12 cursor-default text-sm">
          {product?.description ? "Description: " : ""}
        </h1>
        <p className="mx-auto w-11/12 truncate text-pretty hover:text-clip">
          {product?.description ? product.description : ""}
        </p>
      </div>
    </div>
  );
}
