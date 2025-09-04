import { useLoaderData } from "react-router";
import { Inventory } from "../inventory/inventory";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shop App - Inventory" },
  ];
}

export async function loader() {
  const res = await fetch("http://localhost/products/all");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default function Home() {
  const products = useLoaderData<typeof loader>();
  return <Inventory products={products} />;
}
