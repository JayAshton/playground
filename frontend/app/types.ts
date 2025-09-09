export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
};

export type Review = {
  id: number;
  productId: number;
  rating: number;
  description?: string;
};
