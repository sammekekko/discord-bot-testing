const Discord = require("discord.js")
const dotenv = require("dotenv")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const { Player } = require("discord-player")
const welcomeChannelID = "965304300387565618";
const prefix = "/"

dotenv.config()
const TOKEN = process.env.TOKEN

const LOAD_SLASH = process.argv[2] == "load"

const CLIENT_ID = "965284413757857792";
const GUILD_ID = "802508650085744641";

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_VOICE_STATES"
    ]
})

client.slashcommands = new Discord.Collection()
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashFiles) {
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
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
} else {
    client.on("ready", () => {
        client.user.setStatus("online");
        client.user.setActivity("ANUS DON DEMINA, en sån här bög har inte alla servrar");
        console.log(`Logged in as ${client.user.tag}`)
    })

    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) interaction.reply("Inget jävla slash commando")

            await interaction.deferReply()
            await slashcmd.run({
                client,
                interaction
            })
        }
        handleCommand()
    })

    // Login
    client.login(TOKEN)

    client.on("messageCreate", async (message) => {
        if (message.author.bot) {
            return;
        }

        // Custom messages

        if (message.content == "ok") {
            message.reply("bog");
        }

        if (message.content.toLocaleLowerCase() == "fabbe är bög") {
            message.reply("Helt rätt, ni har listat ut det! Bra jobbat. :squirt:");
        }

        if (message.member.id == "422386059473715206" || message.member.id == "416614468299128852") {
            var member = message.member;
            member.send("du är inte på den raka linan så att säga").catch(err => console.error("Failure sending message to user"));
        }

    })
}
