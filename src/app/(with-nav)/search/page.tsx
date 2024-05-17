import CategorySelector from "../components/CategorySelector";
import SearchBar from "../components/SearchBar";

export default function Page() {
  return (
    <div className="bg-gray-100">
      <div className="py-10 text-center">
        <p
          className="text-4xl"
          style={{ fontFamily: "Roboto", fontWeight: "bold", color: "red" }}
        >
          Marketplace
        </p>
        <CategorySelector />
        <SearchBar />
      </div>
    </div>
  );
}
