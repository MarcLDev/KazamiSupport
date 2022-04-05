const Discord = require("discord.js");
const colors = require("../../colors.json");

module.exports =  {
    name: "ticket",
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

        const canal = interaction.options.getChannel('canal') || interaction.channel;

        let embed = new Discord.MessageEmbed()
            .setColor(colors.gold)
            .setImage("https://cdn.discordapp.com/attachments/953939991514447942/957711149879668866/unknown-1.png")
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setFooter("Aperte o botão abaixo para abrir o ticket!")
            .setTimestamp()
            .setDescription(`<:2167_youvebeengnomed:752362203234959462> **Sobre:**\nAbra um **Ticket** para obter Support no servidor\n\n**Descrição:**\nPor favor seja bem claro em sua dúvida para ter um support melhor!`);

        let botao = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("t")
            .setEmoji("<:2167_youvebeengnomed:752362203234959462>")
            .setStyle("SECONDARY")
        );

        interaction.followUp({ content: `Ticket enviado com sucesso para <#${canal.id}>` })
        canal.send({ embeds: [embed], components: [botao] }).then();
  }
}