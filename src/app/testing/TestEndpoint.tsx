"use client";

import { login } from "@/utils/api-calls";

export default function TestEndpoint() {
  const onSubmit = async (formData: FormData) => {
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    if (!username || !password) {
      return;
    }

    await login(username, password);

    // test authenticated endpoint here:
  };

  return (
    <form action={onSubmit} className="bg-white">
      <input name="username" type="text" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button className="bg-blue-500 p-2" type="submit">
        Login
      </button>
    </form>
  );
}
