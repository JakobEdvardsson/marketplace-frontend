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
        <Card>
          <Link href="/profile/myads">
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
          </Link>
        </Card>
        <Card>
          <Link href="/profile/watchlist">
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
          </Link>
        </Card>

        <Card>
          <Link href="/settings">
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
          </Link>
        </Card>

        <Card>
          <Link href="/profile/purchases">
            <CardHeader>
              <Image
                src="/images/purchased.png"
                className="w-12"
                alt="Product Image"
                width={1000}
                height={1000}
              />
              <CardTitle>My purchases</CardTitle>
              <CardDescription>View your purchases</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
      <br />
    </div>
  );
}
