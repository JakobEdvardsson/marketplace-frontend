"use client";

import Image from "next/image";
import { useMyProfile } from "@/utils/api-calls-swr";
import { useRouter } from "next/navigation";

export default function MyProfile() {
  const router = useRouter();
  const { data: profile, error } = useMyProfile();

  if (error) {
    router.push("/login");
  }

  return (
    <div className="w-full">
      <div className="flex items-center">
        <Image
          src="/images/default-profile-picture.svg"
          alt="Default Profile"
          width={100}
          height={100}
        />
        {profile ? (
          <h1 className="text-2xl font-bold">
            {`${profile.firstName} ${profile.lastName}`}
          </h1>
        ) : (
          <div className="mb-2.5 h-3 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
        )}
      </div>
      <br />
    </div>
  );
}
