import { Listener } from "discord-akairo";
import { prefix, ownerID } from "../../config";

export default class Ready extends Listener{
    constructor(){
        super("ready-listener", {
            emitter: "client",
            event: "ready"
        });
    }
    public exec(){
        console.log(`Bot is ready with prefix is ${prefix} and ownerID are ${ownerID}`);
        console.log(`Bot name is ${this.client.user.username}`);
    }
}