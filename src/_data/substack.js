// Pulls the latest posts from Halie's Substack at build time. Empty until the publication has posts.
export default async function () {
  const url = "https://urbansophisticateltd.substack.com/feed";
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0) Chrome/124" } });
    const xml = await res.text();
    if (!xml.trim().startsWith("<?xml") && !xml.includes("<rss")) return [];
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 3).map((m) => {
      const g = (tag) => { const r = m[1].match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`)); return r ? r[1].trim() : ""; };
      return { title: g("title"), link: g("link"), date: g("pubDate").slice(0, 16), summary: g("description").replace(/<[^>]+>/g, "").slice(0, 180), image: (m[1].match(/<enclosure[^>]*url="([^"]+)"/) || [])[1] || "" };
    });
    return items;
  } catch { return []; }
}
