import useSWR from "swr";
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
const BACKEND_URL = `${BACKEND_HOST}/${BACKEND_API_VERSION}`;

const fetcher = (url: string): Promise<any> =>
  fetch(url, { credentials: "omit" }).then((res) => res.json());

const authedFetcher = (url: string): Promise<any> =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export function useMyProfile() {
  const url = `${BACKEND_URL}/accounts/me`;
  return useSWR<MyProfileResponseDTO>(url, authedFetcher);
}

export function useProfile(accountId: string) {
  const url = `${BACKEND_URL}/accounts/${accountId}`;
  return useSWR<ProfileResponseDTO>(url, fetcher);
}

export function useAllProductCategories() {
  const url = `${BACKEND_URL}/categories`;
  return useSWR<{ id: string; name: string }[]>(url, fetcher);
}

export function use20LatestProducts() {
  return useProducts(null, null, null, null, null);
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

  return useSWR<ProductGetAllResponseDTO>(url, fetcher);
}

export function useMyActiveListings() {
  const url = `${BACKEND_URL}/products/my-active-listings`;
  return useSWR<ActiveListingsDTO>(url, authedFetcher);
}

export function useMySoldProducts() {
  const url = `${BACKEND_URL}/products/my-sold-products`;
  return useSWR<GetAllSoldProductsResponseDTO>(url, authedFetcher);
}

export function useMyProductsFromSubscribedCategories() {
  const url = `${BACKEND_URL}/products/my-subscribed-categories`;
  return useSWR<ProductGetAllResponseDTO>(url, authedFetcher);
}

export function useProductById(productId: string) {
  const url = `${BACKEND_URL}/products/${productId}`;
  return useSWR<ProductGetResponseDTO>(url, fetcher);
}

export function useTestAuth() {
  const url = `${BACKEND_URL}/tests/username`;
  return useSWR<{ username: string }>(url, authedFetcher);
}

export function useAllInboxMessages() {
  const url = `${BACKEND_URL}/inbox`;
  return useSWR<InboxGetAllResponseDTO[]>(url, authedFetcher);
}

export function useInboxMessageById(messageId: string) {
  const url = `${BACKEND_URL}/inbox/${messageId}`;
  return useSWR<InboxGetAllResponseDTO>(url, authedFetcher);
}

export function useAllWatchlistEntries() {
  const url = `${BACKEND_URL}/watchlist`;
  return useSWR<WatchListResponseDTO[]>(url, authedFetcher);
}

export function useAllMyBuyOrders() {
  const url = `${BACKEND_URL}/orders`;
  return useSWR<OrderGetAllResponseDTO>(url, authedFetcher);
}

export function useMyBuyOrdersBetween(start: Date, end: Date) {
  const url = `${BACKEND_URL}/orders?start=${start.toISOString()}&end=${end.toISOString()}`;
  return useSWR<OrderGetAllResponseDTO>(url, authedFetcher);
}

export function useBuyOrderById(buyOrderId: string) {
  const url = `${BACKEND_URL}/orders/${buyOrderId}`;
  return useSWR<OrderGetResponseDTO>(url, authedFetcher);
}
