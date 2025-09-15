import type { Product } from "~/types";

export function ProductDetails({
  product,
  onCopy,
  copied,
}: {
  product: Product;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="w-full text-left" data-testid="product-details">
      <h2 className="text-xl font-semibold mb-2 text-white" data-testid="product-name">{product.name}</h2>
      <p className="text-gray-200 mb-4" data-testid="product-description">{product.description}</p>
      <div className="flex flex-col items-start gap-1">
        <span className="text-lg font-bold text-green-400" data-testid="product-price">${product.price.toFixed(2)}</span>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-300" data-testid="product-id">ID: {product.id}</span>
          <button
            onClick={onCopy}
            className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 focus:outline-none"
            aria-label="Copy ID"
            data-testid="copy-id-button"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}