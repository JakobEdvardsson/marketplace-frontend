import RegisterForm from "@/app/(no-nav)/register/RegisterForm";

export default function Page() {
  return (
    <div className="mx-2 flex min-h-screen items-center justify-center bg-gray-100">
      <div className="animate-fadeIn">
        <RegisterForm />
      </div>
    </div>
  );
}
