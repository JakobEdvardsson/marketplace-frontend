"use client";

import React, { useState } from "react";
import { passwordUpdate } from "@/utils/api-calls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function PasswordChangeForm() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match!",
        variant: "destructive",
      });
      return;
    }

    passwordUpdate(oldPassword, newPassword)
      .then((response) => {
        if (!response.ok) {
          toast({
            title: "Password change failed!",
            variant: "destructive",
          });
          return;
        }

        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        toast({
          title: "Password change was successful",
        });
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="w-full text-center">
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <Input
            required
            placeholder="Current password"
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </div>
        <div className="my-4">
          <Input
            required
            placeholder="New password"
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="my-4">
          <Input
            required
            placeholder="Confirm new password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="my-5 flex justify-center">
          <Button type="submit">Change password</Button>
        </div>
      </form>
    </div>
  );
}
