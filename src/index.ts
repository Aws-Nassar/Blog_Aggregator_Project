import { handlerLogin, handlerRegister, handlerReset, handlerUsers, handlerAggregate } from "./commands/users";
import { type CommandsRegistry, registerCommand, runCommand } from "./commands/commands";
import process from "process";

async function main() {
  let command: CommandsRegistry = {};
  registerCommand(command, "login", handlerLogin);
  registerCommand(command, "register", handlerRegister);
  registerCommand(command, "reset", handlerReset);
  registerCommand(command, "users", handlerUsers);
  registerCommand(command, "agg", handlerAggregate);

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
