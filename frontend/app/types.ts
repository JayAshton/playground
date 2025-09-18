export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
};

export type Review = {
  id: string;
  productId: string;
  rating: number;
  description?: string;
};

export type BasketItem = {
  productId: string;
  productName: string;
  quantity: number;
  imageUrl: string;
};
