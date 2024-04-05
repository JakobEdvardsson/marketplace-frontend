'use client'
import Link from "next/link";
import {router} from "next/client";
import {useEffect, useState} from "react";

export default function Navbar() {

    const navLinks = [
        {name: "Home", link: "/"},
        {name: "Search", link: "/search"},
        {name: "Shopping cart", link: "/cart"},
        {name: "Profile", link: "/profile"},
        {name: "Settings", link: "/settings"}
    ]


    const renderLinks = () => {
        return (
            <ul id={"navbar"} className={"w-full h-10 lg:h-[5%] fixed top-0 flex flex-row items-center justify-around"}>
                {navLinks.map((link) => {
                    return (
                        <li key={link.name}
                            className={"text-center lg:hover:scale-110 sm:ease-in-out sm:duration-300 w-fit"}>
                            <Link href={link.link} >
                                <button className={"activeLink text-xl lg:text-3xl"}>{link.name}</button>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return renderLinks();
}
