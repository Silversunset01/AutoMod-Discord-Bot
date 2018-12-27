exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    if (msg.member.roles.find("name","Admin") || msg.author.id == config.owner) {
        var sayChannel = msg.mentions.channels.first();
        var sayMsg = args.splice(1, args.length - 1).join(" ");

        sayChannel.send(sayMsg).catch(console.error);
    } else {
        msg.channel.send("You do not have permission to use this command").catch(console.error);
    }
};

//for !help command (mandatory or the bot will error!)
exports.help = {
    name: "say",
    category: "Admin",
    description: "Speaks as the bot",
    usage: "say [channel] [message]",
    example: ""
};