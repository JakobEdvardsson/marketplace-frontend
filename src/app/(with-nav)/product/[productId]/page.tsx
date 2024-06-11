import Product from "@/app/(with-nav)/product/[productId]/Product";

export default function Page({
  params,
}: {
  readonly params: { productId: string };
}) {
  return (
    <div className="my-3 flex w-full justify-center px-4 sm:mx-auto sm:w-11/12 md:w-9/12 lg:w-8/12">
      <Product id={params.productId} />
    </div>
  );
}
