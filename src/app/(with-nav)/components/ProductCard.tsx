import { ProductCondition } from "@/utils/api-call-types";
import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";
import Image from "next/image";

export default function ProductCard(productInfo: ProductGetResponseDTO) {
  const createdAt: Date = new Date(productInfo.createdAt);

  return (
    <div className="m-2 flex h-96 w-9/12 flex-col items-center rounded-2xl bg-gray-200 p-2 shadow-md sm:h-48 sm:w-2/3  sm:flex-row">
      {/*Image*/}
      <Image
        src={productInfo.imageUrls[0]}
        className="mr-0 h-2/3 w-full rounded-2xl object-cover sm:mr-2 sm:h-full sm:w-2/5"
        alt="Product Image"
        width={1000}
        height={1000}
      />

      {/*Description*/}

      <div className="mt-2 flex h-auto w-full flex-col justify-around rounded-2xl bg-gray-100 p-3 sm:mt-0 sm:w-3/5">
        <div>
          <p className="truncate">{productInfo.name}</p>
          <p>
            {ProductCondition[productInfo.condition]
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </p>
          {productInfo.productionYear && (
            <p>Year: {productInfo.productionYear}</p>
          )}
          <b>{productInfo.price} kr</b>
        </div>

        <div className="flex h-full flex-row  flex-wrap items-end justify-between align-top">
          <p>
            {createdAt.getDay() +
              "/" +
              createdAt.getMonth() +
              " " +
              createdAt.getHours() +
              ":" +
              createdAt.getMinutes()}
          </p>
          <button type="button" className="rounded bg-red-400 px-4 py-2">
            See more
          </button>
        </div>
      </div>
    </div>
  );
}
