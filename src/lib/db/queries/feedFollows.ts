import { db } from "..";
import { feedFollows, users, feeds } from "../schema";
import { and, eq} from 'drizzle-orm';

export async function createFeedFollow(userId: string, feedId: string) {
  const [newFeedFollow] = await db.insert(feedFollows).values({userId: userId, feedId: feedId}).returning();
  const results = await db
    .select({id: feedFollows.id, createdAt: feedFollows.createdAt, updatedAt: feedFollows.updatedAt,feedId: feedFollows.feedId, feedName: feeds.name, feedUrl: feeds.url, userId: feedFollows.userId, userName: users.name})
    .from(feedFollows)
    .innerJoin(users, eq(users.id, feedFollows.userId))
    .innerJoin(feeds, eq(feeds.id, feedFollows.feedId))
    .where(eq(feedFollows.id, newFeedFollow.id));

  return results[0];
}

export async function getFeedFollowsForUser(userId: string) { 
  const results = await db
    .select({id: feedFollows.id, createdAt: feedFollows.createdAt, updatedAt: feedFollows.updatedAt,feedId: feedFollows.feedId, feedName: feeds.name, userId: feedFollows.userId, userName: users.name})
    .from(feedFollows)
    .innerJoin(users, eq(users.id, feedFollows.userId))
    .innerJoin(feeds, eq(feeds.id, feedFollows.feedId))
    .where(eq(feedFollows.userId, userId));
  return results;
}

export async function deleteFeedFollow(userId: string, feedId: string) { 
  const result = await db.delete(feedFollows).where(eq(feedFollows.userId, userId) && eq(feedFollows.feedId, feedId));
  return result;
}
