import { setUser } from "../config.js";
import { createUser, getUser, deleteAllUsers } from "../lib/db/queries/users";
export async function handlerLogin(cmdName, ...args) {
    if (args.length === 0) {
        throw new Error("Login handler expects a single argument, the username.");
    }
    const getQuery = await getUser(args[0]);
    if (getQuery === undefined) {
        throw new Error(`User ${args[0]} not found`);
    }
    setUser(getQuery.name);
    console.log("User switched successfully!");
}
;
export async function handlerRegister(cmdName, ...args) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
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
export async function handlerReset(cmdName) {
    try {
        await deleteAllUsers();
    }
    catch (error) {
        throw new Error("An error occurred while blanking the table.");
    }
    console.log("The users table were blanked successfully.");
}
;
