"use client";

import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import { placeOrder } from "@/utils/api-calls";
import { OrderRegisteredResponseDTO } from "@/types/endpoint-types-incoming";
import { useState } from "react";
import Link from "next/link";

function SlimProductCard(props: {
  readonly productId: string,
  readonly productName: string,
  readonly productPrice: number,
  readonly isError: boolean
}) {
  return (
    <div
      className="mt-2 w-full flex flex-col items-center rounded-2xl bg-gray-50 p-3 ">
        <h1 className={props.isError ? "line-through" : ""}>{props.productName}</h1>
        {props.isError && (
          <p className="text-red-400">This item has already been purchased by another user!</p>)}
        <b>{props.productPrice} kr</b>

      <Button type="button">
        <Link href={`product/${props.productId}`}>
          More info
        </Link>
      </Button>
    </div>
  );
}

export default function Checkout() {
  const { items, nukeCart } = useCart();
  const [placedOrder, setPlacedOrder] = useState<OrderRegisteredResponseDTO>();

  const handleOrderClick = () => {
    placeOrder(items).then(response => {
      if (response.ok) {
        response.json().then(res => {
          nukeCart();
          const data = res as OrderRegisteredResponseDTO;
          setPlacedOrder(data);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="flex items-center justify-center">
      {placedOrder ? (
        <div className="flex flex-col items-center mt-10 mb-5">
          <Button className="w-36">
            <Link href={`/order/${placedOrder.orderId}`}>
              Receipt
            </Link>
          </Button>
            {
              placedOrder.orderItems.map(orderItem =>
                <SlimProductCard key={orderItem.productId} productId={orderItem.productId} productName={orderItem.productName}
                                 productPrice={orderItem.price} isError={orderItem.error} />)
            }
        </div>
      ) : items.length > 0 &&
        <Button className="mt-5" onClick={handleOrderClick}>
        Submit order
      </Button>
      }
    </div>
  );
}
