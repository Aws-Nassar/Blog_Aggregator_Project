import { db } from "..";
import { feeds } from "../schema";
export async function createFeed(name, url, userId) {
    const [result] = await db.insert(feeds).values({ name: name, url: url, userId: userId }).returning();
    return result;
}
