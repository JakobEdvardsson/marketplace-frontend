"use client";

import React from "react";
import { useCart } from "@/components/CartContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ShoppingCart() {
  const { items, removeFromCart } = useCart();

  return (
    <div className="mt-4 basis-3/4 rounded bg-white p-4">
      <div className="flex flex-row justify-between">
        <h1 className="py-2 text-3xl">Cart</h1>
        <p className="mt-10">Price</p>
      </div>
      <div className="border-b border-gray-300" />
      {items.length === 0 && (
        <p className="mb-5 mt-10 text-center text-2xl text-gray-600">
          Your cart is empty.
        </p>
      )}
      <ul>
        {items.map((item) => (
          <li
            key={item.productId}
            className="mb-4 flex items-center justify-between border-b border-gray-200 py-4 last:border-0"
          >
            <div className="group flex items-center">
              <Link href={`/product/${item.productId}`}>
                <div className="mr-4">
                  <Image
                    className=""
                    src={item.imageUrls[0]}
                    alt={item.name}
                    width={180}
                    height={180}
                  />
                </div>
              </Link>
              <div>
                <Link className="group" href={`/product/${item.productId}`}>
                  <div className="font-bold group-hover:underline">
                    {item.name}
                  </div>
                </Link>
                <div className="text-gray-600">
                  Category: {item.productCategory.name}
                </div>
                <Button
                  className="mt-2"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </Button>
              </div>
            </div>
            <div>
              <div className="font-bold">{item.price} kr</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
