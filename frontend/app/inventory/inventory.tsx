import { useState } from "react";
import { ProductGrid } from "./components/ProductGrid";

type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
};

type InventoryProps = {
  products: Product[];
}

export function Inventory({ products }: InventoryProps) {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Set a character limit for truncation
  const NAME_LIMIT = 40;

  return (
    <main className="flex items-center justify-center pb-4 text-white">
      <div className="flex-1 flex flex-col items-center">
        <header className="flex flex-col items-center p-4">
          <div className="w-[500px] max-w-[100vw]">
            <h1 className="text-2xl font-bold text-center">Shop Inventory</h1>
          </div>
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