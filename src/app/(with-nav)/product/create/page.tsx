import CreateProduct from "@/app/(with-nav)/product/create/CreateProduct";

export default function Page() {
  return (
    <div className="size-full bg-gray-100 pt-10">
      <CreateProduct />
      <div className="fixed right-1/4 top-36">
        <h1 className="text-2xl font-bold">Product</h1>
        <p className="text-lg">Create a new product</p>
      </div>
    </div>
  );
}
