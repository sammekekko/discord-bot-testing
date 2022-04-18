const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kö")
    .setDescription("Visar låtarnas kö")
    .addNumberOption((option) => option.setName("sida").setDescription("Sidonumret för kölistan").setMinValue(1)),

    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing){
            return await interaction.editReply("Det är inte fittlåtar i kön")
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1
        const page = (interaction.options.getNumber("sida") || 1) - 1

        if (page + 1 > totalPages) 
            return await interaction.editReply(`Ja men skriv ett page som finns. Det finns bara ${totalPages} sidor av låtar`)
        
        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`**Spelar nu:**\n` + 
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "Inga") +
                    `\n\n**Kö**\n${queueString}`
                    )
                    .setFooter({
                        text: `Sida ${page + 1} av ${totalPages}`
                    })
                    .setThumbnail(currentSong.setThumbnail)
            ]
        })
    }
}