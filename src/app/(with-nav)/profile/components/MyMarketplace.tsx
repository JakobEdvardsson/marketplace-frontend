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
    <div className="w-full">
      <h1 className="text-3xl font-bold">My Marketplace</h1>
      <div className="mt-5 flex flex-wrap">
        <Card className="mr-0 w-full 2md:mr-4 2md:w-72">
          <Link href="/profile/myads">
            <CardHeader>
              <Image
                src="/images/pen.png"
                alt="Product Image"
                width={32}
                height={32}
              />
              <CardTitle>My ads</CardTitle>
              <CardDescription>View and manage your own ads</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="mr-0 w-full 2md:mr-4 2md:w-72">
          <Link href="/profile/watchlist">
            <CardHeader>
              <Image
                src="/images/bell.png"
                alt="Product Image"
                width={32}
                height={32}
              />
              <CardTitle>Watchlist</CardTitle>
              <CardDescription>New ads from your watchlist</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="mr-0 w-full 2md:mr-4 2md:w-72">
          <Link href="/settings">
            <CardHeader>
              <Image
                src="/images/settings.webp"
                alt="Product Image"
                width={32}
                height={32}
              />
              <CardTitle>Settings</CardTitle>
              <CardDescription>View and manage your profile</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="mb-0 mr-0 w-full 2md:mb-4 2md:mr-4 2md:w-72">
          <Link href="/profile/purchases">
            <CardHeader>
              <Image
                src="/images/purchased.png"
                alt="Product Image"
                width={32}
                height={32}
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
