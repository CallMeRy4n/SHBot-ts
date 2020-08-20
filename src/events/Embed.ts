import { MessageEmbedOptions } from "discord.js";

export const color = {
    error: "#ff0000",
    success: "#09ff00",
    warning: "#ffa700",
    info: "#000000",
}

export function convert_embed(url: string, err:boolean = false): MessageEmbedOptions {
    if (err) {
        return {title: "Error", description: "There're some error happen in the code, pls contact Qan"}
    }
    return {
        image: { url: url }
    };
}