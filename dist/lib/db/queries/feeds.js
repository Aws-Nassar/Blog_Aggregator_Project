import { db } from "..";
import { feeds } from "../schema";
import { eq } from 'drizzle-orm';
export async function createFeed(name, url, userId) {
    const [result] = await db.insert(feeds).values({ name: name, url: url, userId: userId }).returning();
    return result;
}
export async function getFeeds() {
    const result = await db.select({ name: feeds.name, url: feeds.url, user_id: feeds.userId }).from(feeds);
    return result;
}
export async function getFeedByURL(url) {
    const result = await db.select()
        .from(feeds)
        .where(eq(feeds.url, url));
    return result[0];
}
