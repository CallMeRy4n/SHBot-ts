import {AkairoClient, CommandHandler, ListenerHandler} from "discord-akairo";
import { join } from "path";

declare module "discord-akairo"{
    interface AkairoClient{
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        config: BotOptions;
        snipe: Map<string, any>;
    }
}

interface BotOptions{
    token: string,
    ownerID: string | string[],
    prefix: string
}

export default class BotClient extends AkairoClient {

    constructor(config: BotOptions){
        super({ownerID: config.ownerID});
        this.config = config;

        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, "..", "commands"),
            allowMention: true,
            commandUtil: true,
            defaultCooldown: 6e4,
            commandUtilLifetime: 3e5,
            
            prefix: this.config.prefix,
            argumentDefaults:{
                prompt:{
                    ended: "Commands has ended",
                    cancel: "Commands has been canceled",
                    modifyStart: (): string => { return ""; },
                    retries: 10,
                    limit: 10,
                    time: 6e4
                }
            },
            ignorePermissions: ["owner"]
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, ".", "listeners")
        });
    }

    private async init(): Promise<void>{
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            process: process,
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    public async start(): Promise<string>{
        await this.init();
        return this.login(this.config.token);
    }
}