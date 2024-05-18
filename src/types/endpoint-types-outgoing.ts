export interface OrderDTO {
  orderItemDTOS: OrderItemDTO[];
}

export interface OrderItemDTO {
  productId: string;
}

export interface PasswordChangeDTO {
  oldPassword: string;
  newPassword: string;
}

export interface ProductCategoryDTO {
  id: string;
  name: string;
}

export interface ProductDTO {
  name: string;
  productCategory: string; // UUID
  price: number;
  condition: number;
  description: string;
  color: number | undefined;
  productionYear: number | undefined;
  productId: string;
}

export interface StatusDTO {
  accept: boolean;
}

export interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  dateOfBirth: string; // Date
}

export interface CartProductDTO {
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
