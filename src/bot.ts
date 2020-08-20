import BotClient  from "./client/BotClient";
import { ownerID, prefix, token } from "./config";
const client = new BotClient({ownerID: ownerID, prefix: prefix, token: token});

client.start();