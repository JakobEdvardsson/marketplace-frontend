import {
  ProductCategoryDTO,
  ProductGetResponseDTO,
} from "@/types/endpoint-types-incoming";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard(props: {
  readonly product: ProductGetResponseDTO;
  readonly setCategory?: (_: ProductCategoryDTO) => void;
}) {
  const { product } = props;
  const createdAt: Date = new Date(product.createdAt);
  const currencyFormat = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  });

  return (
    <div className="relative flex h-96 w-full flex-col sm:h-48 sm:flex-row">
      <Image
        priority
        src={product.imageUrls[0] || "/images/emptyImage.jpg"}
        className="h-2/3 rounded bg-gray-200 object-contain sm:h-full sm:w-2/5"
        alt="Product Image"
        width={1000}
        height={1000}
      />
      <div className="mt-2 flex h-auto w-full flex-col sm:mt-0 sm:w-3/5 sm:pl-3">
        <div className="flex justify-between">
          <Link
            href="#"
            className="z-10 text-gray-600 hover:underline"
            onMouseDown={() => {
              if (props.setCategory) {
                props.setCategory(props.product.productCategory);
              }
            }}
          >
            <div className="first-letter:uppercase">
              {product.productCategory.name}
            </div>
          </Link>
          <p className="text-gray-500">
            {createdAt.getDate() +
              "/" +
              (createdAt.getMonth() + 1) +
              " " +
              createdAt.getHours() +
              ":" +
              createdAt.getMinutes()}
          </p>
        </div>

        <Link
          className="after:absolute after:inset-0 hover:underline"
          href={`/product/${product.productId}`}
        >
          {product.name}
        </Link>

        <div className="flex grow flex-row" />

        <div className="flex justify-between">
          <p className="text-lg font-bold">
            {currencyFormat.format(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}
