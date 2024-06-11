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
        <Navbar />
      </nav>
      {children}
      <Footer />
    </div>
  );
}
