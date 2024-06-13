"use client";

import React from "react";
import { useCart } from "@/components/CartContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ShoppingCart() {
  const { items, removeFromCart } = useCart();

  return (
    <div className="flex justify-center">
      {items.length === 0 && (
        <p className="mb-5 mt-10 text-center text-2xl text-gray-600">
          Your cart is empty.
        </p>
      )}
      <ul>
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex items-center justify-between border-b border-gray-200 py-4"
          >
            <div className="flex items-center">
              <div className="mr-4">
                <Image
                  className=""
                  src={item.imageUrls[0]}
                  alt={item.name}
                  width={180}
                  height={180}
                />
              </div>
              <div>
                <div className="font-bold">{item.name}</div>
                <div className="text-gray-600">
                  Category: {item.productCategory.name}
                </div>
                <div className="text-gray-600">Price: {item.price} kr</div>
                <div className="text-gray-600">Condition: {item.condition}</div>
                <div className="text-gray-600">Status: {item.status}</div>
                <div className="text-gray-600">Seller: {item.seller}</div>
                <div className="text-gray-600">Buyer: {item.buyer}</div>
                <div className="text-gray-600">
                  Color: {item.color || "N/A"}
                </div>
                <div className="text-gray-600">
                  Production Year: {item.productionYear || "N/A"}
                </div>
                <div className="text-gray-600">
                  Created At: {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
            <div>
              <Button onClick={() => removeFromCart(item.productId)}>
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
