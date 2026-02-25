import { CommandHandler, registerCommand, UserCommandHandler } from "./commands/commands";
import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/users";

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
  return async (cmdName: string, ...args: string[]) => {
    const userName = readConfig().currentUserName;

    const user = await getUser(userName);
    if (!user) {
        throw new Error(`User ${userName} not found`);
    }
    await handler(cmdName, user, ...args);
  };
}

