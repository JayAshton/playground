import { useState } from "react";

type ProductProp = {
  product: Product;
}

export function ProductPage({ product }: ProductProp) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(product.id.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <main className="pt-16 pb-4 min-h-screen flex flex-col items-start">
      <div className="flex-1 flex flex-col items-start gap-12 min-h-0 max-w-lg w-full mx-auto">
        <header className="w-full p-4">
          <h1 className="text-2xl font-bold text-left text-white">Shop Inventory</h1>
        </header>
        <div className="flex flex-col items-start gap-6 w-full rounded-lg shadow p-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-64 h-64 object-cover rounded-md border border-gray-700 self-center"
          />
          <div className="w-full text-left">
            <h2 className="text-xl font-semibold mb-2 text-white">{product.name}</h2>
            <p className="text-gray-200 mb-4">{product.description}</p>
            <div className="flex flex-col items-start gap-1">
              <span className="text-lg font-bold text-green-400">${product.price}</span>
              <div className="h-5" />
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-300">ID: {product.id}</span>
                <button
                  onClick={handleCopy}
                  className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 focus:outline-none"
                  aria-label="Copy ID"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}