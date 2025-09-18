import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("product/:productId", "routes/product.tsx"),
  route("basket", "routes/basket.tsx"),
] satisfies RouteConfig;
