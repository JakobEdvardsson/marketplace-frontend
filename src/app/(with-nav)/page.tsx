import { get20LatestProducts } from "@/utils/api-calls";
import { ProductGetAllResponseDTO } from "@/types/endpoint-types-incoming";
import ProductCard from "@/app/(with-nav)/components/ProductCard";

async function getProducts() {
  const productsResponse = await get20LatestProducts();
  return (await productsResponse.json()) as ProductGetAllResponseDTO;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex w-full flex-col items-center">
      {products.products.map((product) => (
        <ProductCard
          key={product.productId}
          name={product.name}
          description={product.description}
          price={product.price}
          productionYear={product.productionYear}
          createdAt={new Date(product.createdAt).toISOString()}
          condition={product.condition}
          buyer={product.buyer}
          color={product.color}
          imageUrls={product.imageUrls}
          productCategory={product.productCategory}
          productId={product.productId}
          seller={product.seller}
          status={product.status}
        />
      ))}
    </div>
  );
}
