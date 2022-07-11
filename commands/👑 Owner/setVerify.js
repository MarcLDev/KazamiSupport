const Discord = require("discord.js");
const colors = require("../../assets/colors.json");

module.exports =  {
    name: "setverificar",
    description: "NULL",
    type: "CHAT_INPUT",
    category: 'Owner',
    ownerOnly: true,
    options: [
        {
            name: "canal",
            description: "Canal que deseja setar o ticket",
            type: "CHANNEL",
            required: true,
        }
    ],
    run: async (client, interaction, args) => {
        const channel = interaction.options.getChannel('canal') || interaction.channel;
        let embed = new Discord.MessageEmbed()
            .setColor(colors.gold)
            .setTitle('Você é realmente um humano?? 🤔')
            .setDescription('Calma lá, antes de acessar o servidor você tem passar por uma verificação. Clique no botão abaixo para começar a verificação!')
            .setImage('https://cdn.discordapp.com/attachments/752355234063450240/995827441190846595/verification.png')
        let button = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setEmoji('🤔')
                .setStyle('SUCCESS')
                .setLabel('Verificar')
                .setCustomId('Verificar')
                .setDisabled(false)
        )

        interaction.followUp({ content: 'Mensagem de verficação enviado com sucesso ao canal!'})
        channel.send({ embeds: [embed], components: [button]}).then();
    }
}