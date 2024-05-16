"use client";

import { useEffect } from "react";
import { testAuth } from "@/utils/api-calls";
import { useAuth } from "@/components/AuthContext";

export function AuthCheck() {
  const auth = useAuth();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await testAuth();
        if (response.ok) {
          auth.login();
        } else {
          auth.logout();
        }
      } catch (_) {}
    };

    fetchAuthStatus();
  }, [auth]);

  return null;
}
