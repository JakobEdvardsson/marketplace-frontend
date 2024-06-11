import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <div className="mt-4 h-3 bg-red-400" />
      <footer className="w-full bg-white pt-4 shadow-md drop-shadow-md">
        <div className="mx-auto grid w-8/12 grid-cols-4 justify-between gap-4 font-light mobile-br:w-11/12 footer-br:grid-cols-2">
          <div className="flex flex-col">
            <Link className="pb-2 font-bold" href="/">
              Security
            </Link>
            <Link href="/">Client security</Link>
            <Link href="/">False emails</Link>
            <Link href="/">Report annoying ads</Link>
          </div>
          <div className="flex flex-col">
            <Link className="pb-2 font-bold" href="/">
              Terms
            </Link>
            <Link href="/">User conditions</Link>
            <Link href="/">Cookies</Link>
            <Link href="/">Cookie settings</Link>
          </div>
          <div className="flex flex-col">
            <Link className="pb-2 font-bold" href="/">
              For companies
            </Link>
            <Link href="/">For companies</Link>
            <Link href="/">Open store</Link>
            <Link href="/">Show all stores</Link>
          </div>
          <div className="flex flex-col">
            <Link className="pb-2 font-bold" href="/">
              Plocket
            </Link>
            <Link href="/">About Plocket</Link>
            <Link href="/">Press</Link>
            <Link href="/">Work at Plocket</Link>
          </div>
        </div>
        <div className="mt-10 bg-gray-200 py-5">
          <p className="mx-auto w-8/12 text-sm">&copy; Plocket Inc.</p>
        </div>
      </footer>
    </div>
  );
}
