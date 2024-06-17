import Image from "next/image";
import { ProductColor, ProductCondition } from "@/utils/api-call-types";
import Link from "next/link";
import AddToCartButton from "@/app/(with-nav)/product/[productId]/AddToCartButton";
import ProductSeller from "@/app/(with-nav)/product/[productId]/ProductSeller";
import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";
import { getProductById } from "@/utils/api-calls";
import { PostedDate } from "@/app/(with-nav)/product/[productId]/PostedDate";

type Props = {
  readonly productId: string;
};

async function getProduct(
  productId: string,
): Promise<ProductGetResponseDTO | undefined> {
  const product: ProductGetResponseDTO = await getProductById(productId)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });

  if (product) {
    return product;
  }

  return undefined;
}

export default async function Product(props: Props) {
  const currencyFormat = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  });

  const product = await getProduct(props.productId);

  const renderFiles = () => {
    if (!product || !product.imageUrls || product.imageUrls.length === 0) {
      return null;
    }

    return product.imageUrls.map((url) => (
      <div key={product.name} className="mx-auto h-[60vh] w-full shrink-0 pr-2">
        <Image
          priority
          src={url}
          alt={product.name}
          className="size-full rounded object-contain"
          width={1000}
          height={1000}
        />
      </div>
    ));
  };

  return product ? (
    <div className="w-full">
      <div className="mb-2 flex space-x-2">
        <Link className="text-sm hover:underline" href="/">
          All categories
        </Link>
        <Image src="/images/arrow.svg" alt="arrow" width="8" height="8" />
        <p className="text-sm text-gray-500 first-letter:uppercase">
          {product.productCategory.name}
        </p>
      </div>

      <div className="flex w-full overflow-x-auto bg-gray-200">
        {renderFiles()}
      </div>

      <h1 className="mt-3 text-3xl">{product.name}</h1>

      <div className="w-full">
        <p className="mt-3 text-3xl font-bold">
          {currencyFormat.format(product.price)}
        </p>
      </div>

      <div className="flex flex-wrap justify-start">
        <div className="w-fit">
          <h1 className="mr-2 mt-3 rounded border border-gray-300 p-1">
            Condition:{" "}
            {ProductCondition[product.condition]
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h1>
        </div>
        {product.productionYear && product.productionYear !== 0 ? (
          <h1 className="mr-2 mt-3 rounded border border-gray-300 p-1">
            {"Production year: " + product.productionYear}
          </h1>
        ) : null}
        {product.color !== undefined &&
        product.color !== null &&
        product.color !== 0 ? (
          <div className="w-fit">
            <h1 className="mt-3 rounded border border-gray-300 p-1">
              {"Color: " +
                ProductColor[product.color]
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
            </h1>
          </div>
        ) : null}
      </div>

      <AddToCartButton product={product} />

      <div className="mt-5">
        <h1 className="text-xl font-semibold">Description</h1>
        <div className="mt-2 w-full whitespace-pre-wrap font-light">
          {product.description}
        </div>
        <div className="mt-7 flex text-sm text-gray-500">
          <PostedDate createdAt={product.createdAt} />
          <div className="ml-1 first-letter:uppercase">
            <Link
              className="text-blue-500"
              href={`/?category=${product.productCategory.name}`}
            >
              {product.productCategory.name}
            </Link>
          </div>
        </div>
      </div>

      <div className="my-5 h-0.5 w-full shrink-0 bg-gray-300 dark:bg-slate-800" />

      <div className="w-full">
        <h1 className="text-lg font-semibold">Sold by:</h1>
        <div className="mt-2 flex items-center">
          <Image
            src="/images/default-profile-picture.svg"
            alt="Default Profile"
            width={50}
            height={50}
          />
          <div className="ml-2">
            <ProductSeller sellerId={product.seller} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
