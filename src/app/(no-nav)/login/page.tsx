import LoginForm from "@/app/(no-nav)/login/LoginForm";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <p>Login to the best marketplace in the world</p>
      <LoginForm />
      <Link href="/register">No account? Register here!</Link>
    </>
  );
}
