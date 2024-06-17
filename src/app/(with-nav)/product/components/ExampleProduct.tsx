import Image from "next/image";
import React from "react";
import { ProductColor, ProductCondition } from "@/utils/api-call-types";

export default function ExampleProduct(props: {
  readonly files: File[] | undefined;
  readonly name: string;
  readonly price: number | undefined;
  readonly category: string;
  readonly condition: number | undefined;
  readonly description: string;
  readonly color: number | undefined;
  readonly year: number | undefined;
}) {
  const currencyFormat = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  });

  const renderFiles = () => {
    if (props.files && props.files.length > 0) {
      return props.files.map((file: File) => {
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
        className={`my-3 cursor-default text-2xl font-bold mobile-br:text-lg ${props.name ? "" : "text-gray-300"}`}
      >
        {props.name === "" ? "No name" : props.name}
      </h1>

      <h1
        className={`cursor-default text-sm text-gray-400 ${props.category ? "" : "text-gray-300"}`}
      >
        {props.category
          ? `Category: ${props.category[0].toUpperCase()}${props.category.slice(1)}`
          : ""}
      </h1>

      <h1 className="cursor-default text-sm text-gray-400">
        {props.condition === undefined
          ? ""
          : "Condition: " +
            ProductCondition[props.condition]
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/^[a-zA-Z]/, (char) => char.toUpperCase())}
      </h1>

      <h1 className="cursor-default text-sm text-gray-400">
        {props.color === undefined || props.color === 0
          ? ""
          : "Color: " +
            ProductColor[props.color]
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
      </h1>

      <h1 className="cursor-default text-sm text-gray-400">
        {props.year ? "Production year: " + props.year : ""}
      </h1>

      <p
        className={`my-3 cursor-default text-xl ${props.price ? "" : "text-gray-300 "} ${props.price === 1337 && "rainbow-text"} `}
      >
        {props.price ? currencyFormat.format(props.price) : "No price"}
      </p>

      <h1 className="cursor-default text-sm">
        {props.description ? "Description: " : ""}
      </h1>
      <p className="truncate text-wrap hover:text-clip mobile-br:text-sm">
        {props.description ? props.description : ""}
      </p>
    </div>
  );
}
