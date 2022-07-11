const client = require("../index");
const Discord = require("discord.js")

client.on("interactionCreate", async (interaction) => {
    if(interaction.isButton()) {
        if(interaction.customId === "Verificar") {
            const { Captcha } = require("captcha-canvas");

            interaction.member.roles.add("995849233196388392");

            const captcha = new Captcha()
            captcha.async = true;
            captcha.addDecoy()
            captcha.drawTrace()
            captcha.drawCaptcha()

            const attachment = new Discord.MessageAttachment(await captcha.png, "captcha.png");
            const embed = new Discord.MessageEmbed()
                .setTitle("✅ Verificação")
                .setDescription(`<@${interaction.user.id}>, resolva este captcha para que você seja verificado (15 segundos)`)
                .setImage('attachment://captcha.png')
            interaction.reply({ embeds: [embed], files: [attachment], ephemeral: true });

            const filter = m => m.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

            collector.on("collect", async m => {
                setTimeout(() => {
                    try{
                        m.member.roles.remove("995849233196388392");
                        m.delete()
                    }catch(err){}
                }, 1000)
                if(m.content !== captcha.text) {
                    collector.stop();
                    interaction.followUp({ content: "Captcha incorreto, tente novamente!", ephemeral: true })
                }else{
                    collector.stop();
                    await m.member.roles.add("752394041806815322");
                    await m.member.roles.remove("934181947712872488");
                    interaction.followUp({ content: `✅ Pronto ${interaction.user.username}, você foi verificado com sucesso! Seja muito bem vindo ao servidor.`, ephemeral: true });
                }
            })
        }
    }
})