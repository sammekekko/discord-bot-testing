const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("skippa").setDescription("Skippar låten som spelas"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Det är inga låtar i kön")

        const currentSong = queue.current

		queue.skip()
        await interaction.editReply({
            embeds: [
                new MessageEmbed().setDescription(`${currentSong.title} har skippats!`).setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}