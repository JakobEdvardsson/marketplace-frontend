import Product from "@/app/(with-nav)/product/[productId]/Product";

export default function Page({
  params,
}: {
  readonly params: { productId: string };
}) {
  return (
    <div className="mx-auto my-3 flex w-full justify-center sm:w-11/12 md:w-9/12 lg:w-7/12">
      <Product id={params.productId} />
    </div>
  );
}
