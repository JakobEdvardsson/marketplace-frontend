"use client";

import { useEffect, useState } from "react";
import { getMyProfile } from "@/utils/api-calls";
import { useRouter } from "next/navigation";
import { MyProfileResponseDTO } from "@/types/endpoint-types-incoming";
import { useAuth } from "@/components/AuthContext";

function ProfileSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-center">
      <div className="mb-4 h-4 w-64 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-3 w-52 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-3 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export default function MyUserProfile() {
  const router = useRouter();
  const auth = useAuth();

  const [profile, setProfile] = useState<MyProfileResponseDTO | undefined>();

  useEffect(() => {
    if (!auth.loggedIn) {
      router.push("/login");
    }

    getMyProfile()
      .then((response) => {
        if (response.status === 401) {
          router.push("/login");
        }

        response.json().then((res) => {
          setProfile(res as MyProfileResponseDTO);
        });
      })
      .catch((e) => console.error(e));
  }, [router]);

  return profile ? (
    <div className="w-full">
      <h1 className="text-center text-3xl">
        {profile.firstName + " " + profile.lastName} ({profile.username})
      </h1>
      <p className="my-1 text-center">Email: {profile.email}</p>
      <p className="text-center">Date of birth: {profile.dateOfBirth}</p>
    </div>
  ) : (
    <ProfileSkeleton />
  );
}
