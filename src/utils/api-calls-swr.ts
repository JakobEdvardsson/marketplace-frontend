import useSWR, { mutate } from "swr";
import { ProductCondition, ProductSortMode } from "@/utils/api-call-types";
import {
  ActiveListingsDTO,
  GetAllSoldProductsResponseDTO,
  InboxGetAllResponseDTO,
  MyProfileResponseDTO,
  OrderGetAllResponseDTO,
  OrderGetResponseDTO,
  ProductGetAllResponseDTO,
  ProductGetResponseDTO,
  ProfileResponseDTO,
  WatchListResponseDTO,
} from "@/types/endpoint-types-incoming";

const BACKEND_HOST =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
const BACKEND_API_VERSION = process.env.NEXT_PUBLIC_BACKEND_API_VERSION || "v1";
export const BACKEND_URL = `${BACKEND_HOST}/${BACKEND_API_VERSION}`;

const fetcher = (url: string): Promise<any> =>
  fetch(url, { credentials: "omit" }).then((res) => res.json());

const authedFetcher = (url: string): Promise<any> =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export function useMyProfile() {
  const url = `${BACKEND_URL}/accounts/me`;
  return useSWR<MyProfileResponseDTO>(url, authedFetcher);
}

export function mutateMyProfile() {
  const url = `${BACKEND_URL}/accounts/me`;
  mutate(url);
}

export function useProfile(accountId: string | null) {
  const url = accountId ? `${BACKEND_URL}/accounts/${accountId}` : null;
  return useSWR<ProfileResponseDTO>(url, fetcher);
}

export function mutateProfile(accountId: string) {
  const url = `${BACKEND_URL}/accounts/${accountId}`;
  mutate(url);
}

export function useAllProductCategories() {
  const url = `${BACKEND_URL}/categories`;
  return useSWR<{ id: string; name: string }[]>(url, fetcher);
}

export function mutateAllProductCategories() {
  const url = `${BACKEND_URL}/categories`;
  mutate(url);
}

export function use20LatestProducts() {
  return useProducts(null, null, null, null, null);
}

export function mutate20LatestProducts() {
  mutateProducts(null, null, null, null, null);
}

// eslint-disable-next-line max-params
export function useProducts(
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

  return useSWR<ProductGetAllResponseDTO>(url, fetcher);
}

// eslint-disable-next-line max-params
export function mutateProducts(
  productCategoryName: string | null,
  minimumPrice: number | null,
  maximumPrice: number | null,
  condition: ProductCondition | null,
  sortMode: ProductSortMode | null,
  query?: string,
) {
  let url = `${BACKEND_URL}/products?`;

  if (query) {
    url += `query=${query}`;
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

  mutate(url);
}

export function useMyActiveListings() {
  const url = `${BACKEND_URL}/products/my-active-listings`;
  return useSWR<ActiveListingsDTO>(url, authedFetcher);
}

export function mutateMyActiveListings() {
  const url = `${BACKEND_URL}/products/my-active-listings`;
  mutate(url);
}

export function useMySoldProducts() {
  const url = `${BACKEND_URL}/products/my-sold-products`;
  return useSWR<GetAllSoldProductsResponseDTO>(url, authedFetcher);
}

export function mutateMySoldProducts() {
  const url = `${BACKEND_URL}/products/my-sold-products`;
  mutate(url);
}

export function useMyProductsFromSubscribedCategories() {
  const url = `${BACKEND_URL}/products/my-subscribed-categories`;
  return useSWR<ProductGetAllResponseDTO>(url, authedFetcher);
}

export function mutateMyProductsFromSubscribedCategories() {
  const url = `${BACKEND_URL}/products/my-subscribed-categories`;
  mutate(url);
}

export function useProductById(productId: string) {
  const url = `${BACKEND_URL}/products/${productId}`;
  return useSWR<ProductGetResponseDTO>(url, fetcher);
}

export function mutateProductById(productId: string) {
  const url = `${BACKEND_URL}/products/${productId}`;
  mutate(url);
}

export function useTestAuth() {
  const url = `${BACKEND_URL}/tests/username`;
  return useSWR<{ username: string }>(url, authedFetcher);
}

export function mutateTestAuth() {
  const url = `${BACKEND_URL}/tests/username`;
  mutate(url);
}

export function useAllInboxMessages() {
  const url = `${BACKEND_URL}/inbox`;
  return useSWR<InboxGetAllResponseDTO[]>(url, authedFetcher);
}

export function mutateAllInboxMessages() {
  const url = `${BACKEND_URL}/inbox`;
  mutate(url);
}

export function useInboxMessageById(messageId: string) {
  const url = `${BACKEND_URL}/inbox/${messageId}`;
  return useSWR<InboxGetAllResponseDTO>(url, authedFetcher);
}

export function mutateInboxMessageById(messageId: string) {
  const url = `${BACKEND_URL}/inbox/${messageId}`;
  mutate(url);
}

export function useAllWatchlistEntries(loggedIn: boolean) {
  const url = loggedIn ? `${BACKEND_URL}/watchlist` : null;
  return useSWR<WatchListResponseDTO[]>(url, authedFetcher);
}

export function mutateAllWatchlistEntries() {
  const url = `${BACKEND_URL}/watchlist`;
  mutate(url);
}

export function useAllMyBuyOrders() {
  const url = `${BACKEND_URL}/orders`;
  return useSWR<OrderGetAllResponseDTO>(url, authedFetcher);
}

export function mutateAllMyBuyOrders() {
  const url = `${BACKEND_URL}/orders`;
  mutate(url);
}

export function useMyBuyOrdersBetween(start: Date, end: Date) {
  const url = `${BACKEND_URL}/orders?start=${start.toISOString()}&end=${end.toISOString()}`;
  return useSWR<OrderGetAllResponseDTO>(url, authedFetcher);
}

export function mutateMyBuyOrdersBetween(start: Date, end: Date) {
  const url = `${BACKEND_URL}/orders?start=${start.toISOString()}&end=${end.toISOString()}`;
  mutate(url);
}

export function useBuyOrderById(buyOrderId: string) {
  const url = `${BACKEND_URL}/orders/${buyOrderId}`;
  return useSWR<OrderGetResponseDTO>(url, authedFetcher);
}

export function mutateBuyOrderById(buyOrderId: string) {
  const url = `${BACKEND_URL}/orders/${buyOrderId}`;
  mutate(url);
}
