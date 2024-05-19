"use client";

import { getAllProductCategories, postProduct } from "@/utils/api-calls";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ProductCategoryDTO } from "@/types/endpoint-types-incoming";
import ExampleProduct from "@/app/(with-nav)/product/ExampleProduct";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();

  const [selectedFiles, setSelectedFiles] = useState<File[]>();
  const [categories, setCategories] = useState<ProductCategoryDTO[]>([]);

  //This is the states for the example product
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [condition, setCondition] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [color, setColor] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  //End of states for the example product

  useEffect(() => {
    getAllProductCategories()
      .then((res) => {
        res.json().then((data) => setCategories(data as ProductCategoryDTO[]));
      })
      .catch((err) => console.log(err));
  }, []);

  const extractName = (selectValue: string) => {
    const selectedCategory = categories.find(
      (category) => category.id === selectValue,
    );
    if (selectedCategory) {
      setCategory(selectedCategory.name);
    }
  };

  const renderCategories = () => {
    if (categories.length > 0) {
      return categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ));
    }

    return <option value="">No categories available</option>;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prevFiles) =>
        prevFiles ? [...prevFiles, ...filesArray] : filesArray,
      );
    }

    console.log("added");
  };

  const renderSelectedFiles = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      return selectedFiles.map((file: File) => {
        const objectUrl = URL.createObjectURL(file);
        return (
          <div key={file.name}>
            <Image
              src={objectUrl}
              alt={file.name}
              className="h-32 w-fit rounded"
              width={100}
              height={100}
              onLoad={() => URL.revokeObjectURL(objectUrl)}
            />
          </div>
        );
      });
    }
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
      .then((res) => {
        //TODO: change to toaster
        if (res.ok) {
          console.log(res);
          res.json().then((data) => {
            console.log(data);
            router.push(`/product/${data.id}`);
          });
        }

        console.log(res);
        return (
          <h1 className="absolute left-1/2 top-1/2 bg-gray-600 text-2xl font-extrabold text-gray-50">
            Please try again
          </h1>
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      className="ml-60 flex w-2/5 flex-col rounded-md bg-white pb-5"
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
          onChange={(e) => extractName(e.target.value)}
        >
          <option>Select category</option>
          {renderCategories()}
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
          <div className="my-3 grid grid-cols-3 gap-3">
            {renderSelectedFiles()}
          </div>
          <div className="flex h-56 w-full cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white">
            <span className="text-gray-500">Upload photos</span>
          </div>
        </label>
      </div>

      <div className="mx-auto my-5 flex w-11/12 flex-col">
        <p className="font-semibold text-gray-700">Name</p>
        <input
          required
          type="text"
          id="name"
          name="name"
          placeholder="What is the name of the product?"
          className="h-12 appearance-none rounded-md border border-gray-300 p-3 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mx-auto my-5 flex w-11/12 flex-col">
        <p className="font-semibold text-gray-700">Condition</p>
        <select
          id="condition"
          name="condition"
          className="h-12 appearance-none rounded-md border border-gray-300 p-3 outline-none"
          onChange={(e) => setCondition(parseInt(e.target.value, 10))}
        >
          <option value={0}>Choose from the list</option>
          <option value={0}>Brand new</option>
          <option value={1}>New</option>
          <option value={2}>Used</option>
          <option value={3}>Used poor condition</option>
          <option value={4}>Not working</option>
        </select>
      </div>

      <div className="mx-auto my-5 flex w-11/12 flex-col">
        <p className="font-semibold text-gray-700">Description</p>
        <textarea
          required
          placeholder="We are not inressted in your description. Get a job"
          id="description"
          name="description"
          className="h-36 appearance-none rounded-md border border-gray-300 p-3 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mx-auto my-5 flex w-11/12 flex-col">
        <p className="font-semibold text-gray-700">Price</p>
        <input
          required
          placeholder="Choose price more than 0"
          type="number"
          id="price"
          name="price"
          className="h-12 appearance-none rounded-md border border-gray-300 p-3 outline-none"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value, 10))}
        />
      </div>

      <div className="mx-auto my-5 flex w-11/12 flex-col">
        <p className="font-semibold text-gray-700">Color</p>
        <select
          id="color"
          name="color"
          className="h-12 appearance-none rounded-md border border-gray-300 p-3 outline-none"
          onChange={(e) => setColor(parseInt(e.target.value, 10))}
        >
          <option value={0}>Choose from the list</option>
          <option value={0}>UNDEFINED</option>
          <option value={1}>BLACK</option>
          <option value={2}>WHITE</option>
          <option value={3}>RED</option>
          <option value={4}>BLUE</option>
          <option value={5}>GREEN</option>
          <option value={6}>YELLOW</option>
          <option value={7}>ORANGE</option>
          <option value={8}>PURPLE</option>
          <option value={9}>PINK</option>
          <option value={10}>GRAY</option>
          <option value={11}>BROWN</option>
          <option value={12}>SILVER</option>
          <option value={13}>GOLD</option>
        </select>
      </div>

      <div className="mx-auto my-5 flex w-11/12 flex-col">
        <p className="font-semibold text-gray-700">Production Year</p>
        <input
          required
          placeholder="Hope its younger then your grandma"
          type="number"
          id="productionYear"
          min={2000}
          max={2099}
          name="productionYear"
          className="h-12 appearance-none rounded-md border border-gray-300 p-3 outline-none"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value, 10))}
        />
      </div>

      <div className="mx-auto my-5 flex w-11/12 flex-col">
        <label className="text-3xl font-black">Submit creation</label>
        <button
          type="submit"
          className="mx-auto mt-2 h-10 w-full rounded bg-blue-600 font-semibold text-white duration-200 hover:bg-blue-500 hover:drop-shadow-xl hover:ease-in-out"
        >
          Submit
        </button>
      </div>

      <ExampleProduct
        files={selectedFiles}
        name={name}
        price={price}
        category={category}
        condition={condition}
        description={description}
        color={color}
        year={year}
      />
    </form>
  );
}
