const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("spela")
		.setDescription("Spelar en låt från YT grabbar")
        .addStringOption((option) => option.setName("input").setDescription("URL eller namn är det enda som accepteras...").setRequired(true)),
	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) { return interaction.editReply("Du måste vara i en VC fattar du väl bög"); }
        
        queue = await client.player.createQueue(interaction.guild);

		if (!queue.connection) { await queue.connect(interaction.member.voice.channel); }

		let embed = new MessageEmbed()

        let input = interaction.options.getString("input");


        // Trying if the input is a valid URL
        function isValidURL(givenURL) {
            let url;

            try {
                url = new URL(givenURL).protocol;
            } catch (error) {
                return false;
            }

            return url.protocol === "http:" || url.protocol === "https:";
        }

        // If the input is a url:
        if (isValidURL(input)) {
                if (result = await client.player.search(input, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })) {
                if (result.tracks.length === 0) {
                    return interaction.editReply("Inga resultat, kanske för att du är bög eller nå?") }
                const song = result.tracks[0];
                await queue.addTrack(song);
                embed
                    .setDescription(`**[${song.title}](${song.url})** har lagts till i fittkön`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Hur länge låten spelas: ${song.duration}`});
            }

        // if the input is a search
        } else { 
            if (result = await client.player.search(input, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })) {
                if (result.tracks.length === 0) {
                    return interaction.editReply("Inga resultat, kanske för att du är bög eller nå?") }
                const song = result.tracks[0];
                await queue.addTrack(song);
                embed
                    .setDescription(`**[${song.title}](${song.url})** har lagts till i fittkön`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Hur länge låten spelas: ${song.duration}`});
            }
        }

        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
	},
}