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
