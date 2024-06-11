import ProductSection from "@/app/(with-nav)/components/ProductSection";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense>
      <ProductSection />
    </Suspense>
  );
}
