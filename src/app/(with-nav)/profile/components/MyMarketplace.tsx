import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function MyMarketplace() {
  return (
    <div className="mx-auto w-full">
      <h1 className="text-3xl font-bold">My Marketplace</h1>
      <br />
      <div className="flex flex-wrap">
        <Link href="/bajs">
          <Card>
            <CardHeader>
              <Image
                src="/images/pen.png"
                className="w-8"
                alt="Product Image"
                width={1000}
                height={1000}
              />
              <CardTitle>My ads</CardTitle>
              <CardDescription>View and manage your own ads</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/profile/watchlist">
          <Card>
            <CardHeader>
              <Image
                src="/images/bell.png"
                className="w-8"
                alt="Product Image"
                width={1000}
                height={1000}
              />
              <CardTitle>Watchlist</CardTitle>
              <CardDescription>New ads from your watchlist</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/settings">
          <Card>
            <CardHeader>
              <Image
                src="/images/settings.webp"
                className="w-8"
                alt="Product Image"
                width={1000}
                height={1000}
              />
              <CardTitle>Settings</CardTitle>
              <CardDescription>View and manage your profile</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <br />
    </div>
  );
}
