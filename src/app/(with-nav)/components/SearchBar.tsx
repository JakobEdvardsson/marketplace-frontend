export default function SearchBar(props: {
  readonly handleSearch: (_: string) => void;
  readonly query: string | undefined;
}) {
  const handleSearch = (e: string) => {
    props.handleSearch(e);
  };

  return (
    <form className="m-1 mb-2 text-center">
      <input
        type="text"
        placeholder="Search for products..."
        style={{ borderRadius: "3rem", padding: "10px 20px", width: "100%" }}
        value={props.query}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </form>
  );
}
