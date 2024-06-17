import {
  ProductColor,
  ProductCondition,
  ProductBuyOrder,
  ProductSortMode,
} from "@/utils/api-call-types";

const BACKEND_HOST =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
const BACKEND_API_VERSION = process.env.NEXT_PUBLIC_BACKEND_API_VERSION || "v1";
const BACKEND_URL = `${BACKEND_HOST}/${BACKEND_API_VERSION}`;

/*
     \      _ \ _ _|                       |               _)         |
    _ \    |   |  |        _ \  __ \    _` |  __ \    _ \   |  __ \   __|   __|
   ___ \   ___/   |        __/  |   |  (   |  |   |  (   |  |  |   |  |   \__ \
 _/    _\ _|    ___|     \___| _|  _| \__,_|  .__/  \___/  _| _|  _| \__| ____/
                                             _|
 */

// POST /accounts/login
export function login(username: string, password: string) {
  const url = `${BACKEND_URL}/accounts/login`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: `username=${username}&password=${password}`,
  });
}

// POST /accounts/Logout.tsx
export function logout() {
  const url = `${BACKEND_URL}/accounts/logout`;

  return fetch(url, {
    method: "POST",
    credentials: "include",
  });
}

// DELETE /accounts
export function deleteAccount() {
  const url = `${BACKEND_URL}/accounts`;

  return fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
}

// GET /accounts/me
export function getMyProfile() {
  const url = `${BACKEND_URL}/accounts/me`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// POST /accounts/password
export function passwordUpdate(oldPassword: string, newPassword: string) {
  const url = `${BACKEND_URL}/accounts/password`;

  return fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  });
}

// POST /accounts/register
// eslint-disable-next-line max-params
export function register(
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  dateOfBirth: Date,
) {
  const url = `${BACKEND_URL}/accounts/register`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "omit",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      username,
      password,
      dateOfBirth,
    }),
  });
}

// GET /accounts/{id}
export function getProfile(accountId: string) {
  const url = `${BACKEND_URL}/accounts/${accountId}`;

  return fetch(url, {
    method: "GET",
    credentials: "omit",
  });
}

// GET /categories
export function getAllProductCategories() {
  const url = `${BACKEND_URL}/categories`;

  return fetch(url, {
    method: "GET",
    credentials: "omit",
  });
}

// GET /products
export function get20LatestProducts() {
  return getProducts(null, null, null, null, null);
}

// GET /products?category=${productCategoryName}&minPrice=${minimumPrice}&maxPrice=${maximumPrice}&condition=${condition}&sort=${sortMode}
/**
 * All options can be left undefined to fetch the latest 20 product postings.
 *
 * @param productCategoryName name of target product category
 * @param minimumPrice minimum product price
 * @param maximumPrice maximum product price
 * @param condition product condition enum
 * @param sortMode product sort mode enum
 * @param query product name search query
 */
// eslint-disable-next-line max-params
export function getProducts(
  productCategoryName: string | null,
  minimumPrice: number | null,
  maximumPrice: number | null,
  condition: ProductCondition | null,
  sortMode: ProductSortMode | null,
  query?: string,
) {
  let url = `${BACKEND_URL}/products?`;

  if (query) {
    url += `query=${query}&`;
  }

  if (productCategoryName !== null) {
    url += `category=${productCategoryName}&`;
  }

  if (minimumPrice !== null) {
    url += `minPrice=${minimumPrice}&`;
  }

  if (maximumPrice !== null) {
    url += `maxPrice=${maximumPrice}&`;
  }

  if (condition !== null) {
    url += `condition=${condition}&`;
  }

  if (sortMode !== null) {
    url += `sort=${sortMode}&`;
  }

  if (url.endsWith("&")) {
    url = url.slice(0, -1);
  }

  if (url.endsWith("?")) {
    url = url.slice(0, -1);
  }

  return fetch(url, {
    next: { revalidate: 0 },
    method: "GET",
    credentials: "omit",
  });
}

// POST /products
// eslint-disable-next-line max-params
export function postProduct(
  name: string,
  productCategoryId: string,
  price: number,
  condition: ProductCondition,
  description: string,
  color: ProductColor | undefined,
  productionYear: number | undefined,
  images: (File | string)[],
) {
  const url = `${BACKEND_URL}/products`;

  const formData = new FormData();

  // add product info
  formData.append(
    "json",
    new Blob(
      [
        JSON.stringify({
          name,
          productCategory: productCategoryId,
          price,
          condition,
          description,
          color,
          productionYear,
        }),
      ],
      { type: "application/json" },
    ),
  );

  // add images
  images.forEach((file) => {
    if (file && file instanceof File) {
      formData.append("data", file);
    }
  });

  return fetch(url, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
}

// GET /products/my-active-listings
export function getMyActiveListings() {
  const url = `${BACKEND_URL}/products/my-active-listings`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// GET /products/my-sold-products
export function getMySoldProducts() {
  const url = `${BACKEND_URL}/products/my-sold-products`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// GET /products/my-subscribed-categories
export function getMyProductsFromSubscribedCategories() {
  const url = `${BACKEND_URL}/products/my-subscribed-categories`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// GET /products/{id}
export function getProductById(productId: string) {
  const url = `${BACKEND_URL}/products/${productId}`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// DELETE /products/{id}
export function deleteProductById(productId: string) {
  const url = `${BACKEND_URL}/products/${productId}`;

  return fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
}

// GET /tests/username
export function testAuth() {
  const url = `${BACKEND_URL}/tests/username`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// GET /inbox
export function getAllInboxMessages() {
  const url = `${BACKEND_URL}/inbox`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// GET /inbox/{id}
export function getInboxMessageById(messageId: string) {
  const url = `${BACKEND_URL}/inbox/${messageId}`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// DELETE /inbox/{id}
export function deleteInboxMessageById(messageId: string) {
  const url = `${BACKEND_URL}/inbox/${messageId}`;

  return fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
}

// GET /watchlist
export function getAllWatchlistEntries() {
  const url = `${BACKEND_URL}/watchlist`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// POST /watchlist
export function addEntryToWatchlist(productCategoryName: string) {
  const url = `${BACKEND_URL}/watchlist`;

  return fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: productCategoryName,
  });
}

// DELETE /watchlist/{productCategoryID}
export function deleteWatchlistEntryById(watchlistItemId: string) {
  const url = `${BACKEND_URL}/watchlist/${watchlistItemId}`;

  return fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
}

// GET /orders
export function getAllMyBuyOrders() {
  const url = `${BACKEND_URL}/orders`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// GET /orders?start=?&end=?
export function getMyBuyOrdersBetween(start: Date, end: Date) {
  const url = `${BACKEND_URL}/orders?start=${start.toISOString()}&end=${end.toISOString()}`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// POST /orders
export function placeOrder(productsIds: ProductBuyOrder[]) {
  const url = `${BACKEND_URL}/orders`;

  return fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderItemDTOS: productsIds,
    }),
  });
}

// GET /orders/{id}
export function getBuyOrderById(buyOrderId: string) {
  const url = `${BACKEND_URL}/orders/${buyOrderId}`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// PATCH /orders/{productId}
export function handleBuyOrderRequest(productId: string, accept: boolean) {
  const url = `${BACKEND_URL}/orders/${productId}`;

  return fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accept,
    }),
  });
}
