import React from "react";
import Navbar from "./components/navbar";

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
    </div>
  );
}
