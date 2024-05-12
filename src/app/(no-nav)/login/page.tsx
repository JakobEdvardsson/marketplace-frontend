"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
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
    router.push("/");
    console.log(email, password);
  };

  return (
    <form
      className="flex h-screen w-screen bg-gray-50 align-middle"
      action={handleSubmit}
    >
      <div className="m-auto flex size-2/4 flex-col items-center justify-around rounded-xl bg-blue-600 drop-shadow-xl">
        <h1 className="bg-red-400 text-center text-2xl">
          Welcome to Marketplace
        </h1>
        <input required type="email" name="email" placeholder="Email" />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <p>
          Dont have an account? <a href="/register">Register here!</a>
        </p>
      </div>
    </form>
  );
}
