const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("spammafabbe").setDescription("Spamma fabbe när han är bog"),
	run: async ({ client, interaction }) => {
        for (let i = 0; i < 20; i++) {
            setTimeout(function() {
                //client.users.cache.get('416614468299128852').send("din mamma").catch(err => console.error("Failure sending message to user"));
            }, 2000);   
        }
        await interaction.editReply("Nu spammas inte fabbe bogen för han har råblockat boten");
	},
}