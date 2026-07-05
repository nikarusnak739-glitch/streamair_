import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage, escapeHtml } from "@/lib/telegram";

interface OrderItem {
  title: string;
  number?: string;
  volume?: string;
  price: number;
  qty: number;
}

interface OrderCustomer {
  name: string;
  phone: string;
  city: string;
  branch: string;
  comment?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: OrderItem[] = body?.items ?? [];
    const total: number = body?.total ?? 0;
    const customer: OrderCustomer = body?.customer ?? {};

    if (!items.length || !customer?.name || !customer?.phone) {
      return NextResponse.json({ ok: false, error: "invalid payload" }, { status: 400 });
    }

    const itemLines = items.map((i) => {
      const label = i.number ? `${i.title} №${i.number}` : i.title;
      return `• ${escapeHtml(label)}${i.volume ? `, ${escapeHtml(i.volume)}` : ""} — ${i.qty} × ${i.price} ₴`;
    });

    const lines = [
      "🧾 <b>Нове замовлення</b>",
      "",
      ...itemLines,
      "",
      `<b>Сума: ${total} ₴</b>`,
      "",
      `Ім'я: ${escapeHtml(customer.name)}`,
      `Телефон: ${escapeHtml(customer.phone)}`,
      `Доставка: Нова Пошта, ${escapeHtml(customer.city ?? "")}, відділення ${escapeHtml(customer.branch ?? "")}`,
    ];

    if (customer.comment) {
      lines.push(`Коментар: ${escapeHtml(customer.comment)}`);
    }

    await sendTelegramMessage(lines.join("\n"));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/order]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
