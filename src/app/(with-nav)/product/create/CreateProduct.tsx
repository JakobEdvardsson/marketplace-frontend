"use client";

import { postProduct } from "@/utils/api-calls";
import React, { useState } from "react";

export default function CreateProduct() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setSelectedFiles(files);
    renderSelectedFiles();
  };

  const renderSelectedFiles = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      return Array.from(selectedFiles).map((file: File) => (
        <div key={file.name}>
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="h-56 w-full"
          />
        </div>
      ));
    }

    return (
      <div className="flex h-56 w-full cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white">
        <span className="text-gray-500">Upload photos</span>
      </div>
    );
  };

  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name")?.toString();
    const productCategory = formData.get("productCategory")?.toString();
    const price = parseInt(formData.get("price")?.toString() || "0", 10);
    const condition = parseInt(
      formData.get("condition")?.toString() || "0",
      10,
    );
    const description = formData.get("description")?.toString();
    const color = parseInt(formData.get("color")?.toString() || "0", 10);
    const productionYear = parseInt(
      formData.get("productionYear")?.toString() || "0",
      10,
    );
    const data = formData.getAll("data");
    console.log("Name:", name);
    console.log("Product Category:", productCategory);
    console.log("Price:", price);
    console.log("Condition:", condition);
    console.log("Description:", description);
    console.log("Color:", color);
    console.log("Production Year:", productionYear);
    console.log("Files:", data);

    if (
      name === undefined ||
      productCategory === undefined ||
      description === undefined
    ) {
      return;
    }

    postProduct(
      name,
      productCategory,
      price,
      condition,
      description,
      color,
      productionYear,
      data,
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form
      className="ml-60 flex w-2/5 flex-col rounded-md bg-white"
      action={handleSubmit}
    >
      <div className="m-5 flex">
        <label className="text-3xl font-black">Create Product</label>
        <p className="text-md ml-3 rounded-md bg-red-50 p-2 text-center font-medium text-red-700">
          You will be charged for this!
        </p>
      </div>

      <div className="mx-auto my-10 flex w-11/12 flex-col">
        <p className="font-semibold text-gray-700">Category</p>
        <select
          id="productCategory"
          name="productCategory"
          className="h-12 appearance-none rounded-md border border-gray-300 p-3 outline-none"
        >
          <option value="">Select a category</option>
          <option value="BRAND_NEW">Brand new</option>
          <option value="NEW">New</option>
          <option value="USED">Used</option>
          <option value="USED_POOR_CONDITION">Used poor condition</option>
          <option value="NOT_WORKING">Not working</option>
        </select>
      </div>

      <div className="mx-auto my-10 flex w-11/12 flex-col">
        <p className="font-semibold text-gray-700">Pictures</p>
        <input
          multiple
          type="file"
          id="files"
          name="data"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="files" className="w-full">
          {renderSelectedFiles()}
        </label>
      </div>

      <label htmlFor="price">Price:</label>
      <input required type="number" id="price" name="price" />

      <label htmlFor="name">Name:</label>
      <input required type="text" id="name" name="name" />

      <label htmlFor="condition">Condition:</label>
      <input required type="number" id="condition" name="condition" />

      <label htmlFor="description">Description:</label>
      <textarea required id="description" name="description" />

      <label htmlFor="color">Color:</label>
      <input type="text" id="color" name="color" />

      <label htmlFor="productionYear">Production Year:</label>
      <input type="number" id="productionYear" name="productionYear" />

      <button type="submit">Submit</button>
    </form>
  );
}
