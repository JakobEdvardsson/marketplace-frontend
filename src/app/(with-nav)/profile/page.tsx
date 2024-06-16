import MyProfile from "@/app/(with-nav)/profile/components/Profile";
import Logout from "@/app/(with-nav)/profile/components/Logout";
import MyMarketplace from "@/app/(with-nav)/profile/components/MyMarketplace";

export default function Profile() {
  return (
    <div className="mx-auto mt-5 flex w-11/12 flex-col 2md:w-8/12">
      <div>
        <MyProfile />
      </div>
      <div className="border-b">
        <MyMarketplace />
      </div>
      <div className="mt-5">
        <Logout />
      </div>
    </div>
  );
}
