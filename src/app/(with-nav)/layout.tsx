import React from "react";
import Navbar from "./components/navbar";
import Footer from "@/app/(with-nav)/components/Footer";

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div>
      <nav>
        <div className="flex h-14 w-full bg-white shadow-md drop-shadow-md">
          <div className="mx-auto flex w-11/12 flex-row items-center justify-between 2md:w-8/12">
            <Navbar />
          </div>
        </div>
      </nav>
      {children}
      <Footer />
    </div>
  );
}
