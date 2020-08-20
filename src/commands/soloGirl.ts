import { Message } from "discord.js";
import { Command } from "discord-akairo";
import { MessageEmbedOptions } from "discord.js";
//================================================
import { is_nsfw } from "../events/check_is_nsfw";
import NekoLife = require("nekos.life");
import { convert_embed } from "../events/Embed";

export async function get_embed_soloGirl(): Promise<MessageEmbedOptions> {
    return new Promise<MessageEmbedOptions>((resolve, reject) => {
        const client = new NekoLife();

        client.nsfw.girlSolo().then(data=>{
            resolve(convert_embed(data.url));
        }).catch(err => {
            reject(convert_embed("", true))
        });
    });
}

export default class soloGirl extends Command {
    constructor() {
        super("sologirl",{
            aliases: ["girl"],
            cooldown: 1,
            description: "Give an image of girl"
        });
    }

    public async exec(message: Message){
        if (is_nsfw(message.channel)) {
            message.channel.send({embed: await get_embed_soloGirl()});
        }else{
            message.channel.send("This isn't NSFW channel");
        }
    }
}