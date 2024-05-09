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

// TODO products endpoints

// TODO inbox endpoints

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
