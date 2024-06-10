import MyProfile from "@/app/(with-nav)/profile/components/Profile";
import Logout from "@/app/(with-nav)/profile/components/Logout";
import MyMarketplace from "@/app/(with-nav)/profile/components/MyMarketplace";

export default function Profile() {
  return (
    <div className="mx-auto mt-5 w-8/12">
      <MyProfile />
      <MyMarketplace />
      <Logout />
    </div>
  );
}
