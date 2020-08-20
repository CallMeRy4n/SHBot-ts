import { Message } from "discord.js";
import { Command } from "discord-akairo";
import { MessageEmbedOptions } from "discord.js";
//================================================

export default class help extends Command {
    constructor() {
        super("help",{
            aliases: ["help"],
            cooldown: 1,
            description: "help"
        });
    }

    public async exec(message: Message){
        const options: MessageEmbedOptions = {
            title: "All Command",
            fields: [
                {name: "Not thing here", value: "Currently, Im too lazy for it"}
            ]
        };

        message.channel.send({embed: options});
    }
}