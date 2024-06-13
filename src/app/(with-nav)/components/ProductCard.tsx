import { ProductCondition } from "@/utils/api-call-types";
import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductCard(props: {
  readonly product: ProductGetResponseDTO;
}) {
  const { product } = props;
  const createdAt: Date = new Date(product.createdAt);

  return (
    <div className="m-2 flex h-96 w-9/12 flex-col items-center rounded-2xl bg-gray-100 p-2 shadow-md sm:h-48 sm:w-2/3  sm:flex-row">
      {/*Image*/}
      <Image
        src={product.imageUrls[0] || "/images/emptyImage.jpg"}
        className="mr-0 h-2/3 w-full rounded-2xl object-contain sm:mr-2 sm:h-full sm:w-2/5"
        alt="Product Image"
        width={1000}
        height={1000}
      />

      {/*Description*/}

      <div className="mt-2 flex h-auto w-full flex-col justify-around rounded-2xl bg-gray-50 p-3 sm:mt-0 sm:w-3/5">
        <div>
          <p className="truncate">{product.name}</p>
          <p>
            {ProductCondition[product.condition]
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </p>
          {product.productionYear ? (
            <p>Year: {product.productionYear}</p>
          ) : null}
          <b>{product.price} kr</b>
        </div>

        <div className="flex h-full flex-row  flex-wrap items-end justify-between align-top">
          <p>
            {createdAt.getDate() +
              "/" +
              (createdAt.getMonth() + 1) +
              " " +
              createdAt.getHours() +
              ":" +
              createdAt.getMinutes()}
          </p>

          <Link href={`/product/${product.productId}`}>
            <Button type="button">See more!</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
