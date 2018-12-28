exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    //variables
    var banChannel = config.banLogChannel;
    var banUser = msg.mentions.users.first();
    var banReason = args.splice(1, args.length - 1).join(" ");
    var banTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York", timeZoneName: "short", weekday: "short", month: "long", day: "2-digit", year: "numeric", hour: '2-digit', minute:'2-digit'});
    
    if (!msg.member.roles.find("name","Moderator")) {
        msg.channel.send("I'm sorry, you do not have permission for this command").catch(console.error);
    //} else if (banUser.roles.find("name","Moderator")) {
    //        msg.channel.send("I'm sorry but you may not ban this person");
    } else if (!banUser || !banReason) {
        msg.channel.send("The required syntax is `.ban @user [reason]`")
    } else {
        //log to ban-logs channel
        var embed = new Discord.RichEmbed()
            .setColor(0x992d22)
            .setTimestamp()
            .setTitle(`🔨 **${banUser.tag}** has been banned 🔨`)
            .setDescription(`
**User Id:** ${banUser.id}
**Banned By:** ${msg.author.tag}
**Reason:** ${banReason}
**When:** ${banTime}
            `);
            msg.guild.channels.find("id",`${banChannel}`).send({embed}).catch(console.error);

        //ban mentioned user
        msg.guild.ban(banUser)
        .then(user => console.log("Banned " + user.username + " from " + msg.guild.name))
        .catch(console.error);
    };
};

//for !help command (mandatory or the bot will error!)
exports.help = {
    name: "ban",
    category: "Mods",
    description: "Bans the user specified, and logs to the logging channel",
    usage: "ban @user [reason]",
    example: "",
    status: "Ready"
};