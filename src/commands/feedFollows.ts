import { createFeedFollow, getFeedFollowsForUser, deleteFeedFollow } from "../lib/db/queries/feedFollows";
import { getFeedByURL } from "../lib/db/queries/feeds";
import { User } from "src/lib/db/schema";

export async function handlerFollow (cmdName: string,user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    } 

    const feed =  await getFeedByURL(args[0]);
    if (!feed) {
        throw new Error("Couldn't find the feed that was created for the URL.");
    }

    if (!feed.id || !user.id)
    {
        throw new Error("Couldn't find feed/ user id.");
    }

    const feedFollow = await createFeedFollow(user.id,feed.id);

    if (!feedFollow) {
        throw new Error("Couldn't find the feed follow that was created for the URL.");
    }

    console.log(feedFollow.feedName);
    console.log(feedFollow.userName);
}

export async function handlerFollowing (cmdName: string, user: User,) {
    const feedFollows = await getFeedFollowsForUser(user.id);

    if (feedFollows.length === 0) {
        return;
    }

    feedFollows.forEach(element => {
        console.log(element.feedName);
    });
}

export async function handlerUnFollow (cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }

    const feed = await getFeedByURL(args[0]);
    if (!feed) {
        throw new Error("Couldn't find the feed that was created for the URL.");
    }

    if (!feed.id || !user.id)
    {
        throw new Error("Couldn't find feed/ user id.");
    }

    const result = await deleteFeedFollow(user.id, feed.id);

    if (!result)
    {
        throw new Error("Error happen while deleteing the feed follow.");
    }
}