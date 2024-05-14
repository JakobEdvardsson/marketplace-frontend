"use client";

import { postProduct } from "@/utils/api-calls";

export default function TestProduct() {
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
    <form action={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input required type="text" id="name" name="name" />

      <label htmlFor="productCategory">Product Category:</label>
      <input required type="text" id="productCategory" name="productCategory" />

      <label htmlFor="price">Price:</label>
      <input required type="number" id="price" name="price" />

      <label htmlFor="condition">Condition:</label>
      <input required type="number" id="condition" name="condition" />

      <label htmlFor="description">Description:</label>
      <textarea required id="description" name="description" />

      <label htmlFor="color">Color:</label>
      <input type="text" id="color" name="color" />

      <label htmlFor="productionYear">Production Year:</label>
      <input type="number" id="productionYear" name="productionYear" />

      <label htmlFor="files">Select files:</label>
      <input multiple type="file" id="files" name="data" />

      <button type="submit">Submit</button>
    </form>
  );
}
