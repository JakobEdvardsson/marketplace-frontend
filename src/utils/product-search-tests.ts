import { getProducts } from "@/utils/api-calls";

// eslint-disable-next-line complexity
export async function productSearchTests() {
  try {
    // All parameters null
    await getProducts(null, null, null, null, null);
    console.log("All parameters null: Success");
  } catch (error) {
    console.error("All parameters null: Error", error);
  }

  try {
    // Only productCategoryName defined
    await getProducts("electronics", null, null, null, null);
    console.log("Only productCategoryName defined: Success");
  } catch (error) {
    console.error("Only productCategoryName defined: Error", error);
  }

  try {
    // Only minimumPrice defined
    await getProducts(null, 50, null, null, null);
    console.log("Only minimumPrice defined: Success");
  } catch (error) {
    console.error("Only minimumPrice defined: Error", error);
  }

  try {
    // Only maximumPrice defined
    await getProducts(null, null, 200, null, null);
    console.log("Only maximumPrice defined: Success");
  } catch (error) {
    console.error("Only maximumPrice defined: Error", error);
  }

  try {
    // Only condition defined
    await getProducts(null, null, null, 1, null);
    console.log("Only condition defined: Success");
  } catch (error) {
    console.error("Only condition defined: Error", error);
  }

  try {
    // Only sortMode defined
    await getProducts(null, null, null, null, 0);
    console.log("Only sortMode defined: Success");
  } catch (error) {
    console.error("Only sortMode defined: Error", error);
  }

  try {
    // productCategoryName and minimumPrice defined
    await getProducts("electronics", 50, null, null, null);
    console.log("productCategoryName and minimumPrice defined: Success");
  } catch (error) {
    console.error("productCategoryName and minimumPrice defined: Error", error);
  }

  try {
    // productCategoryName and maximumPrice defined
    await getProducts("electronics", null, 200, null, null);
    console.log("productCategoryName and maximumPrice defined: Success");
  } catch (error) {
    console.error("productCategoryName and maximumPrice defined: Error", error);
  }

  try {
    // productCategoryName and condition defined
    await getProducts("electronics", null, null, 1, null);
    console.log("productCategoryName and condition defined: Success");
  } catch (error) {
    console.error("productCategoryName and condition defined: Error", error);
  }

  try {
    // productCategoryName and sortMode defined
    await getProducts("electronics", null, null, null, 0);
    console.log("productCategoryName and sortMode defined: Success");
  } catch (error) {
    console.error("productCategoryName and sortMode defined: Error", error);
  }

  try {
    // minimumPrice and maximumPrice defined
    await getProducts(null, 50, 200, null, null);
    console.log("minimumPrice and maximumPrice defined: Success");
  } catch (error) {
    console.error("minimumPrice and maximumPrice defined: Error", error);
  }

  try {
    // minimumPrice and condition defined
    await getProducts(null, 50, null, 1, null);
    console.log("minimumPrice and condition defined: Success");
  } catch (error) {
    console.error("minimumPrice and condition defined: Error", error);
  }

  try {
    // minimumPrice and sortMode defined
    await getProducts(null, 50, null, null, 0);
    console.log("minimumPrice and sortMode defined: Success");
  } catch (error) {
    console.error("minimumPrice and sortMode defined: Error", error);
  }

  try {
    // maximumPrice and condition defined
    await getProducts(null, null, 200, 1, null);
    console.log("maximumPrice and condition defined: Success");
  } catch (error) {
    console.error("maximumPrice and condition defined: Error", error);
  }

  try {
    // maximumPrice and sortMode defined
    await getProducts(null, null, 200, null, 0);
    console.log("maximumPrice and sortMode defined: Success");
  } catch (error) {
    console.error("maximumPrice and sortMode defined: Error", error);
  }

  try {
    // condition and sortMode defined
    await getProducts(null, null, null, 1, 0);
    console.log("condition and sortMode defined: Success");
  } catch (error) {
    console.error("condition and sortMode defined: Error", error);
  }

  try {
    // productCategoryName, minimumPrice, and maximumPrice defined
    await getProducts("electronics", 50, 200, null, null);
    console.log(
      "productCategoryName, minimumPrice, and maximumPrice defined: Success",
    );
  } catch (error) {
    console.error(
      "productCategoryName, minimumPrice, and maximumPrice defined: Error",
      error,
    );
  }

  try {
    // productCategoryName, minimumPrice, and condition defined
    await getProducts("electronics", 50, null, 1, null);
    console.log(
      "productCategoryName, minimumPrice, and condition defined: Success",
    );
  } catch (error) {
    console.error(
      "productCategoryName, minimumPrice, and condition defined: Error",
      error,
    );
  }

  try {
    // productCategoryName, minimumPrice, and sortMode defined
    await getProducts("electronics", 50, null, null, 0);
    console.log(
      "productCategoryName, minimumPrice, and sortMode defined: Success",
    );
  } catch (error) {
    console.error(
      "productCategoryName, minimumPrice, and sortMode defined: Error",
      error,
    );
  }

  try {
    // productCategoryName, maximumPrice, and condition defined
    await getProducts("electronics", null, 200, 1, null);
    console.log(
      "productCategoryName, maximumPrice, and condition defined: Success",
    );
  } catch (error) {
    console.error(
      "productCategoryName, maximumPrice, and condition defined: Error",
      error,
    );
  }

  try {
    // productCategoryName, maximumPrice, and sortMode defined
    await getProducts("electronics", null, 200, null, 0);
    console.log(
      "productCategoryName, maximumPrice, and sortMode defined: Success",
    );
  } catch (error) {
    console.error(
      "productCategoryName, maximumPrice, and sortMode defined: Error",
      error,
    );
  }

  try {
    // productCategoryName, condition, and sortMode defined
    await getProducts("electronics", null, null, 1, 0);
    console.log(
      "productCategoryName, condition, and sortMode defined: Success",
    );
  } catch (error) {
    console.error(
      "productCategoryName, condition, and sortMode defined: Error",
      error,
    );
  }

  try {
    // minimumPrice, maximumPrice, and condition defined
    await getProducts(null, 50, 200, 1, null);
    console.log("minimumPrice, maximumPrice, and condition defined: Success");
  } catch (error) {
    console.error(
      "minimumPrice, maximumPrice, and condition defined: Error",
      error,
    );
  }

  try {
    // minimumPrice, maximumPrice, and sortMode defined
    await getProducts(null, 50, 200, null, 0);
    console.log("minimumPrice, maximumPrice, and sortMode defined: Success");
  } catch (error) {
    console.error(
      "minimumPrice, maximumPrice, and sortMode defined: Error",
      error,
    );
  }

  try {
    // minimumPrice, condition, and sortMode defined
    await getProducts(null, 50, null, 1, 0);
    console.log("minimumPrice, condition, and sortMode defined: Success");
  } catch (error) {
    console.error(
      "minimumPrice, condition, and sortMode defined: Error",
      error,
    );
  }

  try {
    // maximumPrice, condition, and sortMode defined
    await getProducts(null, null, 200, 1, 0);
    console.log("maximumPrice, condition, and sortMode defined: Success");
  } catch (error) {
    console.error(
      "maximumPrice, condition, and sortMode defined: Error",
      error,
    );
  }

  try {
    // All parameters defined
    await getProducts("electronics", 50, 200, 1, 0);
    console.log("All parameters defined: Success");
  } catch (error) {
    console.error("All parameters defined: Error", error);
  }
}
