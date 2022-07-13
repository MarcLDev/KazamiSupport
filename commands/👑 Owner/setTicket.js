const Discord = require("discord.js");
const colors = require("../../assets/colors.json");

module.exports =  {
    name: "setticket",
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
            .setTitle('🔑 Suporte do Kazami')
            .setDescription(`Clique no botão abaixo para abrir um ticket de suporte com os \`\`administradores\`\` do servidor. \n\nPor favor seja bem claro em sua dúvida para ter um suporte melhor!`)
            .setImage('https://cdn.discordapp.com/attachments/752355234063450240/996208383164170340/ticket.png')
        let button = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setEmoji('🔑')
                .setStyle('SECONDARY')
                .setCustomId('ticket')
                .setDisabled(false)
        )

        interaction.followUp({ content: 'Mensagem de verficação enviado com sucesso ao canal!'})
        channel.send({ embeds: [embed], components: [button]}).then();
    }
}