type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
};

type Review = {
  id: number;
  productId: number;
  rating: number;
  description?: string;
};
