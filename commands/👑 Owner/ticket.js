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
            .setDescription(`Seja bem-vindo(a) ao suporte exclusivo do Kazami! \nApós clicar na categoria será criado um chat privado com a nossa equipe, e estaremos prontos e dispostos á atender você! \n\n**Reaja de acordo com seu problema ou dúvida:**\n:shopping_cart: ・ Financeiro.\n:telephone_receiver: ・ Suporte.\n:hammer: ・ Reportar bugs.\n:rotating_light: ・ Revisão.\n:mag_right: ・ Outros`);

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