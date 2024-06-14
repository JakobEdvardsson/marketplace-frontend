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
      className="group flex h-96 w-full flex-col sm:h-48 sm:flex-row"
      href={`/product/${product.productId}`}
    >
      <Image
        src={product.imageUrls[0] || "/images/emptyImage.jpg"}
        className="h-2/3 w-full rounded bg-gray-200 object-contain sm:h-full sm:w-2/5"
        alt="Product Image"
        width={1000}
        height={1000}
      />
      <div className="mt-2 flex h-auto w-full flex-col sm:mt-0 sm:w-3/5 sm:pl-3">
        <div className="flex justify-between">
          <a href="#">
            <h1>{product.productCategory.name}</h1>
          </a>
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

        <div className="group-hover:underline">
          <h1>{product.name}</h1>
        </div>

        <div className="flex grow flex-row" />

        <div className="flex justify-between">
          <p className="text-lg font-medium">{product.price} kr</p>
        </div>
      </div>
    </Link>
  );
}
