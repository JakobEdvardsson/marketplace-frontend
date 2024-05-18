"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { logout } from "@/utils/api-calls";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const { logout: authContextLogout } = useAuth();

  const handleLogout = () => {
    logout()
      .then((response) => {
        if (response.ok) {
          authContextLogout();
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mx-auto w-full">
      <Separator />
      <br />
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
