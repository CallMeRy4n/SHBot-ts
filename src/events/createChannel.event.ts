import { Message, GuildCreateChannelOptions } from "discord.js";

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
    public reason = "There aren't reason here"

    public get isError(): boolean{
        return false;
    }

    constructor(mes: Message) {
        this.message = mes;
        const content_split = mes.content.split(" ");
    }

    public exec(){
        const options: CTCOptions = analyze(this.message.content.split(" "));
        const guild = this.message.guild;
        if (guild) {
            guild.channels.create(options.name, options.options);
            this.message.channel.send("Success created channel");
        }
    }
}

//Test case
