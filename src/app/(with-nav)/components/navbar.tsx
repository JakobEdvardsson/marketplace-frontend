"use client";
import Link from "next/link";
// import {router} from "next/client";
export default function Navbar() {
  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Search", link: "/search" },
    { name: "Shopping cart", link: "/cart" },
    { name: "Settings", link: "/settings" },
    { name: "Profile", link: "/profile" },
  ];

  const renderLinks = () => (
    <ul
      id="navbar"
      className="flex w-full flex-row items-center justify-around shadow-md lg:h-14"
    >
      <li className="cursor-default pr-32 text-3xl font-black text-red-600">
        Marketplace
      </li>
      {navLinks.map((link) => (
        <li
          key={link.name}
          className="w-fit text-center text-gray-500 hover:border-b-2 hover:border-b-black hover:text-gray-600 sm:duration-100 sm:ease-in-out "
        >
          <Link href={link.link}>
            <button type="button" className="lg:text-xl ">
              {link.name}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );

  return renderLinks();
}
