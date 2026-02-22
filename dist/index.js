import { registerCommand, handlerLogin } from "./commands/commands.js";
import process from "process";
function main() {
    let command = {};
    registerCommand(command, "login", handlerLogin);
    console.log(process.argv);
}
main();
