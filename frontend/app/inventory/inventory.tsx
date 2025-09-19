import { useState } from "react";
import { Link } from "react-router";
import type { Product } from "~/types";
import { ProductGrid } from "./components/ProductGrid";

type InventoryProps = {
  products: Product[];
}

export function Inventory({ products }: InventoryProps) {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const NAME_LIMIT = 40;

  return (
    <main className="flex items-center justify-center pb-4 text-white">
      <div className="flex-1 flex flex-col items-center">
        <header className="w-full p-4 flex justify-center items-center">
          <h1 className="text-2xl font-bold text-white">
            <Link to="/">Shop Inventory</Link>
          </h1>
        </header>
        <div className="w-full max-w-8xl px-10">
          <ProductGrid
            products={products}
            expanded={expanded}
            toggleExpand={toggleExpand}
            nameLimit={NAME_LIMIT}
          />
        </div>
      </div>
    </main>
  );
}