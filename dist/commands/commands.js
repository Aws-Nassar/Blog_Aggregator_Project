import { setUser } from "../config.js";
export function handlerLogin(cmdName, ...args) {
    if (args.length === 0) {
        throw new Error("login handler expects a single argument, the username.");
    }
    setUser(args[0]);
    console.log(`${args[0]} has been set.`);
}
;
export function registerCommand(registry, cmdName, handler) {
    if (!cmdName || !handler) {
        throw new Error("You must pass a valid command name / handler.");
    }
    registry[cmdName] = handler;
}
;
function runCommand(registry, cmdName, ...args) {
    if (!registry[cmdName]) {
        throw new Error(`${cmdName} is not a valid command.`);
    }
    registry[cmdName](cmdName, ...args);
}
;
