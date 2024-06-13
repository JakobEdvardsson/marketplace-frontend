import { ProductCondition } from "@/utils/api-call-types";
import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard(props: {
  readonly product: ProductGetResponseDTO;
}) {
  const { product } = props;
  const createdAt: Date = new Date(product.createdAt);

  return (
    <Link
      className="group flex h-96 w-11/12 flex-col items-center border-b py-4 last:border-b-0 sm:h-48 sm:flex-row 2md:w-8/12"
      href={`/product/${product.productId}`}
    >
      {/*Image*/}
      <Image
        src={product.imageUrls[0] || "/images/emptyImage.jpg"}
        className="h-2/3 w-full rounded bg-gray-200 object-contain sm:h-full sm:w-2/5"
        alt="Product Image"
        width={1000}
        height={1000}
      />

      {/*Description*/}
      <div className="mt-2 flex h-auto w-full flex-col justify-around p-3 sm:mt-0 sm:w-3/5">
        <div>
          <h1 className="truncate group-hover:underline">{product.name}</h1>
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

        <div className="flex h-full flex-row flex-wrap items-end justify-between align-top">
          <p>
            {createdAt.getDate() +
              "/" +
              (createdAt.getMonth() + 1) +
              " " +
              createdAt.getHours() +
              ":" +
              createdAt.getMinutes()}
          </p>
        </div>
      </div>
    </Link>
  );
}
