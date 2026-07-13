import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const SITE_URL = "https://streamair-shop.vercel.app";
const PAINT_LINES = ["basic", "neon", "nude", "pearl"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/farby", "/trafarety", "/materialy"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const paintLineRoutes = PAINT_LINES.map((line) => ({
    url: `${SITE_URL}/farby/${line}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${SITE_URL}/product/${product.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...paintLineRoutes, ...productRoutes];
}
