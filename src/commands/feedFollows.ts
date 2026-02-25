import { createFeedFollow, getFeedFollowsForUser } from "../lib/db/queries/feedFollows";
import { getFeedByURL } from "../lib/db/queries/feeds";
import { readConfig  } from "../config"
import { getUser } from "../lib/db/queries/users";
import { User } from "src/lib/db/schema";

export async function handlerFollow (cmdName: string,user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    } 

    const feed =  await getFeedByURL(args[0]);
    if (!feed) {
        throw new Error("Couldn't find the feed that was created for the URL.");
    }

    if (!feed.id || !feed.userId)
    {
        throw new Error("Couldn't find user/feed id whose related to the feed.");
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