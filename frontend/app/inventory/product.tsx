import { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Product, Review } from "~/types";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImage } from "./components/ProductImage";
import { ProductReviews } from "./components/ProductReviews";

type ProductData = {
  data: { product: Product; reviews: Review[] };
}

export function ProductComponent({ data }: ProductData) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.product.id.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleOpenBasket = async () => {
    const basket = JSON.parse(localStorage.getItem("basket") || "[]");

    try {
      const response = await fetch("http://localhost/basket-api/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(basket),
      });

      if (!response.ok) throw new Error("Failed to sync basket");

      const result = await response.json();
      localStorage.setItem("sessionId", result.sessionId);

      navigate("/basket");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="pb-4 min-h-screen">
      <div className="flex-1 flex flex-col items-start gap-12 min-h-0 max-w-lg w-full mx-auto items-start items-center">
        <header className="w-full p-4 flex justify-center items-center">
          <h1 className="text-2xl font-bold text-white">
            <Link to="/">Shop Inventory</Link>
          </h1>
        </header>
        <div className="flex flex-col items-start gap-6 w-full rounded-lg shadow p-6">
          <ProductImage imageUrl={data.product.imageUrl} name={data.product.name} />
          <ProductDetails
            product={data.product}
            onCopy={handleCopy}
            copied={copied}
            onOpenBasket={handleOpenBasket}
          />
          <ProductReviews reviews={data.reviews} />
        </div>
      </div>
    </main>
  );
}
