import { ShoppingCart } from "@/app/(with-nav)/cart/components/ShoppingCart";
import Checkout from "@/app/(with-nav)/cart/components/Checkout";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <Checkout />
      <ShoppingCart />
    </div>
  );
}
