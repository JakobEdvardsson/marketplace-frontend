import MyUserProfile from "@/app/(with-nav)/settings/components/MyUserProfile";
import PasswordChangeForm from "@/app/(with-nav)/settings/components/PasswordChangeForm";

export default function Page() {
  return (
    <div>
      <div className="mx-auto mt-10 px-2 sm:w-4/5">
        <MyUserProfile />
      </div>
      <div className="mx-auto mt-10 px-2 sm:w-4/5 md:w-2/3 lg:w-1/3">
        <PasswordChangeForm />
      </div>
    </div>
  );
}
