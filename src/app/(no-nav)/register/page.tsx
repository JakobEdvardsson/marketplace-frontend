import RegisterForm from "@/app/(no-nav)/register/RegisterForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className=" flex h-screen w-screen items-center bg-gray-100 align-middle">
      <div className="relative m-auto flex w-3/4">
        <div className="mx-auto w-2/5 animate-fadeIn">
          <RegisterForm />
          <p className="mx-auto mt-2 w-fit text-sm text-gray-600">
            Already have an account?
            <Link href="/login" className="ml-1 hover:underline">
              login here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
