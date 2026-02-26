import { getPostsForUser } from "../lib/db/queries/posts";
import { User } from "../lib/db/schema";

export async function handlerBrowse (cmdName: string, user: User, ...args: string[]) {
    const parsed = Number(args[0]);
    const limit = Number.isInteger(parsed) && parsed > 0 ? parsed : 2;

    const posts = await getPostsForUser(user.id, limit);

    if (posts.length !== 0) {
        for (const post of posts) {
            console.log(post.title);
            console.log(post.url);
            console.log(post.publishedAt);
            console.log(post.description);
        }
    }
}
