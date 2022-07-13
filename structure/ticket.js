const client = require("../index");
const Discord = require("discord.js");
const colors = require("../assets/colors.json");

client.on("interactionCreate", async (interaction ) => {
    if(interaction.isButton()) {
        if(interaction.customId === "ticket") {
            channel = interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                type: 'GUILD_TEXT',
                topic: 'Suporte ténico do Kazami',
                parent: '934277699541794826',
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS']
                    },
                    {
                        id: '752355233698676855',
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS']
                    },
                    {
                        id: '752355233702608968',
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS']
                    }
                ],
            }).then(async channel => {
                const atalhoTicket = `https://discord.com/channels/752355233648083044/${channel.id}`;
                const atalho = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel('Vá para o ticket')
                            .setStyle('LINK')
                            .setURL(`https://discord.com/channels/752355233648083044/${channel.id}`)
                    )

                    const embed = new Discord.MessageEmbed()
                        .setColor(colors.kazami)
                        .setTitle('🔑 Suporte do Kazami')
                        .setDescription(`Ticket foi criado com sucesso! \n\nClique no botão abaixo para ir para o canal do seu ticket.`)

                    interaction.reply({ embeds: [embed], components: [atalho], ephemeral: true });
                    
                    const ticketEmbed = new Discord.MessageEmbed()
                        .setColor(colors.kazami)
                        .setTitle('')
                        .setDescription(`> Ticket aberto por: ${interaction.user}\n\n> Olá ${interaction.user.tag} por favor especifique de forma bem clara o motivo da solicitação do ticket para que nossa equipe possa lhe dar o suporte necessário.`)
                        .setFooter({ text: `Aperte o botão abaixo para fechar o tickt!` })

                    const button = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId('ft')
                                .setEmoji("🔐")
                                .setStyle("SECONDARY")
                        )
                    channel.send({ embeds: [ticketEmbed], components: [button] });
            })
        }else if(interaction.customId === "ft") {
            const confirm = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('fchat')
                        .setLabel('Fechar ticket')
                        .setStyle('DANGER'),
                    new Discord.MessageButton()
                        .setCustomId('continuar')
                        .setLabel('Cancelar')
                        .setStyle('SECONDARY')
                )

                const embed = new Discord.MessageEmbed()
                    .setTitle('🔐 | Fechar ticket')
                    .setDescription(`Tem certeza que quer fechar este ticket? \n\n> **Fechar Ticket**
                    Irá fechar este ticket em aberto. \n\n> **Cancelar**
                    Continue com o ticket em andamento.`)

                return interaction.reply({ embeds: [embed], components: [confirm] });
        }else if(interaction.customId === "fchat") {
            const deleteEmbed = new Discord.MessageEmbed()
                .setTitle('🔐 | Fechar ticket')
                .setDescription(`Ticket fechado com sucesso! \n\nEste canal será deletado em **10 segundos**!`)

            interaction.channel.send({ embeds: [deleteEmbed] }).then(() => {
                interaction.deferUpdate();
                setTimeout(() => {
                    interaction.channel.delete();
                }, 10000);
            })
        }else if(interaction.customId === "continuar") {
            const continueTicket = new Discord.MessageEmbed()
                .setTitle('🔐 | Fechar ticket')
                .setDescription(`Ação cancelada! \n\nO ticket continuará em **andamento**!`)

            interaction.channel.send({ embeds: [continueTicket] });
            interaction.deferUpdate();
        }
    }
})