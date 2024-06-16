import { ShoppingCart } from "@/app/(with-nav)/cart/components/ShoppingCart";
import Checkout from "@/app/(with-nav)/cart/components/Checkout";
import React from "react";

export default function Page() {
  return (
    <div className="mx-auto flex w-2/3 flex-col mobile-br:w-full ">
      <ShoppingCart />
      <Checkout />
    </div>
  );
}
