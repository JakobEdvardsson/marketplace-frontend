"use client";

import { getMyProfile } from "@/utils/api-calls";
import { useEffect, useState } from "react";
import { MyProfileResponseDTO } from "@/types/endpoint-types-incoming";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MyProfile() {
  const router = useRouter();

  const [profile, setProfile] = useState<MyProfileResponseDTO | undefined>();

  useEffect(() => {
    getMyProfile()
      .then((response) => {
        if (response.status === 401) {
          router.push("/login");
          return;
        }

        response.json().then((res) => {
          setProfile(res);
        });
      })
      .catch((e) => console.error(e));
  }, [router]);

  return (
    <div className="w-full">
      <div className="flex items-center">
        <Image
          src="/images/default_profile.jpg"
          alt="Default Profile"
          width={100}
          height={100}
        />
        {profile ? (
          <h1 className="truncate text-2xl font-bold">
            {profile.username
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h1>
        ) : (
          <div className="mb-2.5 h-3 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
        )}
      </div>
      <br />
    </div>
  );
}
