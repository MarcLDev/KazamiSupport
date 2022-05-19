const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 })
const config = require("../config.json");
const db = require("quick.db");

module.exports = function (client) {

var totalUsers = client.channels.cache.get('975787300162261022');

client.on("ready", () => {
    setInterval(() => {
        client.channels.fetch("975787300162261022")
        .then(channel => {
            channel.setName(`👥 Usuários: ${client.users.cache.size.toLocaleString()}`);
        })

        client.channels.fetch("975787732028760095")
        .then(channel => {
            channel.setName(`🚀 Servidores: ${client.guilds.cache.size.toLocaleString()}`);
        })

        client.channels.fetch("975788323354324992")
        .then(channel => {
            channel.setName(`📡 ${Math.round(client.ws.ping)}ms`);
        })

        let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600) % 24;
        let minutes = Math.floor(totalSeconds / 60) % 60;
        let seconds = totalSeconds % 60;

        client.channels.fetch("975788406661599232")
        .then(channel => {
            channel.setName(`⏳ ${days.toFixed()}:${hours.toFixed()}:${minutes.toFixed()}:${seconds.toFixed()}`);
        })
    }, 10000)
})

}