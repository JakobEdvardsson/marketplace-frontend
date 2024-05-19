"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import Image from "next/image";

export default function Navbar() {
  const { loggedIn } = useAuth();

  const authenticatedNavLinks = [
    { name: "Post ad", link: "/product" },
    { name: "Shopping cart", link: "/cart" },
  ];

  const anonymousNavLinks = [{ name: "Login", link: "/login" }];

  const navLinks = loggedIn ? authenticatedNavLinks : anonymousNavLinks;

  const renderLinks = () => (
    <ul
      id="navbar"
      className="flex h-14 w-full flex-row items-center justify-around bg-white shadow-md drop-shadow-md"
    >
      <li className="font-black text-red-600 lg:mr-32 lg:text-3xl">
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

  return renderLinks();
}
