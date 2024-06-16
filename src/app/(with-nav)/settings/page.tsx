import MyUserProfile from "@/app/(with-nav)/settings/components/MyUserProfile";
import PasswordChangeForm from "@/app/(with-nav)/settings/components/PasswordChangeForm";
import Navigation from "@/app/(with-nav)/profile/watchlist/components/Navigation";
import { Metadata } from "next";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Settings | Marketplace",
  description: "Marketplace settings",
};

export default function Page() {
  return (
    <div className="mx-auto mt-3 flex w-11/12 flex-col 2md:w-8/12">
      <Navigation name="Settings" />

      <div className="mt-8">
        <MyUserProfile />
      </div>

      <Card className="mt-5 w-full">
        <CardHeader>
          <CardTitle>Change password</CardTitle>
        </CardHeader>
        <CardContent>
          <PasswordChangeForm />
        </CardContent>
      </Card>
    </div>
  );
}
