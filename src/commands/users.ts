import{setUser, readConfig} from "../config.js"

export function handlerLogin (cmdName: string, ...args: string[]) {
    if (args.length === 0)
    {
        throw new Error("login handler expects a single argument, the username.");
    }

    setUser(args[0]);
    console.log(`${args[0]} has been set.`);
};