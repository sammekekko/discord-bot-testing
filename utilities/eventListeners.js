module.exports.registerEvents = async (client) => {
    
    client.on("guildMemberAdd", member => {

     // TODO Welcome Message
    });


    client.on("interactionCreate", (interaction) => {

        if (interaction.isButton()) {
            async () => {
               const buttonID = interaction.customId;
               if (! buttonID == "gayprocent") { await interaction.reply("Error i koden"); } 

               const randomProcentage = Math.random(101);

               await interaction.deferReply();
               await interaction.reply(`Du är ${randomProcentage.toString()}%`);
            }
        } else if (interaction.isCommand()) {
            async () => {
                const slashcmd = client.slashcommands.get(interaction.commandName);
                if (!slashcmd) interaction.reply("Nu hände det nå jävla konstigt här va");
    
                await interaction.deferReply()
                await slashcmd.run({
                    client,
                    interaction
                });
            }
        }
    });

    client.on("messageCreate", async (message) => {
        if (message.author.bot) { return; }

        // Custom messages

        if (message.content == "ok") {
            message.reply("bog");
        }

        if (message.content.toLocaleLowerCase() == "fabbe är bog" || message.content.toLocaleLowerCase() == "mm är bog") {
            message.reply("Helt rätt, ni har listat ut det! Bra jobbat. :squirt:");
        }
    });

    // Checking for errors with the music integration

    client.player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });
    client.player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });
    
}