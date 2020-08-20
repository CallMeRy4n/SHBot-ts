import { Message, GuildCreateChannelOptions } from "discord.js";
interface ErrorCTC{
    error: boolean,
    reason: string
}

interface CTCOptions{
    name: string,
    options: GuildCreateChannelOptions,
}

function analyze(split_txt: string[]): CTCOptions {
    const options: GuildCreateChannelOptions = {
        type: "text"
    };
    let name = "null";
    split_txt.forEach(val => {
        if (val.indexOf("!nsfw") !== -1) {
            options.nsfw = true;
        }else if (val.indexOf("!name=") !== -1) {
            name = val.split("!name=")[1];
        }
    });
    return {
        name: name,
        options: options
    };
}

export default class createChannel {
    private message: Message;
    public isValid: ErrorCTC = {
        error: false,
        reason: "No reason"
    };
    constructor(mes: Message) {
        this.message = mes;
        const content_split = mes.content.split(" ");
        this.isValid = {
            error: content_split.length > 1 ? false : true,
            reason: content_split.length > 1 ? "No reason" : "Error, invalid arguments!"
        }
    }

    public exec(){
        const options: CTCOptions = analyze(this.message.content.split(" "));
        const guild = this.message.guild;
        if (guild) {
            guild.channels.create(options.name, options.options);
        }
    }
}

//Test case
