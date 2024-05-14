// TODO: add enums for condition, color, etc
// TODO: add endpoints that are not yet created
// TODO: add more query params for "search" endpoints + pagination?
// TODO: add types to all endpoints

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

// POST /accounts/logout
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

// TODO: add more search params
// GET /products?
export function getProducts(productCategoryName: string | undefined) {
  const url = productCategoryName
    ? `${BACKEND_URL}/products?category=${productCategoryName}`
    : `${BACKEND_URL}/products`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// POST /products
// eslint-disable-next-line max-params
export function postProduct(
  name: string,
  productCategoryId: string,
  price: number,
  condition: number,
  description: string,
  color: number | undefined,
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
export function addEntryToWatchlist(productCategoryId: string) {
  const url = `${BACKEND_URL}/watchlist`;

  return fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productCategoryId),
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

// POST /orders
export function placeOrder(productsIds: { productId: string }[]) {
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
