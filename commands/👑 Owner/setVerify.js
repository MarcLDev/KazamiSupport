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
    }
}