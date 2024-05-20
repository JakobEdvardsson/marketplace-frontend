import MyWatchlist from "@/app/(with-nav)/profile/watchlist/components/Watchlist";
import Navigation from "@/app/(with-nav)/profile/watchlist/components/Navigation";

export default function Inbox() {
  return (
    <div className="mx-auto mt-3 w-8/12 px-2">
      <Navigation name="Watchlist" />
      <MyWatchlist />
    </div>
  );
}
