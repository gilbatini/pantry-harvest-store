import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import ProductView from "./ProductView";

export const generateStaticParams = () => PRODUCTS.map((p) => ({ handle: p.handle }));

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const p = PRODUCTS.find((x) => x.handle === handle);
  return p ? { title: `${p.title} — The Pantry Harvest Co.`, description: p.description } : {};
}

export default async function Page({ params }) {
  const { handle } = await params;
  const product = PRODUCTS.find((p) => p.handle === handle);
  if (!product) notFound();
  return <ProductView handle={handle} />;
}
