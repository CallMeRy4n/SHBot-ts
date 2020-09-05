import { Command, CommandOptions } from "discord-akairo";
import { Message } from "discord.js";
//========================================
import CTC from "../events/createChannel.event";

export const public_infomation: CommandOptions = {
    aliases: ["createChannel", "ctc"],
    cooldown: 1,
    description: "`gd?createchannel [Name with `-`] [-nsfw]`"
}

export default class Help extends Command{
    constructor() {
        super("createChannel", public_infomation);
    }

    public async exec(mes: Message) {
        const ctc = new CTC(mes);
        ctc.isError ? mes.channel.send("There're something wrong here, pls contact to <@603460160307855371>") : ctc.exec();
    }
}