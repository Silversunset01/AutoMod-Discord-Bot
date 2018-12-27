exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    if (msg.member.roles.find("name","Moderator") || msg.author.id == config.owner) {
        var sayChannel = msg.mentions.channels.first();
        var sayMsg = args.splice(1, args.length - 1).join(" ");
        var role = msg.member.highestRole;
        var embed = new Discord.RichEmbed()
            .setColor(role.color)
            .setTimestamp()
            .setAuthor(`From ${msg.member.displayName} | ${role.name}`,`${msg.author.avatarURL}`)
            .setDescription(sayMsg);
        
        sayChannel.send({embed}).catch(console.error);
    } else {
        msg.channel.send("You do not have permission to use this command").catch(console.error);
    }
};

//for !help command (mandatory or the bot will error!)
exports.help = {
    name: "announce",
    category: "Mods",
    description: "Sends an announcement (Embed) to the specified channel",
    usage: "announce [channel] [message]",
    example: ""
};