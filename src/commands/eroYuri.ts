import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MessageEmbedOptions } from "discord.js";
//================================================
import { is_nsfw } from "../events/check_is_nsfw";
import NekoLife = require("nekos.life");
import { convert_embed } from "../events/Embed";

export async function get_embed_eroYuri(): Promise<MessageEmbedOptions> {
    return new Promise<MessageEmbedOptions>((resolve, reject) => {
        const client = new NekoLife();

        client.nsfw.eroYuri().then(data=>{
            resolve(convert_embed(data.url));
        }).catch(err => {
            reject(convert_embed("", true))
        });
    });
}

export default class PingCommand extends Command {
    constructor() {
        super("nekolife-eroYuri",{
            aliases: ["eyuri"],
            cooldown: 1,
            description: "Just a ping"
        });
    }

    public async exec(message: Message){
        if (is_nsfw(message.channel)) {
            message.channel.send({embed: await get_embed_eroYuri()});
        }else{
            message.channel.send("This isn't NSFW channel");
        }
    }
}