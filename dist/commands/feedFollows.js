import { createFeedFollow } from "../lib/db/queries/feedFollows";
import { getFeedByURL } from "../lib/db/queries/feeds";
import { readConfig } from "../config";
import { getUser } from "../lib/db/queries/users";
export async function handlerFollow(cmdName, ...args) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }
    const feed = await getFeedByURL(args[0]);
    if (!feed) {
        throw new Error("Couldn't find the feed that was created for the URL.");
    }
    if (!feed.id || !feed.userId) {
        throw new Error("Couldn't find user/feed id whose related to the feed.");
    }
    const currentUserName = readConfig().currentUserName;
    const user = await getUser(currentUserName);
    if (!user) {
        throw new Error("Couldn't found the user.");
    }
    const feedFollows = await createFeedFollow(user.id, feed.id);
    if (!feedFollows) {
        throw new Error("Couldn't find the feed follow that was created for the URL.");
    }
    console.log(feedFollows.feedName);
    console.log(feedFollows.userName);
}
