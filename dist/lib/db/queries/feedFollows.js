import { db } from "..";
import { feedFollows, users, feeds } from "../schema";
import { eq } from 'drizzle-orm';
export async function createFeedFollow(userId, feedId) {
    const [newFeedFollow] = await db.insert(feedFollows).values({ userId: userId, feedId: feedId }).returning();
    const results = await db
        .select({ id: feedFollows.id, createdAt: feedFollows.createdAt, updatedAt: feedFollows.updatedAt, feedId: feedFollows.feedId, feedName: feeds.name, feedUrl: feeds.url, userId: feedFollows.userId, userName: users.name })
        .from(feedFollows)
        .innerJoin(users, eq(users.id, feedFollows.userId))
        .innerJoin(feeds, eq(feeds.id, feedFollows.feedId))
        .where(eq(feedFollows.id, newFeedFollow.id));
    return results[0];
}
