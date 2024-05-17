import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MyInbox() {
  return (
    <div className="mx-auto w-full">
      <h1 className="text-3xl font-bold">My Watchlist</h1>
      <br />
      <div className="flex flex-wrap">
        <Link href="/bajs">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Example product</CardTitle>
              <CardDescription className="truncate">
                Description...
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
