const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("resume").setDescription("Spelar upp musiken igen, om du har pausat då"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Det är inga låtar i fittkön")

		queue.setPaused(false)
        await interaction.editReply("Music spelar nu för fullt! Använd `/pause` för att pausa musiken bög")
	},
}