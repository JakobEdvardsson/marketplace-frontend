import MyAds from "@/app/(with-nav)/profile/myads/MyAds";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My ads | Marketplace",
  description: "Marketplace - my ads",
};

export default function Page() {
  return (
    <div className="mx-auto my-3 flex w-11/12 justify-center 2md:w-8/12">
      <MyAds />
    </div>
  );
}
