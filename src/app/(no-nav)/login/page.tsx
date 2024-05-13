import LoginForm from "@/app/(no-nav)/login/LoginForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center bg-gray-100 align-middle">
      <div className="relative m-auto flex w-3/4">
        <div className="w-3/5 bg-[url('/images/cat.jpg')] bg-cover text-white">
          <h1 className="m-10 text-4xl font-black text-red-600">Marketplace</h1>
          <h1 className="ml-10 w-2/3 text-5xl font-bold">
            Login for the best experience
          </h1>
          <p className="m-10 w-2/3 font-semibold">
            Marketplace uses your details to sale it with disparately low prices
            in India
          </p>
          <p className="m-10 mt-20">
            Have a problem?{" "}
            <Link
              href="https://motherfuckingwebsite.com/"
              className="underline"
            >
              Get help!
            </Link>
          </p>
        </div>
        <div className="w-2/5">
          <LoginForm />
          <p className="ml-10 text-sm text-gray-600">
            No account?
            <Link href="/register" className="ml-1 hover:underline">
              Register here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
