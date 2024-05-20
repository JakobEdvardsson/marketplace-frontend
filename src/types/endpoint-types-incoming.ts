export interface OrderGetAllResponseDTO {
  orders: OrderRegisteredResponseDTO[];
}

export interface OrderGetResponseDTO {
  orderId: string;
  timeOfPurchase: Date;
  orderItems: OrderItemRegisteredResponseDTO[];
}

export interface OrderItemRegisteredResponseDTO {
  productId: string;
  productName: string;
  price: number;
  error: boolean;
  purchaseStatus: number;
}

export interface OrderRegisteredResponseDTO {
  orderId: string;
  timeOfPurchase: string; // Instant
  orderItems: OrderItemRegisteredResponseDTO[];
}

export interface OrderStatusResponseDTO {
  status: number;
}

export interface ActiveListingDTO {
  id: string;
  productName: string;
  productCategoryName: string;
  price: number;
  productStatus: number;
  createdAt: string; // Instant
  buyer: ProfileResponseDTO;
}

export interface ActiveListingsDTO {
  activeListings: ActiveListingDTO[];
}

export interface GetAllSoldProductsResponseDTO {
  soldProducts: GetSoldProductResponseDTO[];
}

export interface GetSoldProductResponseDTO {
  productId: string;
  name: string;
  productCategoryName: string;
  price: number;
  buyer: string; // UUID
  createdAt: string; // Instant
}

export interface ProductGetAllResponseDTO {
  products: ProductGetResponseDTO[];
}

export interface ProductGetResponseDTO {
  productId: string;
  name: string;
  productCategory: ProductCategoryDTO;
  price: number;
  condition: number;
  status: number;
  description: string;
  seller: string;
  buyer: string;
  color: number | undefined;
  productionYear: number | undefined;
  createdAt: string; // Instant
  imageUrls: string[];
}

export interface ProductRegisteredResponseDTO {
  id: string;
  name: string;
  type: string; // UUID
  price: number;
  condition: number;
  description: string;
  seller: string; // UUID
  imageUrls: string[];
  color: number | undefined;
  productionYear: number | undefined;
}

export interface InboxGetAllResponseDTO {
  id: string;
  message: string;
  isRead: boolean;
  sentAt: string; // Instant
  productId: string;
}

export interface MyProfileResponseDTO {
  firstName: string;
  lastName: string;
  dateOfBirth: string; // Date
  username: string;
  email: string;
}

export interface ProfileResponseDTO {
  firstName: string;
  lastName: string;
  username: string;
}

export interface UserRegisteredResponseDTO {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dateOfBirth: string; // Date
}

export interface WatchListResponseDTO {
  id: string;
  productCategory: ProductCategoryDTO;
}

export interface ProductCategoryDTO {
  id: string;
  name: string;
}
