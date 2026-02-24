import { fetchFeed } from "../lib/rss";
import { readConfig } from "../config";
import { getUser } from "../lib/db/queries/users";
import { createFeed } from "../lib/db/queries/feeds";
export async function handlerAggregate(cmdName) {
    const url = "https://www.wagslane.dev/index.xml";
    console.log(JSON.stringify(await fetchFeed(url), null, 2));
}
;
export async function handlerAddFeed(cmdName, ...args) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <name> <url>`);
    }
    const currentUserName = readConfig().currentUserName;
    const user = await getUser(currentUserName);
    if (!user) {
        throw new Error("Couldn't found the user who created the feed.");
    }
    const currentUserId = user.id;
    const result = await createFeed(args[0], args[1], currentUserId);
    if (!result) {
        throw new Error("This feed already exist.");
    }
    printFeed(result, user);
}
;
export function printFeed(feed, user) {
    console.log(`User Info: name: ${user.name}, ID: ${user.id}\n has created this/those feed/s:-`);
    console.log(`Feed: ${feed.name}, ${feed.id}, ${feed.url}, created at: ${feed.createdAt}, updated at: ${feed.updatedAt}`);
}
