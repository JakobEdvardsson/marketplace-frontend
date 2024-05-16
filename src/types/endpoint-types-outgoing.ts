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
  color?: number;
  productionYear?: number;
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
