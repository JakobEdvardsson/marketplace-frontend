import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductCardSlim(props: {
  readonly productId: string;
  readonly productName: string;
  readonly productPrice: number;
  readonly isError: boolean;
}) {
  const currencyFormat = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  });

  return (
    <div className="flex w-full flex-col items-center bg-gray-200 p-3">
      <h1 className={props.isError ? "line-through" : ""}>
        {props.productName}
      </h1>
      {props.isError && (
        <p className="text-red-400">
          This item has already been purchased by another user!
        </p>
      )}
      <p className="font-bold">{currencyFormat.format(props.productPrice)}</p>

      <Button type="button">
        <Link href={`/product/${props.productId}`}>More info</Link>
      </Button>
    </div>
  );
}
