import Link from "next/link";

export default function HeroImage() {
  return (
    <div className="animate-slideIn bg-[url('/images/cat.jpg')] bg-cover pt-2 text-white">
      <h1 className="m-10 text-4xl font-black text-red-600">Plocket</h1>
      <h1 className="ml-10 w-2/3 text-5xl font-bold">
        Login for the best experience
      </h1>
      <p className="m-10 w-2/3 font-semibold">
        Marketplace uses your details to sell it with disparately low prices in
        China
      </p>
      <p className="m-10 mt-20 pb-8">
        Have a problem?{" "}
        <Link href="https://motherfuckingwebsite.com/" className="underline">
          Get help!
        </Link>
      </p>
    </div>
  );
}
