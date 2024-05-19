import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductCardSlim(props: {
  readonly productId: string,
  readonly productName: string,
  readonly productPrice: number,
  readonly isError: boolean
}) {
  return (
    <div
      className="mx-auto mt-2 flex w-1/3 flex-col items-center justify-center rounded-2xl bg-gray-50 p-3">
      <h1 className={props.isError ? "line-through" : ""}>{props.productName}</h1>
      {props.isError && (
        <p className="text-red-400">This item has already been purchased by another user!</p>)}
      <b>{props.productPrice} kr</b>

      <Button type="button">
        <Link href={`/product/${props.productId}`}>
          More info
        </Link>
      </Button>
    </div>
  );
}