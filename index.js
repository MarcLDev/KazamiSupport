const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const config = require('./assets/config.json');
const colors = require('./assets/colors.json');
const mongoose = require('mongoose');
const express = require('express');

const { Interface } = require("readline");
const app = express();

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

//--------Not logged in--------\\
app.get('/', (req, res) => {
    res.sendStatus(403);
})

//--------Logged in--------\\
client.on('ready', () => {
    console.log('Kazami Support Bot is now logged in!');
    app.get('/', (req, res) => {
        res.sendStatus(200);
    })
})

//---------Connecting To Mongoose---------\\
mongoose.connect(`mongodb+srv://Kazami:${process.env['mongoosepassword']}@kazamicluster01a.byh8b.mongodb.net/Data`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('--- M O N G O  C O N N E C T E D ---'))

//--------Functions & Events--------\\
const status = require("./structure/status.js")
status(client);

//--------Slash Handler--------\\
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
require("./handler")(client);
module.exports = client;

//--------Login--------\\
client.login(myToken);