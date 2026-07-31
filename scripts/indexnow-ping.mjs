// Сповіщає Bing/Яндекс (IndexNow) про всі URL сайту без потреби в акаунті.
// Запуск: node scripts/indexnow-ping.mjs
const SITE_URL = "https://streamair.vercel.app";
const KEY = "26924e7e11d24dccb1e4dbec0f1b5f9f";

const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`);
const sitemapXml = await sitemapRes.text();
const urlList = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`Submitted ${urlList.length} URLs, IndexNow responded: ${res.status}`);
