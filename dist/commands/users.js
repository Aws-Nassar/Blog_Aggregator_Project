import { setUser } from "../config.js";
import { createUser, getUser } from "../lib/db/queries/users";
export async function handlerLogin(cmdName, ...args) {
    if (args.length === 0) {
        throw new Error("Login handler expects a single argument, the username.");
    }
    const getQuery = await getUser(args[0]);
    if (getQuery === undefined) {
        throw new Error("User already exists.");
    }
    setUser(args[0]);
    console.log(`${args[0]} has been set.`);
}
;
export async function handlerRegister(cmdName, ...args) {
    if (args.length === 0) {
        throw new Error("Register handler expects a single argument, the username.");
    }
    const getQueryResult = await getUser(args[0]);
    if (getQueryResult !== undefined) {
        throw new Error("User already exists.");
    }
    const createQueryResult = await createUser(args[0]);
    setUser(args[0]);
    console.log(`${args[0]} has been set.`);
    console.log(createQueryResult);
}
;
