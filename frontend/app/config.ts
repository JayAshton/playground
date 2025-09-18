import process from "node:process";

export const config = {
  productsUrl: process.env.APP_PRODUCTS_URL || "http://localhost/product-api",
  reviewsUrl: process.env.APP_REVIEWS_URL || "http://localhost/review-api",
  basketUrl: process.env.APP_BASKET_URL || "http://localhost/basket-api",
};
