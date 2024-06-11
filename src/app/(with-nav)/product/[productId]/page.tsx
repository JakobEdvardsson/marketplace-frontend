import Product from "@/app/(with-nav)/product/[productId]/Product";

export default function Page({
  params,
}: {
  readonly params: { productId: string };
}) {
  return (
    <div className="mx-auto my-3 flex w-11/12 justify-center sm:px-0 2md:w-8/12">
      <Product id={params.productId} />
    </div>
  );
}
