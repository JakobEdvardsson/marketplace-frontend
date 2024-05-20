"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ProductColor, ProductCondition } from "@/utils/api-call-types";
import { useCart } from "@/components/CartContext";
import { useProductById, useProfile } from "@/utils/api-calls-swr";

export default function Product({ id }: { readonly id: string }) {
  const { addToCart } = useCart();

  const { data: product } = useProductById(id);

  const { data: seller } = useProfile(product ? product.seller : null);

  const [openImage, setOpenImage] = useState(false);

  const handleImageClick = () => {
    setOpenImage(!openImage);
  };

  const handleAddToCart = () => {
    if (product) addToCart(product);
  };

  const renderFiles = () => {
    if (product?.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls.map((url) => (
        <div
          key={product.name}
          className="mx-auto h-[60vh] w-full shrink-0 pr-2"
        >
          <Image
            src={url}
            alt={product.name}
            className="size-full rounded object-cover"
            width={100}
            height={100}
            onClick={handleImageClick}
          />
        </div>
      ));
    }

    return (
      <div className="mx-auto flex size-full cursor-default items-center justify-center rounded border-2 border-dotted border-gray-300 bg-white">
        <span className="text-gray-500">No pics :(</span>
      </div>
    );
  };

  return (
    <div className="size-full p-10">
      <div
        className={`${openImage ? "mx-auto flex w-11/12 overflow-x-auto lg:w-2/4" : "mx-auto flex w-11/12 overflow-x-auto lg:w-2/4"}`}
      >
        {renderFiles()}
      </div>

      <div className="w-full">
        <h1 className="mx-auto mt-3 w-fit cursor-default text-3xl font-black">
          {product?.name}
        </h1>
      </div>

      <div className="w-full">
        <p className="mx-auto mt-3 w-6/12 cursor-default rounded border border-gray-300 p-1">
          {product ? "Price: " + product.price + " kr" : ""}
        </p>
      </div>

      <div className="w-full">
        <p className="mx-auto mt-3 w-6/12 cursor-default rounded border border-gray-300 p-1">
          {product ? "Category: " + product.productCategory.name : ""}
        </p>
      </div>

      <div className="w-full">
        <h1 className="mx-auto mt-3 w-6/12 cursor-default rounded border border-gray-300 p-1">
          {product?.condition
            ? "Condition: " + ProductCondition[product.condition]
            : ""}
        </h1>
      </div>

      <div className="w-full">
        <h1 className="mx-auto mt-3 w-6/12 cursor-default rounded border border-gray-300 p-1">
          {product?.color ? "Color: " + ProductColor[product.color] : ""}
        </h1>
      </div>

      <div className="w-full">
        <h1 className="mx-auto mt-3 w-6/12 cursor-default rounded border border-gray-300 p-1">
          {product?.productionYear
            ? "Production year: " + product.productionYear
            : ""}
        </h1>
      </div>

      <div className="mx-auto mt-3 w-6/12 cursor-default rounded border border-gray-300 p-1">
        <h1 className="mx-auto w-full cursor-default text-sm">
          {product?.description ? "Description: " : ""}
        </h1>
        <p className="mx-auto w-full truncate text-pretty hover:text-clip">
          {product?.description ? product.description : ""}
        </p>
      </div>

      <div className="w-full">
        <p className="mx-auto mt-3 w-6/12 cursor-default rounded border border-gray-300 p-1">
          {seller &&
            `Seller: ${seller.firstName} ${seller.lastName} (${seller.username})`}
        </p>
      </div>

      <div className="m-5 mx-auto w-5/12">
        <button
          type="button"
          className="mx-auto mt-2 h-10 w-full rounded bg-blue-600 font-semibold text-white duration-200 hover:bg-blue-500 hover:drop-shadow-xl hover:ease-in-out"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
