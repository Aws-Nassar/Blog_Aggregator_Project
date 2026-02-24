import { XMLParser } from "fast-xml-parser";
export async function fetchFeed(feedURL) {
    const res = await fetch(feedURL, { headers: { "User-Agent": "gator" } });
    if (!res.ok) {
        throw new Error("Error occured while returing rthe promise.");
    }
    const xml = await res.text();
    const parsed = new XMLParser().parse(xml);
    const channel = parsed.rss?.channel;
    if (!channel) {
        throw new Error("Missing channel field.");
    }
    if (!channel.title || !channel.link || !channel.description) {
        throw new Error("Missing channel field/s.");
    }
    const rssFeed = { channel: {
            title: channel.title,
            link: channel.link,
            description: channel.description,
            item: []
        } };
    if (!channel.item) {
        console.log("There is/are no feed item/s");
        return rssFeed;
    }
    const items = Array.isArray(channel.item) ? channel.item : [channel.item];
    for (const item of items) {
        if (item.title && item.link && item.description && item.pubDate) {
            const newItem = {
                title: item.title,
                link: item.link,
                description: item.description,
                pubDate: item.pubDate
            };
            rssFeed.channel.item.push(newItem);
        }
    }
    return rssFeed;
}
