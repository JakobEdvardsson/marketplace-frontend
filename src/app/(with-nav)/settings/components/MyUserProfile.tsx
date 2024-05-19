"use client";

import { useRouter } from "next/navigation";
import { useMyProfile } from "@/utils/api-calls-swr";

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

  const { data: profile, error } = useMyProfile();

  if (error) {
    router.push("/login");
  }

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
