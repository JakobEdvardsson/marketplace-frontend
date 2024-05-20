"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { loggedIn } = useAuth();

  const authenticatedNavLinks = [
    { name: "Post ad", link: "/product" },
    { name: "Shopping cart", link: "/cart" },
  ];

  const anonymousNavLinks = [{ name: "Login", link: "/login" }];

  const navLinks = loggedIn ? authenticatedNavLinks : anonymousNavLinks;
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

  const renderLinks2 = () =>
    loggedIn ? (
      <div className="flex h-14 w-full bg-white shadow-md drop-shadow-md">
        <div className="mx-auto flex w-8/12 flex-row items-center justify-between">
          <Link className="ml-6 font-black text-red-600 lg:text-3xl" href="/">
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
            <Link href="/profile" className="">
              <Image
                src="/images/default-profile-picture.svg"
                alt="Default Profile"
                width={50}
                height={50}
              />
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex h-14 w-full items-center bg-white shadow-md drop-shadow-md">
        <div className="mx-auto w-8/12">
          <Link className="font-black text-red-600 lg:text-3xl" href="/">
            Marketplace
          </Link>
          <Button className="ml-96" onClick={handleClickLogin}>
            Login
          </Button>
        </div>
      </div>
    );

  const renderLinks = () => (
    <ul
      id="navbar"
      className="flex h-14 w-full flex-row items-center justify-around bg-white shadow-md drop-shadow-md"
    >
      <li className="font-black text-red-600 lg:mr-60 lg:text-3xl">
        <Link href="/">Marketplace</Link>
      </li>
      {navLinks.map((link) => (
        <li
          key={link.name}
          className="w-fit text-center text-gray-500 hover:border-b-2 hover:border-b-black hover:text-gray-600 sm:duration-100 sm:ease-in-out "
        >
          <button type="button" className="text-xs lg:text-xl ">
            <Link href={link.link}>{link.name}</Link>
          </button>
        </li>
      ))}
      {loggedIn && (
        <li key="avatar" className="w-fit text-center text-gray-500">
          <Link href="/profile">
            <Image
              src="/images/default-profile-picture.svg"
              alt="Default Profile"
              width={50}
              height={50}
            />
          </Link>
        </li>
      )}
    </ul>
  );

  return renderLinks2();
}
