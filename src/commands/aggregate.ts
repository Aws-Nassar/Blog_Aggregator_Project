import { createPost } from "../lib/db/queries/posts";
import { getNextFeedToFetch, markFeedFetched } from "../lib/db/queries/feeds";
import { fetchFeed } from "../lib/rss";

export async function scrapeFeeds() {
    const feed = await getNextFeedToFetch();
    if (feed === null) {
        console.log("You need to follow some feeds first.");
        return;
    }

    await markFeedFetched(feed.id);
    const rssFeed =  await fetchFeed(feed.url);
    if (!rssFeed) {
        console.log("could not fetch the  feed of this url: ", feed.url);
        return;
    }

    if(rssFeed.channel.item.length === 0)
    {
        console.log("No item/s to fetch.");
        return;
    }

    for (const item of rssFeed.channel.item) {
        const date = new Date(item.pubDate);
        const pubDate = isNaN(date.getTime()) ? undefined  : date;
        await createPost(item.title, item.link, feed.id, item.description, pubDate);
    }
}

function parseDuration(durationStr: string): number {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if (!match) {
        throw new Error("Invalid number");
    }

    let time: number = 0;
    if (match[2] === 'h') {
        time = Number(match[1]) * 1000 * 60 * 60; 
    } else if (match[2] === 'm') {
        time = Number(match[1]) * 1000 * 60 ; 
    } else if (match[2] === 's') {
        time = Number(match[1]) * 1000; 
    } else if (match[2] === 'ms') {
        time = Number(match[1]); 
    }

    return time;
}

function handleError(err: unknown) {
    console.error(`Error: ${err instanceof Error ? err.message : err}`);
}

export async function handlerAggregate(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <time>`);
    } 

    const timeBetweenRequests = parseDuration(args[0]);
    console.log(`Collecting feeds every ${args[0]}...`);
    scrapeFeeds().catch(handleError);

    const interval = setInterval(() => {
        scrapeFeeds().catch(handleError);
    }, timeBetweenRequests);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
};
