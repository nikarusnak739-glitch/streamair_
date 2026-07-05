export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не задані — повідомлення не надіслано. " +
        "Дивіться README для інструкції з підключення."
    );
    console.warn("[telegram] Текст повідомлення, яке мало б піти:\n" + text);
    return;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[telegram] Помилка надсилання повідомлення:", res.status, body);
  }
}
