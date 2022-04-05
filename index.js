const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const config = require("./config.json");
const colors = require("./colors.json");
const mongoose = require('mongoose');
const express = require('express');
const { Interface } = require("readline");
const app = express();

//---------Login Keys---------\\
const myToken = process.env['token'];
const mdbp = process.env['mongoosepassword'];

//---------Anti Crash---------\\
process.on('multipleResolves', (type, reason, promise) => {
    console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)
});
process.on('unhandRejection', (reason, promise) => {
    console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});


//---------Connecting To Mongoose---------\\
mongoose.set('useCreateIndex', true)
mongoose.connect(`mongodb+srv://Kazami:${mdbp}@kazamicluster01a.byh8b.mongodb.net/Data`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndMofify: false
}).then(console.log('--- M O N G O  C O N N E C T E D ---'))

//---------Dashboard---------\\
app.get("/", (request, response) => {
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);
    console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
    response.sendStatus(200);
});
app.listen(process.env.PORT);

//--------Started--------\\
client.on("ready", () => {
    console.log(``);
    console.log(`Kazami Core > Kazami Bot foi iniciado com sucesso!`);
    console.log(``);
    console.log(` ${client.users.cache.size} usuários registrados.`);
    console.log(` ${client.channels.cache.size} canais.`);
    console.log(` ${client.guilds.cache.size} servidores.`);
    console.log(``);
})

//--------Ticket System--------\\
client.on("interactionCreate", (interaction) => {
    if(interaction.isButton()){
        if(interaction.customId === "t"){
            if (interaction.guild.channels.cache.find(c => c.name === `🎟️-${interaction.user.tag}`)) {
                let c = interaction.guild.channels.cache.find(c => c.name === `🎟️-${interaction.user.tag}`);
                interaction.reply({ content: `Você já possui um ticket aberto em ${c}.`, ephemeral: true });
            }else{
                interaction.guild.channels.create(`🎟️-${interaction.user.tag}`, {
                    type: "GUILD_TEXT",
                    parent: "934277699541794826",
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                        }
                    ]
                }).then(c => {
                    interaction.reply({ content: `Seu ticket for aberto em ${c}!`, ephemeral: true });

                    let embed = new Discord.MessageEmbed()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setDescription(`<:SetaKazami:946806377676951592> **Ticket aberto por:**\n${interaction.user}\n\n<:BugKazami:946790876481462302> **Descrição:** Opa ${interaction.user.tag}, por favor específique o motivo da abertura do ticket ${c}, por favor explique de forma bem clara!`)
                        .setFooter("Aperte o botão abaixo para cancelar o ticket!")
                        .setTimestamp()
                        .setColor(colors.kazami)

                        let button = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                            .setCustomId("tf")
                            .setEmoji("<:deny:761235026692014081>")
                            .setStyle("PRIMARY")
                        );

                        c.send({ embeds: [embed], components: [button] }).then(msg => msg.pin())
                })
            }
        }else if(interaction.customId === "tf"){
            interaction.reply("Este ticket será fechado em 5 segundos... por favor aguarde").then(() => {
                setTimeout(() => {
                    interaction.channel.delete();
                }, 5000)
            })
        }
    }
})

//--------Functions & Events--------\\
const status = require("./structure/status.js")
status(client);

//--------Slash Handler--------\\
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
require("./handler")(client);
module.exports = client;