import { TextChannel, DMChannel, NewsChannel } from "discord.js";
export function is_nsfw(channel: TextChannel | DMChannel | NewsChannel) {
    return channel instanceof TextChannel ? channel.nsfw : false;
}