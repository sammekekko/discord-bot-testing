const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("shuffle").setDescription("Shufflar kön, alla låtar far huller om buller"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId);

		if (!queue) return await interaction.editReply("Det är inga låtar i fittkön");

		queue.shuffle();
        await interaction.editReply(`Kön som består av ${queue.tracks.length} låtar har hamnat helt huller om buller!`);
	},
}