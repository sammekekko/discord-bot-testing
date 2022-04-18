const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("hjälp").setDescription("Här kan du få lite hjälp om du är dum"),
	run: async ({ client, interaction }) => {

		interaction.member.send("Behöver du hjälp? Bra. Det är ju därför jag finns här.\n\n**/hjälp** -- Ja då kommer du hit idiot.\n**/spammafabbe** -- Du vet nog vad som händer.\n**/spammabögen (mm)** -- Om du inte vet vad som händer nu, då borde du inte ens vara med i den här servern.\nJa nu finns det inge mer, det kommer snart. :squirt:").catch(err => console.error("Failure sending message to user"));;

        await interaction.editReply("^^ Den här idioten behöver hjälp... Hahhaa. vilken idiot.");
	},
}