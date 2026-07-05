import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductById } from "@/data/products";
import { PAINT_LINE_LABELS } from "@/data/types";
import { getProductName, getProductSubtitle, formatPrice } from "@/lib/format";
import ProductDetailActions from "@/components/ProductDetailActions";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  return { title: product ? `${getProductName(product)} — StreamAIR` : "Товар не знайдено" };
}

function getBackLink(product: NonNullable<ReturnType<typeof getProductById>>) {
  switch (product.category) {
    case "paint":
      return { href: `/farby/${product.line}`, label: `← ${product.line ? PAINT_LINE_LABELS[product.line] : "Фарби"}` };
    case "stencil":
      return { href: "/trafarety", label: "← Трафарети" };
    case "accessory":
    case "care":
      return { href: "/materialy", label: "← Додаткові матеріали" };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const back = getBackLink(product);
  const subtitle = getProductSubtitle(product);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href={back.href} className="text-sm opacity-60 hover:opacity-100">
        {back.label}
      </Link>

      <div className="mt-6 grid sm:grid-cols-2 gap-8 items-start">
        <div className="relative aspect-square card-surface rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={getProductName(product)}
            fill
            sizes="(max-width: 640px) 100vw, 480px"
            className="object-contain p-6"
          />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold">
            {getProductName(product)}
            {subtitle && <span className="opacity-60 font-semibold"> · {subtitle}</span>}
            {" · "}
            {formatPrice(product.price)}
          </h1>
          <p className="text-sm opacity-60 mt-3 max-w-md">{product.descriptionShort}</p>

          <div className="mt-6">
            <ProductDetailActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
