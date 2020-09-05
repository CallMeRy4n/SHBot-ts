import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { TextChannel, DMChannel, NewsChannel } from "discord.js";
//================================================

export function is_nsfw(channel: TextChannel | DMChannel | NewsChannel): boolean | undefined {
    return channel instanceof TextChannel ? channel.nsfw : undefined;
}

export default class setNSFW extends Command {
    constructor() {
        super("setNSFW",{
            aliases: ["setNSFW"],
            cooldown: 1,
            description: "Setting channel as NSFW"
        });
    }

    public async exec(message: Message){
        const isNsfw = is_nsfw(message.channel);
        if (isNsfw) {
            await message.channel.send("This channel are already NSFW");
        }else if (!isNsfw){
            if (message.channel instanceof TextChannel) {
                await message.channel.setNSFW(true);
                await message.channel.send("Set nsfw of this to true success");
            }
        }else{
            await message.channel.send("Error, something wrong here!");
        }
    }
}