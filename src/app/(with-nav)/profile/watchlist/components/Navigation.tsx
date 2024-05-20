import Link from "next/link";
import Image from "next/image";

export default function Navigation(props: { readonly name: string }) {
  return (
    <div className="flex space-x-2">
      <Link className="text-sm hover:underline" href="/profile">
        My Marketplace
      </Link>
      <Image src="/images/arrow.svg" alt="arrow" width="8" height="8" />
      <p className="text-sm text-gray-500">{props.name}</p>
    </div>
  );
}
