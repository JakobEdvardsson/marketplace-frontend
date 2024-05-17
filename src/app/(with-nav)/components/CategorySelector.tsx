"use client";
import React, { useState } from "react"; // lägg till useEffect?
import { getProducts } from "@/utils/api-calls";
import Image from "next/image";

type Category = {
  name: string;
  image: string;
};
type Categories = Category[];

function CategorySelector() {
  const categories: Categories = [
    { name: "electronics", image: "/images/electronicsIcon.png" },
    { name: "cars", image: "/images/carIcon.png" },
    { name: "phones", image: "/images/phoneIcon.png" },
    { name: "furniture", image: "/images/furnitureIcon.png" },
    { name: "kebab", image: "/images/kebabIcon.png" },
    // Add other categories similarly
  ];

  const [products, setProducts] = useState([]); // ta bort sen?

  const handleCategoryClick = async (categoryName: string) => {
    try {
      const fetchedProducts = await getProducts(
        categoryName,
        null,
        null,
        null,
        null,
      );
      if (!fetchedProducts.ok) return null;
      const productData = await fetchedProducts.json();
      setProducts(productData);
      console.log(products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {categories.map((category) => (
        <div key={category.name} className="m-4 text-center">
          <button
            type="button"
            className="flex flex-col items-center"
            onClick={() => handleCategoryClick(category.name)} // Calling the click handler
          >
            <Image
              src={category.image}
              alt={category.name}
              width={24}
              height={24}
            />
            <span>{category.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default CategorySelector;
