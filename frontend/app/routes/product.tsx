import { useLoaderData } from "react-router";
import { config } from "~/config";
import { ProductComponent } from "~/inventory/product";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shop App" },
  ];
}

export async function loader({params}) {
  const productRequest = await fetch(`${config.productsUrl}/find/${params.productId}`);
  if (!productRequest.ok) throw new Error(`Failed to fetch product: ${params.productId}`);
  const products: Product = await productRequest.json();

  const reviewsRequest = await fetch(`${config.reviewsUrl}/${params.productId}`);
  if (!reviewsRequest.ok) throw new Error(`Failed to fetch reviews for product: ${params.productId}`);
  const reviews: Review[] = await reviewsRequest.json();

  return { product: products, reviews: reviews };
}

export default function Product() {
  const data = useLoaderData<typeof loader>();
  return <ProductComponent data={data} />;
}
