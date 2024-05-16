import { ProductCondition } from "@/utils/api-call-types";
import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";

export default function ProductCard(productInfo: ProductGetResponseDTO) {
  const createdAt: Date = new Date(productInfo.createdAt);

  return (
    <div className="flex h-96 w-1/2 flex-col items-center rounded-2xl bg-gray-200 p-2 shadow-2xl sm:h-48 sm:flex-row">
      {/*Image*/}
      <img
        src="https://wallpaperaccess.com/full/167767.jpg"
        className="mr-0  h-1/2 w-full flex-1 rounded-2xl object-cover sm:mr-2 sm:h-full"
      />

      {/*Description*/}

      <div className="mt-2 flex size-full flex-1 flex-col justify-around rounded-2xl bg-gray-100 p-3 sm:mt-0">
        <div>
          <p>{productInfo.name}</p>
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
