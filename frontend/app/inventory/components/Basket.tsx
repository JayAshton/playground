import { useState } from "react";
import { Link } from "react-router";
import type { BasketItem } from "~/types";

export function BasketComponent({ items: initialItems }: { items: BasketItem[] }) {
  const [items, setItems] = useState<BasketItem[]>(initialItems);

  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-white p-4">Your basket is empty.</p>;
  }

  const handleRemove = async (productId: string) => {
    const updatedItems = items.filter(item => item.productId !== productId);
    setItems(updatedItems);

    localStorage.setItem("basket", JSON.stringify(updatedItems));

    try {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) return;

      const response = await fetch(`http://localhost/basket-api/${sessionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItems),
      });

      if (!response.ok) throw new Error("Failed to update basket");
    } catch (err) {
      console.error("Error updating basket:", err);
      setItems(items);
    }
  };

  return (
    <div className="text-white max-w-2xl mx-auto">
      <header className="w-full p-4 flex justify-center items-center">
          <h1 className="text-2xl font-bold text-white">
            <Link to="/">Shop Inventory</Link>
          </h1>
        </header>
      <h1 className="text-3xl font-bold mb-6 text-center">Your Basket</h1>
      <ul className="space-y-4" data-testid="basket-items-list">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg shadow hover:bg-gray-800 transition"
            data-testid="basket-item"
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded"
                data-testid="basket-item-image"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-sm" data-testid="basket-item-no-image">
                No Image
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <span className="font-semibold text-lg">Product: <b data-testid="basket-item-name">{item.productName}</b></span>
              <span className="text-gray-400 text-sm">Qty: <b data-testid="basket-item-quantity">{item.quantity}</b></span>
            </div>
            <button
              onClick={() => handleRemove(item.productId)}
              className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-white text-sm font-semibold cursor-pointer"
              data-testid="basket-item-remove"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
