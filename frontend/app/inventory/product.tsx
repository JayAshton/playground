import { useState } from "react";

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
    <main className="pt-16 pb-4 min-h-screen flex flex-col items-start">
      <div className="flex-1 flex flex-col items-start gap-12 min-h-0 max-w-lg w-full mx-auto">
        <header className="w-full p-4">
          <h1 className="text-2xl font-bold text-left text-white">Shop Inventory</h1>
        </header>
        <div className="flex flex-col items-start gap-6 w-full rounded-lg shadow p-6">
          <img
            src={data.product.imageUrl}
            alt={data.product.name}
            className="w-64 h-64 object-cover rounded-md border border-gray-700 self-center"
          />
          <div className="w-full text-left">
            <h2 className="text-xl font-semibold mb-2 text-white">{data.product.name}</h2>
            <p className="text-gray-200 mb-4">{data.product.description}</p>
            <div className="flex flex-col items-start gap-1">
              <span className="text-lg font-bold text-green-400">${data.product.price}</span>
              <div className="h-5" />
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-300">ID: {data.product.id}</span>
                <button
                  onClick={handleCopy}
                  className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 focus:outline-none"
                  aria-label="Copy ID"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            {/* Reviews Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Reviews</h3>
              {data.reviews.length === 0 ? (
                <p className="text-gray-400">No reviews yet.</p>
              ) : (
                <ul className="space-y-4">
                  {data.reviews.map((review, idx) => (
                    <li key={idx} className="bg-gray-800 rounded-lg p-4 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-400 font-semibold">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </span>
                      </div>
                      <p className="text-gray-200">{review.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}