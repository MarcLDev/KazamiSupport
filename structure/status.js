const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 })
const config = require("../config.json");
const db = require("quick.db");

module.exports = function (client) {
  client.on("ready", () => {
    setInterval(async function(){
      var activities = [
        `🙋🏻‍♂️ Opa eu sou o Kazami, é muito bom te conhecer!`, //Kazami Introduction
        `Você sabia que eu também sou uma AI 🧠 para conversar?` //Ai
      ]
      db.set('activities', activities)
    }, 2500)
  })

  const types = [
    "STREAMING",
    "LISTENING",
    "WATCHING"
  ]

  client.on("ready", async () => {
    i = 0;
    setInterval(() => {
      var activitiess = db.get('activities')
      let c = Math.floor(Math.random() * types.length + 1) - 1
      client.user.setActivity(`${activitiess[i++ % activitiess.length]}`, {
        type: types[c],
        url: "https://www.twitch.tv/marcl025",
      })
    }, 5000);

    const status = [
      "online",
      "dnd",
      "idle"
    ]
    setInterval(async () => {
      let b = Math.floor(Math.random() * status.length + 1) - 1
        await client.user.setStatus(status[b])
    }, 5000)

  })
}