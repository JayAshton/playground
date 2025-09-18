import type { Product } from "~/types";

export function ProductCard({
  product,
  isExpanded,
  isLong,
  displayName,
  onToggleExpand,
}: {
  product: Product;
  isExpanded: boolean;
  isLong: boolean;
  displayName: string;
  onToggleExpand: (id: number) => void;
}) {
  return (
    <div
      key={product.id}
      className="border rounded-3xl p-8 flex flex-col items-center shadow hover:shadow-xl transition min-h-[260px]"
      data-testid="product-card"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-40 h-40 object-cover mb-6 rounded-2xl"
        data-testid="product-image"
      />
      <h2 className="text-xl font-semibold mb-3 text-center w-full break-words" data-testid="product-name">
        {displayName}
        {isLong && !isExpanded && (
          <button
            className="ml-2 text-blue-600 underline text-sm"
            onClick={() => onToggleExpand(parseInt(product.id))}
            aria-label="Show more"
          >
            more
          </button>
        )}
        {isLong && isExpanded && (
          <button
            className="ml-2 text-blue-600 underline text-sm"
            onClick={() => onToggleExpand(parseInt(product.id))}
            aria-label="Show less"
          >
            less
          </button>
        )}
      </h2>
      <p className="text-lg text-gray-200 text-center font-medium" data-testid="product-price">
        ${product.price.toFixed(2)}
      </p>
      <a
        href={`/product/${product.id}`}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
        data-testid="view-product-button"
      >
        View Product
      </a>
    </div>
  );
}