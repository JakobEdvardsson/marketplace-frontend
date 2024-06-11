"use client";

import { getAllProductCategories, postProduct } from "@/utils/api-calls";
import React, { useEffect, useState } from "react";
import { ProductCategoryDTO } from "@/types/endpoint-types-incoming";
import ExampleProduct from "@/app/(with-nav)/product/components/ExampleProduct";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/app/(with-nav)/product/components/Navigation";

export default function CreateProduct() {
  const { toast } = useToast();

  const currentYear = new Date().getFullYear();

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
  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prevFiles) => {
      if (prevFiles) {
        return prevFiles.filter((_, i) => i !== index);
      }
    });
  };

  const renderSelectedFiles = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      return selectedFiles.map((file: File, index) => {
        const objectUrl = URL.createObjectURL(file);
        return (
          <div key={file.name} className="">
            <button type="submit" onClick={() => handleRemoveImage(index)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={objectUrl}
              alt={file.name}
              className="h-32 w-fit rounded"
              width={100}
              height={100}
            />
          </div>
        );
      });
    }
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { files } = event.dataTransfer;
    if (files) {
      const filesArray = Array.from(files);
      setSelectedFiles((prevFiles) =>
        prevFiles ? [...prevFiles, ...filesArray] : filesArray,
      );
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

    formData.delete("data");
    if (selectedFiles) {
      selectedFiles.forEach((file) => {
        formData.append("data", file);
      });
    }

    const data = formData.getAll("data");

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
          toast({
            title: "Product created",
            description: "Your product is available for purchase",
            variant: "default",
          });
          res.json().then((data) => {
            router.push(`/product/${data.id}`);
          });
        } else if (res.status === 403) {
          toast({
            title: "Please try again",
            description: "Your product is missing Category or Condition",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Please try again",
            description: "Your product could not be created",
            variant: "destructive",
          });
        }

        return (
          <h1 className="absolute left-1/2 top-1/2 bg-gray-600 text-2xl font-extrabold text-gray-50">
            Please try again
          </h1>
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mx-auto w-8/12 mobile-br:w-11/12">
      <Navigation name="Create product" />
      <form
        className="mt-3 flex product-form-br:flex-col"
        action={handleSubmit}
      >
        <div className="basis-[550px] rounded-md bg-white py-4 ">
          <div className="m-5 flex">
            <label className="text-3xl font-black">Create Product</label>
            <p className="ml-3 rounded-md bg-red-50 p-2 text-center font-medium text-red-700">
              Free!
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
            <div className="my-3 grid grid-cols-5 gap-2">
              {renderSelectedFiles()}
            </div>
            <label htmlFor="files" className="w-full">
              <div
                className="flex h-56 w-full cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {" "}
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
              placeholder="Description of the product. Avoid writing personal details for example your address."
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
              min={0}
              max={currentYear}
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
        </div>
        <div className="product-form--br:my-6 relative flex-1 shrink-0 basis-[350px]">
          <div className="sticky top-2">
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
          </div>
        </div>
      </form>
    </div>
  );
}
