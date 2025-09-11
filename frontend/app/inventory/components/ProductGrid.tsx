import type { Product } from "~/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  expanded,
  toggleExpand,
  nameLimit,
}: {
  products: Product[];
  expanded: { [key: number]: boolean };
  // eslint-disable-next-line no-unused-vars
  toggleExpand: (_id: number) => void;
  nameLimit: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {products.map((product) => {
        const isLong = product.name.length > nameLimit;
        const isExpanded = expanded[product.id];
        const displayName =
          isExpanded || !isLong
            ? product.name
            : product.name.slice(0, nameLimit) + "...";

        return (
          <ProductCard
            key={product.id}
            product={product}
            isExpanded={isExpanded}
            isLong={isLong}
            displayName={displayName}
            onToggleExpand={toggleExpand}
          />
        );
      })}
    </div>
  );
}