import { useState } from "react";

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
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1 className="text-2xl font-bold text-center">Shop Inventory</h1>
          </div>
        </header>
        <div className="w-full max-w-8xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((product) => {
              const isLong = product.name.length > NAME_LIMIT;
              const isExpanded = expanded[product.id];
              const displayName = isExpanded || !isLong
                ? product.name
                : product.name.slice(0, NAME_LIMIT) + "...";

              return (
                <div
                  key={product.id}
                  className="border rounded-3xl p-8 flex flex-col items-center shadow hover:shadow-xl transition min-h-[260px]"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-40 h-40 object-cover mb-6 rounded-2xl"
                  />
                  <h2 className="text-xl font-semibold mb-3 text-center w-full break-words">
                    {displayName}
                    {isLong && !isExpanded && (
                      <button
                        className="ml-2 text-blue-600 underline text-sm"
                        onClick={() => toggleExpand(product.id)}
                        aria-label="Show more"
                      >
                        more
                      </button>
                    )}
                    {isLong && isExpanded && (
                      <button
                        className="ml-2 text-blue-600 underline text-sm"
                        onClick={() => toggleExpand(product.id)}
                        aria-label="Show less"
                      >
                        less
                      </button>
                    )}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-200 text-center font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                  <a
                    href={`/product/${product.id}`}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                  >
                    View Product
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
