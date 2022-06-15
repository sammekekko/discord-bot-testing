
module.exports.registerEvents = async (client) => {
    
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName);
            if (!slashcmd) interaction.reply("Nu hände det nå jävla konstigt här va");

            await interaction.deferReply()
            await slashcmd.run({
                client,
                interaction
            });
        }
        handleCommand();
    })

    client.on("messageCreate", async (message) => {
        if (message.author.bot) { return; }

        // Custom messages

        if (message.content == "ok") {
            message.reply("bog");
        }

        if (message.content.toLocaleLowerCase() == "fabbe är bög" || message.content.toLocaleLowerCase() == "mm är bög") {
            message.reply("Helt rätt, ni har listat ut det! Bra jobbat. :squirt:");
        }
    })

    // Checking for errors for the music integration

    client.player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });
    client.player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });
    
}