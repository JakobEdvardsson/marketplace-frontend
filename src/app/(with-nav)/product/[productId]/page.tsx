import Product from "@/app/(with-nav)/product/[productId]/Product";
import { Metadata } from "next";
import { getProductById } from "@/utils/api-calls";
import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";

type Props = {
  readonly params: { productId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product: ProductGetResponseDTO = await getProductById(
    params.productId,
  ).then((res) => res.json());

  return {
    title: `${product.name} | Marketplace`,
    description: "",
  };
}

export default function Page({ params }: Props) {
  return (
    <div className="mx-auto my-3 flex w-11/12 justify-center 2md:w-8/12">
      <Product id={params.productId} />
    </div>
  );
}
