import Product from "@/app/(with-nav)/product/[productId]/Product";

export default function Page({
  params,
}: {
  readonly params: { productId: string };
}) {
  return <Product id={params.productId} />;
}
