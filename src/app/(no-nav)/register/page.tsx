import RegisterForm from "@/app/(no-nav)/register/RegisterForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className=" flex h-screen w-screen items-center bg-gray-100 align-middle">
      <div className="relative m-auto flex w-3/4">
        <div className="mx-auto w-2/5">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
