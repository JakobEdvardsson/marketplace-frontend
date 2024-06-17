import Product from "@/app/(with-nav)/product/[productId]/Product";
import { Suspense } from "react";
import Image from "next/image";
import { Metadata } from "next";
import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";
import { getProductById } from "@/utils/api-calls";

type Props = {
  readonly params: { productId: string };
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.productId);

  return {
    title: `${product ? product.name : "Product"} | Marketplace`,
    description: product?.description,
    openGraph: {
      images: product?.imageUrls[0],
    },
  };
}

export default async function Page({ params }: Props) {
  return (
    <div className="mx-auto my-3 w-11/12 2md:w-8/12">
      <Suspense fallback={<ProductSkeleton />}>
        <Product productId={params.productId} />
      </Suspense>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-2 flex space-x-2">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
        <Image src="/images/arrow.svg" alt="arrow" width="8" height="8" />
        <div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
      </div>

      <div className="flex w-full bg-gray-200">
        <div className="h-64 w-full animate-pulse rounded bg-gray-300" />
      </div>

      <div className="mt-3 h-8 w-3/4 animate-pulse rounded bg-gray-300" />

      <div className="w-full">
        <div className="mt-3 h-8 w-1/4 animate-pulse rounded bg-gray-300" />
      </div>

      <div className="flex flex-wrap justify-start">
        <div className="w-fit">
          <div className="mt-3 h-6 w-32 animate-pulse rounded bg-gray-300" />
        </div>
        <div className="w-fit">
          <div className="mt-3 h-6 w-40 animate-pulse rounded bg-gray-300" />
        </div>
        <div className="w-fit">
          <div className="mt-3 h-6 w-24 animate-pulse rounded bg-gray-300" />
        </div>
      </div>

      <div className="mt-5">
        <div className="h-6 w-1/4 animate-pulse rounded bg-gray-300" />
        <div className="mt-2 h-20 w-full animate-pulse rounded bg-gray-300" />
      </div>

      <div className="my-5 h-0.5 w-full bg-gray-300 dark:bg-slate-800" />

      <div className="w-full">
        <div className="mt-2 flex items-center">
          <div className="size-12 animate-pulse rounded-full bg-gray-300" />
          <div className="ml-2 h-6 w-1/2 animate-pulse rounded bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
