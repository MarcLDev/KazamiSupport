const Discord = require("discord.js");
const colors = require("../../assets/colors.json");

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
        const channel = interaction.options.getChannel('canal') || interaction.channel;
        let embed = new Discord.MessageEmbed()
            .setColor(colors.gold)
            .setTitle('Você é realmente um humano?? 🤔')
            .setDescription(`Calma ai, para conseguir o cargo de usuário verificado no servidor você tem que provar ser um humano, abaixo da mensagem há um botão com link de verificação do Kazami, basta apenas clicar e autorizar o kazami para verificar-se!
            \n**Aviso:** \nAo autorizar o kazami pelo link ele irá **apenas** receber seu ID no servidor para que possamos adicionar o cargo \<@&752394041806815322>! \nNenhuma outra informação é obtida através de verificação do kazami!
            \n**Instruções:** \nClique no botão abaixo e você será redirecionado ao site do discord para autorizar o kazami, após alguns segundos seu cargo será automaticamente adicionado no servidor. Quaisquer problemas com o sistema informe nossa equipe de suporte!`)
        let button = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setEmoji('🤔')
                .setStyle('LINK')
                .setLabel('Verificar')
                .setURL('')
                .setDisabled(false)
        )

        interaction.followUp({ content: 'Mensagem de verficação enviado com sucesso ao canal!'})
        channel.send({ embeds: [embed], components: [button]}).then();
    }
}