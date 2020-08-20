import { Message } from "discord.js";
import { Command } from "discord-akairo";
import { MessageEmbedOptions } from "discord.js";
//======================================
import { is_nsfw} from "../events/check_is_nsfw";
import { convert_embed } from "../events/Embed";
import NekoLife = require("nekos.life");;

export async function get_embed_hentai(): Promise<MessageEmbedOptions> {

    return new Promise<MessageEmbedOptions>((resolve, reject) => {
        const client = new NekoLife();
        client.nsfw.hentai().then(data=>{
            resolve(convert_embed(data.url));
        }).catch(err => {
            reject(convert_embed("", true))
        });
    });;
}

export default class HentaiCommand extends Command{
    constructor(){
        super("hentai", {
            aliases: ["hentai", "hen"],
            description: "Give an image of hentai",
            cooldown: 1
        });
    }

    public async exec(message: Message){
        if (is_nsfw(message.channel)) {
            message.channel.send({embed: await get_embed_hentai()});
        }else{
            message.channel.send("This isn't NSFW channel");
        }
    }
}