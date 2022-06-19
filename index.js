const Discord = require("discord.js");
const utilityHandler = require("./utilities/utilityHandler.js");
// const { REST } = require("@discordjs/rest");
// const { Routes } = require("discord-api-types/v9");
// const fs = require("fs");
const { Player } = require("discord-player");

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


// Initializing SlashCommandBuilder

// let commands = []

// const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
// for (const file of slashFiles) {
//     const slashcmd = require(`./slash/${file}`)
//     client.slashcommands.set(slashcmd.data.name, slashcmd)
//     if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
// }

if (LOAD_SLASH) {
    // const rest = new REST({
    //     version: "9"
    // }).setToken(TOKEN)
    // console.log("Deploying slash commands")
    // rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    //         body: commands
    //     })
    //     .then(() => {
    //         console.log("Successfully loaded")
    //         process.exit(0)
    //     })
    //     .catch((err) => {
    //         if (err) {
    //             console.log(err)
    //             process.exit(1)
    //         }
    //     })
    utilityHandler.loadCommands(client);
} else { 
    client.on("ready", () => {
        utilityHandler.readyEvents(client);
        utilityHandler.ready(client);
    });

    client.login(TOKEN)
}
