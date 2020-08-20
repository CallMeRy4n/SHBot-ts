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
        if (ctc.isValid && ctc.isValid.error) {
            return mes.channel.send(ctc.isValid.reason);
        }else{
            ctc.exec();
        }
    }
}