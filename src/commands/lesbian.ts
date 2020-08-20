import { Message } from "discord.js";
import { Command } from "discord-akairo";
import { MessageEmbedOptions } from "discord.js";
//======================================
import { is_nsfw } from "../events/check_is_nsfw";
import NekoLife = require("nekos.life");
import { convert_embed } from "../events/Embed";


export async function get_embed_les() {
    return new Promise<MessageEmbedOptions>((resolve, reject) => {
        const client = new NekoLife();
        
        client.nsfw.lesbian().then(data=>{
            resolve(convert_embed(data.url));
        }).catch(err => {
            reject(convert_embed("", true))
        });
    });;
}

export default class LesbianCommand extends Command{
    constructor(){
        super("lesbian", {
            aliases: ["lesbian", "les"],
            description: "Give an image of lesbian",
            cooldown: 1
        });
    }

    public async exec(message: Message){
        if (is_nsfw(message.channel)) {
            message.channel.send({embed: await get_embed_les()});
        }else{
            message.channel.send("This isn't NSFW channel");
        }
    }
}