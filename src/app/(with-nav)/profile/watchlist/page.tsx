import MyWatchlist from "@/app/(with-nav)/profile/watchlist/components/Watchlist";
import Navigation from "@/app/(with-nav)/profile/watchlist/components/Navigation";

export default function Inbox() {
  return (
    <div className="mx-auto my-3 w-11/12 2md:w-8/12">
      <Navigation name="Watchlist" />
      <div className="mt-5">
        <MyWatchlist />
      </div>
    </div>
  );
}
