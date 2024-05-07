"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    //TODO: connect API here
    /*
        const response = await();

        if (response.ok) {
            router.push('/');
        } else {
            // TODO: handle errors here
        }
         */

    //TODO: remove this lines
    console.log(email, password);
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input required type="email" name="email" placeholder="Email" />
      <input required type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
