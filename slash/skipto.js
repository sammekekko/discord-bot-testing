const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("skippatill").setDescription("Skippar till den dära bra låten #")
    .addNumberOption((option) => 
        option.setName("låtnumret").setDescription("Låten har skippats till").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId);

		if (!queue) return await interaction.editReply("Det finns inga låtar i fittkön");

        const trackNum = interaction.options.getNumber("låtnumret");
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Men säg ett låtnummer som finns");
		queue.skipTo(trackNum - 1);

        await interaction.editReply(`Skippade till låtnummer: ${trackNum}`);
	},
}