import ProductSection from "@/app/(with-nav)/components/ProductSection";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense>
      <div className="mx-auto my-3 w-11/12 2md:w-8/12">
        <ProductSection />
      </div>
    </Suspense>
  );
}
