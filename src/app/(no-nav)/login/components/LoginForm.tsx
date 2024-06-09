"use client";

import { login } from "@/utils/api-calls";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Link from "next/link";

export default function LoginForm() {
  const [userFound, setUserFound] = useState(true);
  const router = useRouter();
  const auth = useAuth();
  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    await login(username, password)
      .then((res) => {
        if (res.ok) {
          auth.login();
          router.push("/");
        } else {
          setUserFound(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      action={handleSubmit}
      className="relative flex flex-col items-center rounded-xl bg-white shadow-2xl shadow-gray-700"
    >
      <div className="m-7 flex w-5/6 items-center justify-between">
        <h2 className="font-black text-red-600">Plocket</h2>
        <h2 className="text-2xl font-semibold text-slate-700">University</h2>
      </div>
      <h1 className={`${userFound ? "" : "text-red-500"} text-2xl font-bold `}>
        {userFound ? "Login to your account" : "User not found"}
      </h1>
      <div className="m-5 h-14 w-5/6">
        <input
          required
          type="text"
          name="username"
          placeholder=""
          className={`peer m-auto size-full items-end rounded-t-lg border-b border-b-gray-400 bg-gray-200 pl-3 pt-3 outline-none duration-200  hover:bg-gray-300 hover:ease-in-out focus:border-b-2 focus:border-b-blue-500 ${userFound ? "" : "border-b-2 border-b-red-500 focus:border-b-red-500"}`}
        />
        <p className="pointer-events-none absolute top-40 ml-3 font-semibold text-gray-500 duration-200 peer-focus:top-36 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:ease-in-out peer-[&:not(:placeholder-shown)]:top-36 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:peer-focus:text-blue-500">
          Username*
        </p>
        <p className="m-1 text-xs text-gray-500">*Required field</p>
      </div>
      <div className="relative m-5 h-14 w-5/6">
        <input
          required
          type="password"
          name="password"
          placeholder=""
          className={`peer m-auto size-full rounded-t-lg border-b border-b-gray-400 bg-gray-200 pl-3 pt-3 outline-none duration-200 hover:bg-gray-300 hover:ease-in-out focus:border-b-2 focus:border-b-blue-500 ${userFound ? "" : "border-b-2 border-b-red-500 focus:border-b-red-500"}`}
        />
        <p className="pointer-events-none absolute top-5 ml-3 font-semibold text-gray-500 duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:ease-in-out peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:peer-focus:text-blue-500">
          Password*
        </p>
        <p className="m-1 text-xs text-gray-500">*Required field</p>
      </div>
      <p className="mt-5 w-5/6 text-sm">
        Marketplace does not works in partnership with anybody. You need an
        account to continue. You can use the same account details on all
        websites, so it will be easier for us
      </p>
      <button
        type="submit"
        className="bottom-10 my-6 mt-8 h-10 w-5/6 rounded bg-blue-500 font-semibold text-white duration-200 hover:bg-blue-600 hover:drop-shadow-xl hover:ease-in-out"
      >
        Login
      </button>
      <p className="pb-5 text-sm text-gray-600">
        No account?
        <Link href="/register" className="ml-1 hover:underline">
          Register here!
        </Link>
      </p>
    </form>
  );
}
