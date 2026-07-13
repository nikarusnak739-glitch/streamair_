import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { INSTAGRAM_URL } from "@/lib/constants";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "800"],
});

const SITE_URL = "https://streamair.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "StreamAIR — фарби та трафарети для аерографії",
    template: "%s | StreamAIR",
  },
  description:
    "StreamAIR (СтрімЕйр) — інтернет-магазин фарб для аерографії: Basic, Neon, Nude, Pearl, трафарети та приладдя. Доставка по Україні.",
  keywords: [
    "StreamAIR",
    "СтрімЕйр",
    "стримэйр",
    "streamair aerography",
    "фарби для аерографії",
    "трафарети для аерографії",
    "аерографія нігті",
  ],
  applicationName: "StreamAIR",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: "StreamAIR",
    title: "StreamAIR — фарби та трафарети для аерографії",
    description:
      "Фірмові фарби, трафарети та приладдя StreamAIR для аерографії. Доставка по Україні.",
    images: [{ url: "/images/misc/logo.png" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StreamAIR",
    alternateName: "StreamAIR Aerography",
    url: SITE_URL,
    logo: `${SITE_URL}/images/misc/logo.png`,
    sameAs: [INSTAGRAM_URL],
  };

  return (
    <html lang="uk" className={`${manrope.variable} ${unbounded.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <div className="gradient-bg" aria-hidden="true" />
        <CartProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
