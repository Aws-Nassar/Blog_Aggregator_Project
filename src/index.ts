import { handlerLogin, handlerRegister, handlerReset, handlerUsers } from "./commands/users";
import { handlerAggregate, handlerAddFeed, handlerFeeds } from "./commands/feeds";
import { handlerFollow, handlerFollowing, handlerUnFollow } from "./commands/feedFollows";
import { type CommandsRegistry, registerCommand, runCommand } from "./commands/commands"; 
import process from "process";
import { middlewareLoggedIn } from "./middleware";

async function main() {
  let command: CommandsRegistry = {};
  registerCommand(command, "login", handlerLogin);
  registerCommand(command, "register", handlerRegister);
  registerCommand(command, "reset", handlerReset);
  registerCommand(command, "users", handlerUsers);
  registerCommand(command, "agg", handlerAggregate);
  registerCommand(command, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(command, "feeds", handlerFeeds);
  registerCommand(command, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(command, "following", middlewareLoggedIn(handlerFollowing));
  registerCommand(command, "unfollow", middlewareLoggedIn(handlerUnFollow));
  
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log("no command provided");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);

  try {
    await runCommand(command, cmdName, ...cmdArgs);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      process.exit(1)
    } else {
      console.log("An unexpected error occurred:", err);
      process.exit(1)
    }
  }
  process.exit(0)
}

main();
