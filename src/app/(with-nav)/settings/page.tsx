import MyUserProfile from "@/app/(with-nav)/settings/components/MyUserProfile";
import PasswordChangeForm from "@/app/(with-nav)/settings/components/PasswordChangeForm";
import Navigation from "@/app/(with-nav)/profile/watchlist/components/Navigation";

export default function Page() {
  return (
    <div>
      <div className="mx-auto mt-2 w-8/12 px-2">
        <Navigation name="Profile" />
        <div className="mt-8">
          <MyUserProfile />
        </div>
      </div>
      <div className="sm:w-4/5 md:w-2/3 lg:w-1/3 mx-auto mt-10 px-2">
        <PasswordChangeForm />
      </div>
    </div>
  );
}
