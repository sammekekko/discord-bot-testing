const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("stängavmusikfan").setDescription("Stänger av botten så att du slipper höra all skitmusik"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Det är inga låtar i fittkön")

		queue.destroy()
        await interaction.editReply("Hejdå bögjävlar!")
	},
}