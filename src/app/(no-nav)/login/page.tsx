import LoginForm from "@/app/(no-nav)/login/components/LoginForm";
import HeroImage from "@/app/(no-nav)/login/components/HeroImage";

export default function Page() {
  return (
    <div className="container my-6 flex animate-fadeIn place-content-center">
      <div className="my-10 basis-1/2 login-br:hidden">
        <HeroImage />
      </div>
      <div className="grow-0 basis-[450px]">
        <LoginForm />
      </div>
    </div>
  );
}
