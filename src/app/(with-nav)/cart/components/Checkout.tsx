"use client";

import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import { placeOrder } from "@/utils/api-calls";
import { OrderRegisteredResponseDTO } from "@/types/endpoint-types-incoming";
import { useState } from "react";
import Link from "next/link";

function SlimProductCard(props: {
  readonly productId: string;
  readonly productName: string;
  readonly productPrice: number;
  readonly isError: boolean;
}) {
  return (
    <div className="mt-2 flex w-full flex-col items-center rounded-2xl bg-gray-50 p-3 ">
      <h1 className={props.isError ? "line-through" : ""}>
        {props.productName}
      </h1>
      {props.isError && (
        <p className="text-red-400">
          This item has already been purchased by another user!
        </p>
      )}
      <b>{props.productPrice} kr</b>

      <Button type="button">
        <Link href={`product/${props.productId}`}>More info</Link>
      </Button>
    </div>
  );
}

export default function Checkout() {
  const currencyFormat = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  });

  const { items, nukeCart } = useCart();
  const [placedOrder, setPlacedOrder] = useState<OrderRegisteredResponseDTO>();

  const handleOrderClick = () => {
    placeOrder(items)
      .then((response) => {
        if (response.ok) {
          response.json().then((res) => {
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
    <div className="self-center rounded">
      {placedOrder ? (
        <div className="mb-5 mt-10 flex flex-col items-center bg-white">
          <Button className="w-36">
            <Link href={`/order/${placedOrder.orderId}`}>Receipt</Link>
          </Button>
          {placedOrder.orderItems.map((orderItem) => (
            <SlimProductCard
              key={orderItem.productId}
              productId={orderItem.productId}
              productName={orderItem.productName}
              productPrice={orderItem.price}
              isError={orderItem.error}
            />
          ))}
        </div>
      ) : (
        items.length > 0 && (
          <div className="my-5 flex flex-col rounded bg-white p-4">
            <p className="mb-4">
              Subtotal ({items.length}
              {items.length > 1 ? (
                <span> items</span>
              ) : (
                <span> item</span>
              )}):{" "}
              <span className="font-bold">
                {currencyFormat.format(
                  items.reduce((sum, item) => sum + item.price, 0),
                )}
              </span>
            </p>
            <Button
              className="self-center bg-amber-300 text-black hover:bg-amber-400"
              onClick={handleOrderClick}
            >
              Submit order
            </Button>
          </div>
        )
      )}
    </div>
  );
}
