import React from "react";

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
