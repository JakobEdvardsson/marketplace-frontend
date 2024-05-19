"use client";

import { getBuyOrderById } from "@/utils/api-calls";
import { useEffect, useState } from "react";
import { OrderGetResponseDTO } from "@/types/endpoint-types-incoming";
import ProductCardSlim from "@/app/(with-nav)/order/components/ProductCardSlim";

export default function Page({
                               params
                             }: {
  readonly params: { orderId: string };
}) {
  const [product, setProduct] = useState<OrderGetResponseDTO>();

  useEffect(() => {
    getBuyOrderById(params.orderId).then(response => {
      if (response.ok) {
        response.json().then(res => {
          const data = res as OrderGetResponseDTO;
          setProduct(data);
        });
      }
    });
  }, [params.orderId]);

  return (
    <div>
      <h1 className="my-5 text-center text-3xl font-medium">Your order</h1>
      {product ? (product.orderItems.map(item => (
          <ProductCardSlim key={item.productId} isError={false} productId={item.productId} productName={item.productName} productPrice={item.price}/>
        ))) : null}
    </div>
  );
}
