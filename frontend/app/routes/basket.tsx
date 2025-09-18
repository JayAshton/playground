import { useEffect, useState } from "react";
import { BasketComponent } from "~/inventory/components/Basket";
import type { BasketItem } from "~/types";

export default function BasketRoute() {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost/basket-api?sessionId=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items ?? []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white p-4">Loading basket...</p>;
  return <BasketComponent items={items} />;
}
