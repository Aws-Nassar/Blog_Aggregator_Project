import { getUserById } from "../lib/db/queries/users";
import { createFeed, getFeeds } from "../lib/db/queries/feeds";
import { createFeedFollow } from "../lib/db/queries/feedFollows";
import {User} from "../lib/db/schema";

export async function handlerAddFeed (cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <name> <url>`);
    } 

    const currentUserId: string = user.id; 
    const feed = await createFeed(args[0], args[1], currentUserId);

    if (!feed)
    {
        throw new Error("This feed already exist.")
    }
    const feedFollow = await createFeedFollow(user.id, feed.id);
    if (!feedFollow)
    {
        throw new Error("Error ouccared wile create the feed follow.")
    }
    console.log(feedFollow.feedName);
    console.log(feedFollow.userName);
};  

/*function printFeed(feed: Feed, user:User) {
    console.log(`User Info: name: ${user.name}, ID: ${user.id}\n has created this/those feed/s:-`);
    console.log(`Feed: ${feed.name}, ${feed.id}, ${feed.url}, created at: ${feed.createdAt}, updated at: ${feed.updatedAt}`);
}*/

export async function handlerFeeds (cmdName: string) {
    const feeds = await getFeeds();
    if (!feeds)
    {
        throw new Error("Error occurred while fetching the feeds.");
    }

    for (const feed of feeds) {
        const user = await getUserById(feed.user_id);
        if (!user) {
            throw new Error("Couldn't found the user who created the feed.");
        }
        console.log(`${feed.name}\n${feed.url}\n${user.name}`);
    }
    return;
}