import type { BasketItem } from "~/types";

export function BasketComponent({ items }: { items: BasketItem[] }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-white p-4">Your basket is empty.</p>;
  }

  return (
    <div className="p-6 text-white max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Basket</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg shadow hover:bg-gray-800 transition"
          >
            {/* Product Image */}
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}
            {/* Product Details */}
            <div className="flex-1 flex flex-col">
              <span className="font-semibold text-lg">{item.productName}</span>
              <span className="text-gray-400 text-sm">Qty: {item.quantity}</span>
            </div>
            {/* Optional: total price or remove button */}
            {/* <span className="font-bold text-green-400">${item.price * item.quantity}</span> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
