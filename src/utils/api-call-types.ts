/* eslint-disable no-unused-vars */

export enum ProductCondition {
  BRAND_NEW,
  NEW,
  USED,
  POOR_CONDITION,
  NOT_WORKING,
}

export enum ProductSortMode {
  ASCENDING,
  DESCENDING,
}

export enum ProductColor {
  UNDEFINED,
  BLACK,
  WHITE,
  RED,
  BLUE,
  GREEN,
  YELLOW,
  ORANGE,
  PURPLE,
  PINK,
  GRAY,
  BROWN,
  SILVER,
  GOLD,
}

export type ProductBuyOrder = {
  productId: string;
};
