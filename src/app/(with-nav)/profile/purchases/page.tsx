import MyPurchases from "@/app/(with-nav)/profile/purchases/components/purchases";
import Navigation from "@/app/(with-nav)/profile/watchlist/components/Navigation";

export default function Purchases() {
  return (
    <div className="mx-auto mt-2 w-8/12">
      <Navigation name="Purchases" />
      <div className="mt-8">
        <MyPurchases />
      </div>
    </div>
  );
}
