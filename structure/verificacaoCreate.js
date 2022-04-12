const client = require("../index");
const Discord = require("discord.js")

client.on("interactionCreate", async (interaction) => {

    let cargo = interaction.guild.roles.cache.get("752394041806815322");
    let cargoRemove = interaction.guild.roles.cache.get("752394041806815322");
    if(!interaction.isButton()) return;
    if(!interaction.customId === "vf") return;

    if(interaction.member.roles.cache.get(cargo.id)) return interaction.reply({ content: `\\❌ Você já está verificado no servidor.`, ephemeral: true })

    try{

        var captchaResult = makeCaptcha(5);

        const { createCanvas, loadImage } = require('canvas')
        const canvas = createCanvas(450, 150)
        const chave = canvas.getContext('2d')

        chave.fillStyle = "#202020";
        chave.fillRect(0, 0, canvas.width, canvas.height);

        loadImage(captchaImg).then( async (i) => {
            chave.drawImage(i, 0, 0, 450, 150);
            chave.beginPath();
            chave.stroke();
            chave.fill();
        }).then(async () => {
            let attachment  = new Discord.MessageAttachment(canvas.toBuffer(),'captcha.png'); 
            let embed1 = new Discord.MessageEmbed()
                .setTitle('Bem vindo ao servidor Base do Kazami!')
                .setDescription("Por favor digite o código de verificação. \n \É necessário que você digite o código de verificação para entrar no servidor. \n \n**Por que?** \nEsse sistema serve para proteger o servidor e seus membros de contas roubadas ou de bots indesejádos. \n\n **SEU CÓDIGO:**")
                .setColor("#344ca4")
                .setImage(`attachment://captcha.png`)
            try{
                const msg_filter = (m) => m.author.id === interaction.member.id;
                var msgdelete = await interaction.member.send({embeds: [embed1], files: [attachment]})
                msgdelete.channel.awaitMessages({ filter: msg_filter,
                    max: 1,
                    time: 60000
                }).then((collected) => {
                    let msgcollected = collected.first().content;
                    if(msgcollected !== captchaResult){
                        msgdelete.delete();
                        interaction.member.send("Errou!").then(msg => {setTimeout(() => msg.delete(), 10000)})
                    }else{  
                        msgdelete.delete();
                        interaction.member.send("Ok!").then(msg => {setTimeout(() => msg.delete(), 10000)})
                    }
                }).catch(collected => {
                    msgdelete.delete();
                    interaction.member.send({ embeds: [
                        new Discord.MessageEmbed()
                        .setDescription(`❌ O tempo de verificação acabou! Por favor inicie outra verificação.`)
                        .setColor("#FF0400")
                    ]}).then(msg => {setTimeout(() => msg.delete(), 10000)})
                })
            }catch(err){console.log(err)}
        })
    }catch(err){console.log(err)}
})

function makeCaptcha(length){
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength  = characters.length;
    for(var i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}