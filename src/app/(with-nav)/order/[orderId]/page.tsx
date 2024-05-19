"use client";

import { getBuyOrderById } from "@/utils/api-calls";
import { useEffect, useState } from "react";
import { OrderGetResponseDTO } from "@/types/endpoint-types-incoming";

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
      <h1>Your order</h1>
      {product && JSON.stringify(product)}
    </div>
  );
}
