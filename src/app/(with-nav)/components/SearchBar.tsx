"use client";
import React, { useState } from "react";
import { getProducts } from "@/utils/api-calls";
import { ProductGetAllResponseDTO } from "@/types/endpoint-types-incoming";

function SearchBar(props: {
  readonly setProducts: (_: ProductGetAllResponseDTO) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  //const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (event: any) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    if (!searchTerm.trim()) {
      setError("Please enter a search term.");
      return;
    }

    try {
      const response = await getProducts(
        null,
        null,
        null,
        null,
        null,
        searchTerm,
      ); //fix this
      if (!response.ok) {
        return null;
      }

      const fetchedProducts = await response.json();
      props.setProducts(fetchedProducts);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to load products.");
    }
  };
  //obs se rad 35. är det rätt med form eller classNme? eller onSubmit istället för className

  return (
    <div>
      <form className="text-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for products..."
          style={{ borderRadius: "3rem", padding: "10px 20px", width: "60%" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          style={{
            borderRadius: "3rem",
            padding: "10px 20px",
            marginLeft: "10px",
            background: "blue",
            color: "white",
          }}
        >
          Search
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
}

export default SearchBar;
