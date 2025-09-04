import { useLoaderData } from "react-router";
import { ProductPage } from "~/inventory/product-page";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shop App - Inventory" },
  ];
}

export async function loader({params}) {
  const url = process.env.PRODUCTS_API_URL || "http://localhost/products";
  const res = await fetch(`${url}/find/${params.productId}`);
  if (!res.ok) throw new Error(`Failed to fetch product: ${params.productId}`);
  return res.json();
}

export default function Product() {
  const product = useLoaderData<typeof loader>();
  return <ProductPage product={product} />;
}
