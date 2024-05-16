import React from "react";
export default function Page() {
  const categories = [
    { name: "Electronics", image: "/images//electronicsIcon.png" },
    { name: "Cars", image: "/images/carIcon.png" },
    { name: "Phones", image: "/images/phoneIcon.png" },
    { name: "Furniture", image: "/images/furnitureIcon.png" },
    { name: "Kebab", image: "/images/kebabIcon.png" },
    // Add other categories similarly
  ];
  return (
    <div className="bg-gray-100">
      <div className="py-10 text-center">
        <p
          className="text-4xl"
          style={{ fontFamily: "Roboto", fontWeight: "bold", color: "red" }}
        >
          Marketplace
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          {categories.map((categories) => (
            <div key={categories.name} className="flex flex-col items-center">
              <img
                src={categories.image}
                alt={categories.name}
                className="h-12 w-12"
              />
              <span>{categories.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search here"
            style={{
              width: "40%",
              borderRadius: "3rem",
              paddingRight: "4.5rem",
            }}
            className="rounded border-2 border-gray-300 p-2"
          />
          <button
            type="button"
            style={{ borderRadius: "3rem" }}
            className="longer-input rounded border-2 border-gray-300 p-2"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
