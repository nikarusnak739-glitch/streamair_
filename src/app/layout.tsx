import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "StreamAIR Aerography — фарби та трафарети для аерографії",
  description:
    "Інтернет-магазин фарб для аерографії StreamAIR: Basic, Neon, Nude, Pearl, трафарети та приладдя. Доставка по Україні.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
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
