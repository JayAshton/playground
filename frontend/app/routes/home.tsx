import { useLoaderData } from "react-router";
import { config } from "~/config";
import { Inventory } from "../inventory/inventory";

export function meta() {
  return [
    { title: "Inventory | Shop App" },
  ];
}

export async function loader() {
  const res = await fetch(`${config.productsUrl}/all`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default function Home() {
  const products = useLoaderData<typeof loader>();
  return <Inventory products={products} />;
}
