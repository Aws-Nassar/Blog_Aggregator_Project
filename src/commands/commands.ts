type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    if (!cmdName || !handler){
        throw new Error("You must pass a valid command name / handler.");
    }

    registry[cmdName] = handler;
};

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    if (!registry[cmdName])
    {
        throw new Error(`${cmdName} is not a valid command.`)
    }

    await registry[cmdName](cmdName, ...args);
};