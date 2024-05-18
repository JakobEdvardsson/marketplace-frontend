"use client";

import React, { useEffect, useState } from "react";
import { get20LatestProducts } from "@/utils/api-calls";
import { CartProductDTO, useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductGetAllResponseDTO } from "@/types/endpoint-types-incoming";

export function LatestProducts() {
  const [products, setProducts] = useState<CartProductDTO[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await get20LatestProducts();
        if (response.ok) {
          const data = (await response.json()) as ProductGetAllResponseDTO;
          setProducts(data.products);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchTopProducts();
  }, []);

  const handleAddToCart = (product: CartProductDTO) => {
    addToCart(product);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {products.map((product) => (
          <li key={product.productId}>
            <div>
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                width={100}
                height={100}
              />
              <div>{product.name}</div>
              <div>${product.price}</div>
              <Button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
