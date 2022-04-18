const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("spela")
		.setDescription("Spelar en låt från youtube")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("låt")
				.setDescription("Laddar en låt från en jotob url")
				.addStringOption((option) => option.setName("url").setDescription("låtens ur fucking l").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("spellista")
				.setDescription("Laddar en spellista från en url")
				.addStringOption((option) => option.setName("url").setDescription("Spellistans ur fucking l").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("leta")
				.setDescription("Letar en låt på nätet med dina fina ord")
				.addStringOption((option) =>
					option.setName("letamedord").setDescription("Leta med dina ord").setRequired(true)
				)
		),
	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) return interaction.editReply("Du måste vara i en VC fattar du väl bög")

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new MessageEmbed()

		if (interaction.options.getSubcommand() === "låt") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("Inga resultat, kanske för att du är bög eller nå?")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** har lagts till i fittkön`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Hur länge låten spelas: ${song.duration}`})

		} else if (interaction.options.getSubcommand() === "spellista") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Inga resultat, kanske för att du är bög eller nå?")
            
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} låtarna från [${playlist.title}](${playlist.url})** har lagts till i fittkön`)
                .setThumbnail(playlist.thumbnail)
		} else if (interaction.options.getSubcommand() === "leta") {
            let url = interaction.options.getString("letamedord")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Inga resultat, kanske för att du är bög eller nå?")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** har lagts till i fittkön`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Hur länge låten spelas: ${song.duration}`})
		}
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
	},
}