import Image from "next/image";
import React from "react";
import { ProductColor, ProductCondition } from "@/utils/api-call-types";

export default function ExampleProduct({
  files,
  name,
  price,
  category,
  condition,
  description,
  color,
  year,
}: {
  readonly files: File[] | undefined;
  readonly name: string;
  readonly price: number;
  readonly category: string;
  readonly condition: number;
  readonly description: string;
  readonly color: number;
  readonly year: number;
}) {
  const renderFiles = () => {
    if (files && files.length > 0) {
      return files.map((file: File) => {
        const objectUrl = URL.createObjectURL(file);
        return (
          <div key={file.name} className="mx-auto h-72 w-full shrink-0 pr-2">
            <Image
              src={objectUrl}
              alt={file.name}
              className="size-full rounded object-cover"
              width={100}
              height={100}
              onLoad={() => URL.revokeObjectURL(objectUrl)}
            />
          </div>
        );
      });
    }

    return (
      <div className="mx-auto flex h-72 w-full cursor-default items-center justify-center rounded border-2 border-dotted border-gray-300 bg-white">
        <span className="text-gray-500">No pics :(</span>
      </div>
    );
  };

  return (
    <div className="ml-2 w-full rounded-xl bg-white p-2 product-form-br:ml-0">
      <div className="mx-auto flex overflow-x-auto">{renderFiles()}</div>
      <h1
        className={`my-3 cursor-default text-2xl font-bold mobile-br:text-lg ${name ? "" : "text-gray-300"}`}
      >
        {name === "" ? "No name" : name}
      </h1>

      <h1
        className={`cursor-default text-sm text-gray-400 ${category ? "" : "text-gray-300"}`}
      >
        {category ? "Category: " + category : ""}
      </h1>

      <h1 className="cursor-default text-sm text-gray-400">
        {condition ? "Condition: " + ProductCondition[condition] : ""}
      </h1>

      <h1 className="cursor-default text-sm text-gray-400">
        {color ? "Color: " + ProductColor[color] : ""}
      </h1>

      <h1 className="cursor-default text-sm text-gray-400">
        {year ? "Production year: " + year : ""}
      </h1>

      <p
        className={`my-3 cursor-default text-xl ${price ? "" : "text-gray-300"}`}
      >
        {price ? price + " kr" : "No price"}
      </p>

      <h1 className="cursor-default text-sm">
        {description ? "Description: " : ""}
      </h1>
      <p className="truncate text-pretty hover:text-clip mobile-br:text-sm">
        {description ? description : ""}
      </p>
    </div>
  );
}
