"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { testAuth } from "@/utils/api-calls";
import { useState } from "react";

export default function Navbar() {
  const { loggedIn } = useAuth();
  const [username, setUsername] = useState("");

  if (loggedIn) {
    testAuth().then((response) => {
      response.json().then((result) => {
        setUsername(result.username);
      });
    });
  }

  const router = useRouter();
  const handleClickLogin = () => {
    router.push("/login");
  };

  const handleClickCart = () => {
    router.push("/cart");
  };

  const handleClickPostAd = () => {
    router.push("/product");
  };

  const handleClickSearchAds = () => {
    router.push("/");
  };

  const handleClickProfile = () => {
    router.push("/profile");
  };

  const renderLinks = () =>
    loggedIn ? (
      <div className="flex h-14 w-full bg-white shadow-md drop-shadow-md">
        <div className="mx-auto flex w-8/12 flex-row items-center justify-between">
          <Link className="text-3xl font-black text-red-600" href="/">
            Plocket
          </Link>
          <div className="flex items-center justify-end">
            <Button
              className="bg-blue-500 pr-6 hover:bg-blue-400"
              size="sm"
              onClick={handleClickPostAd}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-2 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Post ad
            </Button>
            <Button
              variant="link"
              className="border-white"
              onClick={handleClickSearchAds}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              Ads
            </Button>
            <Button
              variant="link"
              className="border-white"
              onClick={handleClickCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Cart
            </Button>
            <Button
              variant="link"
              className="mr-4 border-white"
              onClick={handleClickProfile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              {username}
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex h-14 w-full bg-white shadow-md drop-shadow-md">
        <div className="mx-auto flex w-8/12 flex-row items-center justify-between">
          <Link className="text-3xl font-black text-red-600" href="/">
            Plocket
          </Link>
          <div className="flex items-center justify-end">
            <Button className="mr-8" onClick={handleClickLogin}>
              Login
            </Button>
          </div>
        </div>
      </div>
    );

  return renderLinks();
}
