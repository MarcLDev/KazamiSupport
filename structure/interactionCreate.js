const client = require("../index");
const Discord = require("discord.js")

client.on("interactionCreate", async (interaction) => {
    if(interaction.isCommand()){
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const cmd = client.slashCommands.get(interaction.commandName);

        const owners = ["252072030298570753"]
        if(cmd){
            if (cmd.ownerOnly) {
                if (!owners.includes(interaction.user.id)) {
                    let ownerOnly = new Discord.MessageEmbed()
                        .setTitle("❌ | Erro")
                        .setDescription( "Somente meu dono pode usar isso!" )
                        .setColor(0xF70000)
                        .setFooter({ text: "By: MarcL#4086 " })
                    return interaction.followUp({embeds : [ownerOnly] });
                }
            }
        }
        if (!cmd) return interaction.followUp({ content: "Ixi, muitos erro poucas soluções" });

        const args = [];
        for(let option of interaction.options.data){
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                    option.options?.forEach((x) => {
                        if (x.value) args.push(x.value);
                    })
            }else if (option.value) args.push(option.value);
        }
        cmd.run(client, interaction, args);
    }

    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
})