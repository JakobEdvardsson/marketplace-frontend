import Product from "@/app/(with-nav)/product/[productId]/Product";
import { Metadata } from "next";
import { getProductById } from "@/utils/api-calls";
import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";

type Props = {
  readonly params: { productId: string };
};

async function getProduct(
  productId: string,
): Promise<ProductGetResponseDTO | undefined> {
  const product: ProductGetResponseDTO = await getProductById(productId).then(
    (res) => res.json(),
  );

  if (product) {
    return product;
  }

  return undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.productId);
  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | Marketplace`,
    description: "",
  };
}

export default async function Page({ params }: Props) {
  const product = await getProduct(params.productId);

  return (
    <div className="mx-auto my-3 w-11/12 2md:w-8/12">
      <Product product={product} />
    </div>
  );
}
