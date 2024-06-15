import MyAds from "@/app/(with-nav)/profile/myads/MyAds";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My ads | Marketplace",
  description: "Marketplace - my ads",
};

export default function Page() {
  return (
    <div className="flex size-full justify-center bg-gray-100">
      <MyAds />
    </div>
  );
}
