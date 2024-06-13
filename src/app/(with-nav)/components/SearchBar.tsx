import { Input } from "@/components/ui/input";

export default function SearchBar(props: {
  readonly handleSearch: (_: string) => void;
  readonly query: string | undefined;
}) {
  const handleSearch = (e: string) => {
    props.handleSearch(e);
  };

  return (
    <form className="m-1 mb-2 text-center">
      <Input
        type="text"
        placeholder="Search for products..."
        value={props.query}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </form>
  );
}
