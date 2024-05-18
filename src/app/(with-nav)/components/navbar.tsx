"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function Navbar() {
  const { loggedIn } = useAuth();

  const authenticatedNavLinks = [
    { name: "Home", link: "/" },
    { name: "Shopping cart", link: "/cart" },
    { name: "Profile", link: "/profile" },
  ];

  const anonymousNavLinks = [
    { name: "Home", link: "/" },
    { name: "Login", link: "/login" },
  ];

  const navLinks = loggedIn ? authenticatedNavLinks : anonymousNavLinks;

  const renderLinks = () => (
    <ul
      id="navbar"
      className="flex h-14 w-full flex-row items-center justify-around shadow-md"
    >
      <li className="cursor-default font-black text-red-600 lg:pr-32 lg:text-3xl">
        Marketplace
      </li>
      {navLinks.map((link) => (
        <li
          key={link.name}
          className="w-fit text-center text-gray-500 hover:border-b-2 hover:border-b-black hover:text-gray-600 sm:duration-100 sm:ease-in-out "
        >
          <Link href={link.link}>
            <button type="button" className="text-xs lg:text-xl ">
              {link.name}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );

  return renderLinks();
}
