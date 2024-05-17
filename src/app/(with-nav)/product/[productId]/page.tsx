export default function Page({
  params,
}: {
  readonly params: { productId: string };
}) {
  return <p>{params.productId}</p>;
}
