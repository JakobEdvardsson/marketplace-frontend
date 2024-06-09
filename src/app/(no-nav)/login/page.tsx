import LoginForm from "@/app/(no-nav)/login/LoginForm";
import HeroImage from "@/app/(no-nav)/login/HeroImage";

export default function Page() {
  return (
    <div className="container my-6 flex animate-fadeIn place-content-center">
      <div className="my-10 basis-1/2 mobile:hidden">
        <HeroImage />
      </div>
      <div className="shrink-0 grow-0 basis-[450px]">
        <LoginForm />
      </div>
    </div>
  );
}
