// TODO: add enums for condition, color, etc
// TODO: add endpoints that are not yet created
// TODO: add more query params for "search" endpoints + pagination?
// TODO: add types to all endpoints

const BACKEND_HOST = process.env.BACKEND_URL || "http://localhost:8080";
const BACKEND_API_VERSION = process.env.BACKEND_API_VERSION || "v1";
const BACKEND_URL = `${BACKEND_HOST}/${BACKEND_API_VERSION}`;

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

export function logout() {
  const url = `${BACKEND_URL}/accounts/logout`;

  return fetch(url, {
    method: "POST",
    credentials: "include",
  });
}

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

export function getCategories() {
  const url = `${BACKEND_URL}/categories`;

  return fetch(url, {
    method: "GET",
    credentials: "omit",
  });
}

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

export function getProducts(productCategoryName: string | undefined) {
  const url = productCategoryName
    ? `${BACKEND_URL}/products?category=${productCategoryName}`
    : `${BACKEND_URL}/products`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

export function deleteProduct(productId: string) {
  const url = `${BACKEND_URL}/products/${productId}`;

  return fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
}

export function getProduct(productId: string) {
  const url = `${BACKEND_URL}/products/${productId}`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

export function deleteInboxMessage(messageId: string) {
  const url = `${BACKEND_URL}/inbox/${messageId}`;

  return fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
}

export function getInboxMessages() {
  const url = `${BACKEND_URL}/inbox`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

export function getInboxMessage(messageId: string) {
  const url = `${BACKEND_URL}/inbox/${messageId}`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

export function deleteAccount() {
  const url = `${BACKEND_URL}/accounts`;

  return fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
}

export function testAuth() {
  const url = `${BACKEND_URL}/tests/username`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// TODO: test Watchlist endpoints with final version of PR
export function getWatchlist() {
  const url = `${BACKEND_URL}/watchlist`;

  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

// TODO: uncomment when a decision has been made whether to use product name or not in POST /watchlist:
/*
export function addToWatchlist(productCategoryId: string, productCategoryName: string) {
  const url = `${BACKEND_URL}/watchlist`;

  return fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(
      {
        id: productCategoryId,
        name: productCategoryName
      }
    )
  });
}

export function addToWatchlist(productCategoryId: string) {
  const url = `${BACKEND_URL}/watchlist/${productCategoryId}`;

  return fetch(url, {
    method: "POST",
    credentials: "include"
  });
}

 */

export function deleteWatchlistItem(watchlistItemId: string) {
  const url = `${BACKEND_URL}/watchlist/${watchlistItemId}`;

  return fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
}

// TODO: Orders endpoints
