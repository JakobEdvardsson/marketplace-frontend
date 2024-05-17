"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Logout() {
  return (
    <div className="mx-auto w-full">
      <Separator />
      <br />
      <Button asChild>
        <Link href="/Logout">Logout</Link>
      </Button>
    </div>
  );
}
