const Discord = require("discord.js");
const utilityHandler = require("./utilities/utilityHandler.js");
const { Player } = require("discord-player");
const fs = require("fs");

const TOKEN = process.env.TOKEN;

const LOAD_SLASH = process.argv[2] == "load";

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_VOICE_STATES"
    ]
});

client.slashcommands = new Discord.Collection();

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

let commands = []

const slashFiles = fs.readdirSync(`./slash`).filter(file => file.endsWith(".js"))
for (const file of slashFiles) {
    const slashcmd = require(`./slash/${file}`);
    client.slashcommands.set(slashcmd.data.name, slashcmd);
    if (LOAD_SLASH) { commands.push(slashcmd.data.toJSON()); }
}

if (LOAD_SLASH) {
    utilityHandler.loadCommands(commands);
} else { 
    client.on("ready", () => {
        utilityHandler.readyEvents(client);
        utilityHandler.ready(client);
    });

    client.login(TOKEN)
}
