"use client";

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
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full">
      <Button size="lg" variant="default" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
}
