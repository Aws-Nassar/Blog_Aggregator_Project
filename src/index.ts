import { handlerLogin } from "./commands/users";
import { type CommandsRegistry, registerCommand, runCommand } from "./commands/commands";
import process from "process";

function main() {
  let command: CommandsRegistry = {};
  registerCommand(command, "login", handlerLogin);

  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log("no command provided");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);

  if (cmdArgs.length < 1) {
    console.log("not enough arguments");
    process.exit(1);
  }


  try {
    runCommand(command, cmdName, ...cmdArgs);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unexpected error occurred:", err);
    }
  }
}

main();
