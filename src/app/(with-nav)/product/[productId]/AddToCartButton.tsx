"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";
import { useProfile } from "@/utils/api-calls-swr";
import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";
import { useAuth } from "@/components/AuthContext";

type Props = {
  readonly product: ProductGetResponseDTO;
};

export default function AddToCartButton(props: Props) {
  const { product } = props;
  const { addToCart, removeFromCart, items } = useCart();
  const { loggedIn } = useAuth();

  const { data: seller } = useProfile(product.seller);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleRemoveFromCart = () => {
    if (product) {
      removeFromCart(product.productId);
    }
  };

  return (
    <div>
      {product &&
      product.status === 0 &&
      loggedIn &&
      seller &&
      loggedIn !== seller.username ? (
        items.find((element) => element.productId === product.productId) ===
        undefined ? (
          <div className="mt-4">
            <Button
              className="bg-blue-500 hover:bg-blue-400"
              variant="default"
              onMouseDown={handleAddToCart}
            >
              Add to cart
            </Button>
          </div>
        ) : (
          <div className="mt-4">
            <Button variant="destructive" onMouseDown={handleRemoveFromCart}>
              Remove from cart
            </Button>
          </div>
        )
      ) : null}
    </div>
  );
}
