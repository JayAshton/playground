import { useState } from "react";
import type { Product, Review } from "~/types";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImage } from "./components/ProductImage";
import { ProductReviews } from "./components/ProductReviews";

type ProductData = {
  data: { product: Product; reviews: Review[] };
}

export function ProductComponent({ data }: ProductData) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.product.id.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <main className="pb-4 min-h-screen flex flex-col items-start">
      <div className="flex-1 flex flex-col items-start gap-12 min-h-0 max-w-lg w-full mx-auto">
        <header className="w-full p-4">
          <h1 className="text-2xl font-bold text-left text-white">Shop Inventory</h1>
        </header>
        <div className="flex flex-col items-start gap-6 w-full rounded-lg shadow p-6">
          <ProductImage imageUrl={data.product.imageUrl} name={data.product.name} />
          <ProductDetails product={data.product} onCopy={handleCopy} copied={copied} />
          <ProductReviews reviews={data.reviews} />
        </div>
      </div>
    </main>
  );
}