"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function Navbar() {
  const { loggedIn } = useAuth();

  const authenticatedNavLinks = [
    { name: "Home", link: "/" },
    { name: "Search", link: "/search" },
    { name: "Shopping cart", link: "/cart" },
    { name: "Profile", link: "/profile" },
  ];

  const anonymousNavLinks = [
    { name: "Home", link: "/" },
    { name: "Search", link: "/search" },
    { name: "Login", link: "/login" },
  ];

  const navLinks = loggedIn ? authenticatedNavLinks : anonymousNavLinks;

  const renderLinks = () => (
    <ul
      id="navbar"
      className="flex w-full flex-row items-center justify-around lg:h-[5%]"
    >
      {navLinks.map((link) => (
        <li
          key={link.name}
          className="w-fit text-center sm:duration-300 sm:ease-in-out lg:hover:scale-110"
        >
          <Link href={link.link}>
            <button type="button" className="text-xl lg:text-3xl">
              {link.name}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );

  return renderLinks();
}
