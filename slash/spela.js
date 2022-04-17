// const { SlashCommandBuilder  } = require("@discordjs/builders");
// const { MessageEmbed } = require("discord.js");
// const { QueryType } = require("discord-player");

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName("spela")
//         .setDescription("spela en låt, eller va fan trodde du din jävla fan idiot jävel")
//         .addSubcommand((subcommand) => {
//             subcommand 
//                 .setName("sång")
//                 .setDescription("Laddar en låt från joutoube länk")
//                 .addStringOption((option) => option.setName("url").setDescription("sångens ur fucking l").setRequired(true))
//         })
//         .addSubcommand((subcommand) => {
//             subcommand
//                 .setName("spellista")
//                 .setDescription("Laddar en spellista")
//                 .addStringOption((option) => option.setName("url").setDescription("spellistans urlllll").setRequired(true))
//         })
//         .addSubcommand((subcommand) => {
//             subcommand
//                 .setName("leta")
//                 .setDescription("Letar efter låtar med dina egna ord")
//                 .addStringOption((option) => option.setName("letaord").setDescription("nyckelorden för din mamma").setRequired(true))
//         }),
//         run: async ({ client, interaction }) => {
//             if (!interaction.member.voice.channel) return interaction.editReply("Du måste vara i en vc idiot fan jävel")
    
//             const queue = await client.player.createQueue(interaction.guild)
//             if (!queue.connection) await queue.connect(interaction.member.voice.channel)
    
//             let embed = new MessageEmbed()
    
//             if (interaction.options.getSubcommand() === "sång") {
//                 let url = interaction.options.getString("url")
//                 const result = await client.player.search(url, {
//                     requestedBy: interaction.user,
//                     searchEngine: QueryType.YOUTUBE_VIDEO
//                 })
//                 if (result.tracks.length === 0)
//                     return interaction.editReply("Inga resultat")
                
//                 const song = result.tracks[0]
//                 await queue.addTrack(song)
//                 embed
//                     .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
//                     .setThumbnail(song.thumbnail)
//                     .setFooter({ text: `Jamen hur länge ska den spela: ${song.duration}`})
    
//             } else if (interaction.options.getSubcommand() === "spellista") {
//                 let url = interaction.options.getString("url")
//                 const result = await client.player.search(url, {
//                     requestedBy: interaction.user,
//                     searchEngine: QueryType.YOUTUBE_PLAYLIST
//                 })
    
//                 if (result.tracks.length === 0)
//                     return interaction.editReply("Inga resultat")
                
//                 const playlist = result.playlist
//                 await queue.addTracks(result.tracks)
//                 embed
//                     .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
//                     .setThumbnail(playlist.thumbnail)
//             } else if (interaction.options.getSubcommand() === "leta") {
//                 let url = interaction.options.getString("letaord")
//                 const result = await client.player.search(url, {
//                     requestedBy: interaction.user,
//                     searchEngine: QueryType.AUTO
//                 })
    
//                 if (result.tracks.length === 0)
//                     return interaction.editReply("Inga resultat")
                
//                 const song = result.tracks[0]
//                 await queue.addTrack(song)
//                 embed
//                     .setDescription(`**[${song.title}](${song.url})** har lagts till i kön bögen`)
//                     .setThumbnail(song.thumbnail)
//                     .setFooter({ text: `Jamen hur länge ska den spela: ${song.duration}`})
//             }
//             if (!queue.playing) await queue.play()
//             await interaction.editReply({
//                 embeds: [embed]
//             })
//         },
// }

const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("spela")
		.setDescription("laddar en låt från joutobe")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("låt")
				.setDescription("Ladder från en ur fucking l")
				.addStringOption((option) => option.setName("url").setDescription("låtens url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("spellista")
				.setDescription("Laddar en spellista från en url")
				.addStringOption((option) => option.setName("url").setDescription("Spellistan ur fucking l").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("leta")
				.setDescription("Letar efter en bögig låt med lite ord")
				.addStringOption((option) =>
					option.setName("letamedord").setDescription("leta med ord").setRequired(true)
				)
		),
	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) return interaction.editReply("Du fattar väl att du måste vara in en vc kanal idiot")

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
                return interaction.editReply("Inga jävla resultat")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** har lagts till i kön bögen`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Hur länge den här jävla äckel låten ska spela: ${song.duration}`})

		} else if (interaction.options.getSubcommand() === "spellista") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Inga jävla resultat")
            
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
                .setThumbnail(playlist.thumbnail)
		} else if (interaction.options.getSubcommand() === "leta") {
            let url = interaction.options.getString("letaord")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Inga jävla resultat")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** har lagts till i bögen`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Hur länge den här böglåten ska spelas mer: ${song.duration}`})
		}
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
	},
}