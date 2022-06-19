const eventListeners = require("./eventListeners.js");
const { REST } = require("@discordjs/rest");
const fs = require("fs");
const { Routes } = require("discord-api-types/v9");

const CLIENT_ID = "965284413757857792";
const GUILD_ID = "802508650085744641";

module.exports.ready = async (client) => {
    console.log("---------------------");
    console.log(`Sucessfully logged in as: ${client.user.tag}`);
    console.log("All services online");
    console.log("---------------------");

    client.user.setStatus("online");
    client.user.setActivity("ANUS DON DEMINA, en sån här bög har inte alla servrar");
}

module.exports.readyEvents = async (client) => {
    eventListeners.registerEvents(client);
}

module.exports.loadCommands = async (client) => {
    let commands = []

    const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
    for (const file of slashFiles) {
        const slashcmd = require(`./slash/${file}`)
        client.slashcommands.set(slashcmd.data.name, slashcmd)
        if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
    }

    const rest = new REST({
        version: "9"
    }).setToken(TOKEN)
    console.log("Deploying slash commands")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands
        })
        .then(() => {
            console.log("Successfully loaded")
            process.exit(0)
        })
        .catch((err) => {
            if (err) {
                console.log(err)
                process.exit(1)
            }
        })
}