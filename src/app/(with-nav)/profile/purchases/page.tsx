import MyPurchases from "@/app/(with-nav)/profile/purchases/components/purchases";
import Navigation from "@/app/(with-nav)/profile/watchlist/components/Navigation";

export default function Purchases() {
  return (
    <div className="mx-auto my-3 flex w-11/12 flex-col justify-center 2md:w-8/12">
      <Navigation name="Purchases" />
      <div className="mt-5">
        <MyPurchases />
      </div>
    </div>
  );
}
