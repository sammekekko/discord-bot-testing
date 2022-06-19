const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');


module.exports = {
data: new SlashCommandBuilder()
    .setName("va")
    .setDescription("Vad kan man göra på denna server?"),

	run: async ({ client, interaction }) => {
        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('gayprocent')
                    .setLabel('Gay-nivå (%)')
                    .setStyle("DANGER")
            );

            const embed = new MessageEmbed()
                .setColor("AQUA")
                .setTitle("Vad kan man ens göra på den här servern?")
                .setURL("https://www.pornhub.com/gay")
                .setDescription("Denna server är fylld av överraskningar. Testa att skriva 'ok'")
                .addFields(
                    { name: 'Snacka med boizen?', value: '<#959784465822015548>'},
                    { name: 'Skriva med boizen?', value: '<#802879989300068383>'},
                    { name: 'Skriva muzik-kommandon?', value: '<#962063596844630098>'}
                )
                .setTimestamp()
                .setAuthor({ name: `Framkallad av ${interaction.member.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"})
                .setFooter({ text: 'Anus don demina, den bögigaste botten som någonsin existerat', iconURL: 'https://bloggar.aftonbladet.se/schlagerbloggen/files/2020/02/Bild-2020-02-16-kl.-16.34.00-705x1024.jpg'});

        await interaction.editReply({ ephemeral: false, embeds: [embed], components: [buttons]});
	},
}