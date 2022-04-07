const Discord = require("discord.js");
const colors = require("../../colors.json");

module.exports =  {
    name: "verificar",
    description: "NULL",
    type: "CHAT_INPUT",
    category: 'Owner',
    ownerOnly: true,
    options: [
        {
            name: "canal",
            description: "Canal que deseja setar o captcha",
            type: "CHANNEL",
            required: true,
        }
    ],
    run: async (client, interaction, args) => { 

        const canal = interaction.options.getChannel('canal') || interaction.channel;

        let embed = new Discord.MessageEmbed()
            .setColor(colors.gold)
            .setImage("https://cdn.discordapp.com/attachments/421342294302785566/828615553106968616/11188.jpg")
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setFooter("Aperte o botão abaixo para iniciar a verificação!")
            .setTimestamp()
            .setDescription(`<:2167_youvebeengnomed:752362203234959462> **Sobre:**\nComece a sua **Verificação** para acessar os canais do Servidor!`);

        let botao = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("vf")
            .setEmoji("<:2167_youvebeengnomed:752362203234959462>")
            .setStyle("SECONDARY")
        );

        interaction.followUp({ content: `Verificação enviado com sucesso para <#${canal.id}>` })
        canal.send({ embeds: [embed], components: [botao] }).then();
  }
}