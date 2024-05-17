"use client";

import { getMyProfile } from "@/utils/api-calls";
import { useEffect, useState } from "react";
import { MyProfileResponseDTO } from "@/types/endpoint-types-incoming";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

function ProfileSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-center">
      <div className="mb-4 h-4 w-64 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-3 w-52 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-3 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export default function MyProfile() {
  const router = useRouter();

  const [profile, setProfile] = useState<MyProfileResponseDTO | undefined>();

  useEffect(() => {
    getMyProfile()
      .then((response) => {
        if (response.status === 401) {
          router.push("/login");
        }

        response.json().then((res) => {
          setProfile(res);
        });
      })
      .catch((e) => console.error(e));
  }, [router]);

  return profile ? (
    <div className="w-full">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="https://blocket-clone.ams3.cdn.digitaloceanspaces.com/default-avatar-profile-icon-of-social-media-user-vector.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="truncate text-2xl font-bold">
          {profile.username
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </h1>
      </div>
      <br />
    </div>
  ) : (
    <ProfileSkeleton />
  );
}
