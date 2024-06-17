"use client";

import { getBuyOrderById } from "@/utils/api-calls";
import { useEffect, useState } from "react";
import { OrderGetResponseDTO } from "@/types/endpoint-types-incoming";
import ProductCardSlim from "@/app/(with-nav)/order/components/ProductCardSlim";

export default function Page({
  params,
}: {
  readonly params: { orderId: string };
}) {
  const [product, setProduct] = useState<OrderGetResponseDTO>();

  useEffect(() => {
    getBuyOrderById(params.orderId)
      .then((response) => {
        if (response.ok) {
          response.json().then((res) => {
            const data = res as OrderGetResponseDTO;
            setProduct(data);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.orderId]);

  return (
    <div className="mx-auto w-11/12 2md:w-8/12">
      <h1 className="my-5 text-center text-3xl font-medium">Your order</h1>
      {product
        ? product.orderItems.map((item) => (
            <div key={item.productId} className="">
              <ProductCardSlim
                isError={false}
                productId={item.productId}
                productName={item.productName}
                productPrice={item.price}
              />
            </div>
          ))
        : null}
    </div>
  );
}
