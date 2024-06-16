"use client";

import { register } from "@/utils/api-calls";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();

  //TODO: Improve error handling (maybe?)
  const handleSubmit = async (formData: FormData) => {
    if (
      formData.get("date of birth") === null ||
      formData.get("first-name") === "" ||
      formData.get("last-name") === "" ||
      formData.get("username") === "" ||
      formData.get("email") === "" ||
      formData.get("password") === "" ||
      formData.get("confirm-password") === ""
    ) {
      //TODO: add error message
      console.log("All fields must be filled out");
      return;
    }

    if (formData.get("password") !== formData.get("confirm-password")) {
      //TODO: add error message
      setPasswordsMatch(false);
      console.log(
        formData.get("password") +
          " and " +
          formData.get("confirm-password") +
          " do not match",
      );
      return;
    }

    setPasswordsMatch(true);

    const credentials = {
      firstname: formData.get("first-name") as string,
      lastname: formData.get("last-name") as string,
      username: formData.get("username") as string,
      dateOfBirth: formData.get("date of birth") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const dateOfBirth = new Date(credentials.dateOfBirth);

    await register(
      credentials.firstname,
      credentials.lastname,
      credentials.email,
      credentials.username,
      credentials.password,
      dateOfBirth,
    )
      .then((res) => {
        if (res.ok) {
          router.push("/login");
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      action={handleSubmit}
      className="relative flex w-full flex-col items-center rounded-xl bg-white shadow-2xl shadow-gray-700"
    >
      <div className="m-7 flex w-5/6 items-center justify-between">
        <h2 className="font-black text-red-600">Plocket</h2>
        <h2 className="text-2xl font-semibold text-slate-700">University</h2>
      </div>
      <h1 className="text-2xl font-bold">Create account</h1>
      <div className="grid grid-cols-2 gap-1">
        <div className="m-5 mr-1 h-14 sm:mr-5">
          <input
            required
            type="text"
            name="first-name"
            placeholder=""
            className="peer m-auto size-full items-end rounded-t-lg border-b border-b-gray-400 bg-gray-200 pl-3 pt-3 outline-none duration-200  hover:bg-gray-300 hover:ease-in-out focus:border-b-2 focus:border-b-blue-500"
          />
          <p className="pointer-events-none absolute top-40 ml-3 font-semibold text-gray-500 duration-200 peer-focus:top-36 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:ease-in-out peer-[&:not(:placeholder-shown)]:top-36 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:peer-focus:text-blue-500">
            First name*
          </p>
          <p className="m-1 text-xs text-gray-500">*Required field</p>
        </div>
        <div className="relative m-5 ml-1 h-14 sm:ml-5">
          <input
            required
            type="text"
            name="last-name"
            placeholder=""
            className="peer m-auto size-full  rounded-t-lg border-b border-b-gray-400 bg-gray-200 pl-3 pt-3 outline-none duration-200 hover:bg-gray-300 hover:ease-in-out focus:border-b-2 focus:border-b-blue-500"
          />
          <p className="pointer-events-none absolute top-5 ml-3 font-semibold text-gray-500 duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:ease-in-out peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:peer-focus:text-blue-500">
            Last name*
          </p>
          <p className="m-1 text-xs text-gray-500">*Required field</p>
        </div>
        <div className="relative m-5 mr-1 h-14 sm:mr-5">
          <input
            required
            type="date"
            name="date of birth"
            className="peer m-auto size-full rounded-t-lg border-b border-b-gray-400 bg-gray-200 px-3 pt-3 outline-none duration-200 hover:bg-gray-300 hover:ease-in-out focus:border-b-2 focus:border-b-blue-500"
          />
          <p className="pointer-events-none absolute top-5 ml-3 font-semibold text-gray-500 duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:ease-in-out peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:peer-focus:text-blue-500">
            Date of birth*
          </p>
          <p className="m-1 text-xs text-gray-500">*Required field</p>
        </div>
        <div className="relative m-5 ml-1 h-14 sm:ml-5">
          <input
            required
            type="text"
            name="username"
            placeholder=""
            maxLength={18}
            className="peer m-auto size-full  rounded-t-lg border-b border-b-gray-400 bg-gray-200 pl-3 pt-3 outline-none duration-200 hover:bg-gray-300 hover:ease-in-out focus:border-b-2 focus:border-b-blue-500"
          />
          <p className="pointer-events-none absolute top-5 ml-3 font-semibold text-gray-500 duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:ease-in-out peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:peer-focus:text-blue-500">
            Username*
          </p>
          <p className="m-1 text-xs text-gray-500">*Required field</p>
        </div>
        <div className="relative col-span-2 col-start-1 m-5 h-14">
          <input
            required
            type="email"
            name="email"
            placeholder=""
            className="peer m-auto size-full  rounded-t-lg border-b border-b-gray-400 bg-gray-200 pl-3 pt-3 outline-none duration-200 hover:bg-gray-300 hover:ease-in-out focus:border-b-2 focus:border-b-blue-500"
          />
          <p className="pointer-events-none absolute top-5 ml-3 font-semibold text-gray-500 duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:ease-in-out peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:peer-focus:text-blue-500">
            Email*
          </p>
          <p className="m-1 text-xs text-gray-500">*Required field</p>
        </div>
        <div className="relative m-5 mr-1 h-14 sm:mr-5">
          <input
            required
            type="password"
            name="password"
            placeholder=""
            className={`peer m-auto size-full  rounded-t-lg border-b border-b-gray-400 bg-gray-200 pl-3 pt-3 outline-none duration-200 hover:bg-gray-300 hover:ease-in-out focus:border-b-2 focus:border-b-blue-500 ${passwordsMatch ? "" : "border-b-2 border-b-red-500 focus:border-b-red-500"}`}
          />
          <p
            className={`pointer-events-none absolute top-5 ml-3 font-semibold text-gray-500 duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:ease-in-out peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:peer-focus:text-blue-500 ${passwordsMatch ? "" : "peer-[&:not(:placeholder-shown)]:text-red-600"}`}
          >
            Password*
          </p>
          <p
            className={`m-1 text-xs text-gray-500 ${passwordsMatch ? "" : "text-red-500"}`}
          >
            {passwordsMatch ? "*Required field" : "Passwords are not matching"}
          </p>
        </div>
        <div className="relative m-5 ml-1 h-14 sm:ml-5">
          <input
            required
            type="password"
            name="confirm-password"
            placeholder=""
            className={`peer m-auto size-full  rounded-t-lg border-b border-b-gray-400 bg-gray-200 pl-3 pt-3 outline-none duration-200 hover:bg-gray-300 hover:ease-in-out focus:border-b-2 focus:border-b-blue-500 ${passwordsMatch ? "" : "border-b-2 border-b-red-500 focus:border-b-red-500"}`}
          />
          <p
            className={`pointer-events-none absolute top-5 ml-3 font-semibold text-gray-500 duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:ease-in-out peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:peer-focus:text-blue-500 ${passwordsMatch ? "" : "peer-[&:not(:placeholder-shown)]:text-red-600"}`}
          >
            Confirm password*
          </p>
          <p
            className={`m-1 text-xs text-gray-500 ${passwordsMatch ? "" : "text-red-500"}`}
          >
            {passwordsMatch ? "*Required field" : "Passwords are not matching"}
          </p>
        </div>
      </div>
      <div className="mt-5 flex w-5/6 justify-center">
        <button
          type="submit"
          className="h-10 w-5/6 rounded bg-blue-500 font-semibold text-white duration-200 hover:bg-blue-600 hover:drop-shadow-xl hover:ease-in-out"
        >
          Register account
        </button>
      </div>
      <p className="my-5 text-center text-gray-600">
        Already have an account?
        <Link href="/login" className="ml-1 hover:underline">
          Login here!
        </Link>
      </p>
    </form>
  );
}
