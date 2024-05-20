import MyProducts from "@/app/(with-nav)/profile/myads/MyProducts";
import Navigation from "@/app/(with-nav)/profile/watchlist/components/Navigation";

export default function Page() {
  return (
    <div className="mt-2 size-full bg-gray-100">
      <Navigation name="My Ads" />
      <div className="py-10">
        <MyProducts />
      </div>
    </div>
  );
}
