import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, number, volume, price, qty } = body ?? {};

    if (!title) {
      return NextResponse.json({ ok: false, error: "missing title" }, { status: 400 });
    }

    const label = number ? `${title} №${number}` : title;
    const lines = [
      "🛒 <b>Додано в кошик</b>",
      `${label}${volume ? `, ${volume}` : ""}`,
      `Кількість: ${qty ?? 1} × ${price ?? "?"} ₴`,
    ];

    await sendTelegramMessage(lines.join("\n"));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/notify-cart]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
