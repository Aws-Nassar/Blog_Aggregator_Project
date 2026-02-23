export function registerCommand(registry, cmdName, handler) {
    if (!cmdName || !handler) {
        throw new Error("You must pass a valid command name / handler.");
    }
    registry[cmdName] = handler;
}
;
export async function runCommand(registry, cmdName, ...args) {
    if (!registry[cmdName]) {
        throw new Error(`${cmdName} is not a valid command.`);
    }
    registry[cmdName](cmdName, ...args);
}
;
