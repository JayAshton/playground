import { useLoaderData } from "react-router";
import { Inventory } from "../inventory/inventory";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shop App - Inventory" },
  ];
}

export async function loader() {
  const url = process.env.PRODUCTS_API_URL || "http://localhost/products";
  console.log(url);
  const res = await fetch(`${url}/all`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default function Home() {
  const products = useLoaderData<typeof loader>();
  return <Inventory products={products} />;
}
