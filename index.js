const Discord = require("discord.js")
const dotenv = require("dotenv")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const { Player } = require("discord-player")

dotenv.config()
const TOKEN = process.env.TOKEN

const LOAD_SLASH = process.argv[2] == "load"

const CLIENT_ID = "965284413757857792";
const GUILD_ID = "802508650085744641";

const client = new Discord.Client({
    intents: [
        "GUILDS",
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
for (const file of slashFiles){
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(TOKEN)
    console.log("Deploying slash commands")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log("Successfully loaded")
        process.exit(0)
    })
    .catch((err) => {
        if (err){
            console.log(err)
            process.exit(1)
        }
    })
}
else {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) interaction.reply("Not a valid slash command")

            await interaction.deferReply()
            await slashcmd.run({ client, interaction })
        }
        handleCommand()
    })
    client.login(TOKEN)
}

// const Discord = require("discord.js");
// const dotenv = require("dotenv")
// const { REST } = require("@discordjs/rest");
// const { Routes } = require("discord-api-types/v9");
// const { Player } = require("discord-player");
// const fs = require("fs");
// const welcomeChannelID = "965304300387565618";
// const prefix = "!";

// dotenv.config();
// const TOKEN = dotenv.TOKEN;

// const LOAD_PREFIX = process.argv[2] == "load";

// const CLIENT_ID = "965284413757857792";
// const GUILD_ID = "802508650085744641";

// const client = new Discord.Client({
//     intents: [
//         "GUILDS",
//         "GUILD_MESSAGES",
//         "GUILD_MEMBERS",
//         "GUILD_VOICE_STATES"
//     ],
// })

// client.prefixcommands = new Discord.Collection();
// client.player = new Player(client, {
//     ytdlOptions: {
//         quality: "highestaudio",
//         highWaterMark: 1 << 25
//     }
// })

// let commands = {}

// const prefixFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
// for (const file of prefixFiles) {
//     const prefixcmd = require(`./commands/${file}`);
//     client.prefixcommands.set(prefixcmd.data.name, prefixcmd);
//     if (LOAD_PREFIX) commands.push(prefixcmd.data.toJSON());
// }

// if (LOAD_PREFIX) {
//     const rest = new Rest({version: "9"}).setToken(TOKEN);
//     console.log("Deploying commands");
//     rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
//     .then(() => {
//         console.log("Sucessfully loaded");
//         process.exit(0);
//     })
//     .catch((err) => {
//         if (err) {
//             console.log(err);
//             process.exit(1);
//         }
//     })
// }
// else {
//     client.on("ready", () => {
//         console.log(`Logged in as ${client.user.tag}`)
//     })

//     client.on("interactionCreate", (interaction) => {
//         async function handleCommand() {
//             if (!interaction.isCommand()) return;

//             const prefixcmd = client.prefixcommands.get(interaction.commandName);
//             if (!prefixcmd) interaction.reply("Inget jävla kommando idiot");

//             await interaction.deferReply();
//             await prefixcmd.run({client, interaction}) 
//         }
//         handleCommand();
//     })

//     client.on("guildMemberAdd", (member) => {
//         member.guild.channels.cache.get(welcomeChannelID).send(`Vi välkomnar bögen! <@${member.id}>`)
//     })


//     client.login(TOKEN)
// }


// client.on("messageCreate", async (message) => {
//     if (message.author.bot) {
//         return;
//     }

//     // Custom

//     if (message.content == "ok") {
//         message.reply("bog");
//     }

//     if (message.member.id == "422386059473715206" || message.member.id == "416614468299128852") {
//         var member = message.member;
//         message.channel.send("^^ här har vi en homosexuell rackare, eller vad säger ni?");
//         member.send("du är inte på den raka linan så att säga").catch(err => console.error("Failure sending message to user"));
//     }

//     if (!message.content.startsWith(prefix)) {
//         return;
//     }
//     const args = message.content.slice(prefix.length).trim().split(/ + /g);
//     const command = args.shift();

//     // Command engaged

//     if (message.content.length == 1 || message.content == "!help") {
//         message.member.send("Behöver du hjälp? Bra. Det är ju därför jag finns här.\n\n**!help** -- Ja då kommer du hit idiot.\n**!spammafabbe** -- Du vet nog vad som händer.\n**!spammabögen (mm)** -- Om du inte vet vad som händer nu, då borde du inte ens vara med i den här servern.\nJa nu finns det inge mer, det kommer snart. :squirt:")
//         return;
//     }

// })
