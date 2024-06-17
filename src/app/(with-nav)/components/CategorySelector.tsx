import Image from "next/image";
import React from "react";

type Category = {
  name: string;
  image: string;
};
type Categories = Category[];

export default function CategorySelector(props: {
  readonly setProductCategoryName: (_: string | null) => void;
  readonly selectedCategoryName: string | null;
}) {
  const categories: Categories = [
    { name: "electronics", image: "/images/electronicsIcon.png" },
    { name: "cars", image: "/images/carIcon.png" },
    { name: "phones", image: "/images/phoneIcon.png" },
    { name: "furniture", image: "/images/furnitureIcon.png" },
    { name: "kebab", image: "/images/kebabIcon.png" },
    // Add other categories similarly
  ];

  return (
    <div className="mt-1 flex flex-wrap items-center justify-center">
      {categories.map((category) => (
        <div
          key={category.name}
          className={`mx-2 rounded p-1 text-center ${props.selectedCategoryName === category.name && "bg-gray-200"}`}
        >
          <button
            type="button"
            className="flex flex-col items-center hover:scale-105"
            onClick={() => props.setProductCategoryName(category.name)}
          >
            <Image src={category.image} alt="" width={24} height={24} />
            <span>
              {category.name
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
