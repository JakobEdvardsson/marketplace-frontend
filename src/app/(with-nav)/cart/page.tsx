import { ShoppingCart } from "@/app/(with-nav)/cart/components/ShoppingCart";
import Checkout from "@/app/(with-nav)/cart/components/Checkout";
import React from "react";

export default function Page() {
  return (
    <div className="mx-auto flex w-8/12 flex-col ">
      <ShoppingCart />
      <Checkout />
    </div>
  );
}
