exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    //variables
    var unbanChannel = config.banLogChannel;
    var unbanUser = args[0];
    var unbanReason = args.splice(1, args.length - 1).join(" ");
    var unbanTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York", timeZoneName: "short", weekday: "short", month: "long", day: "2-digit", year: "numeric", hour: '2-digit', minute:'2-digit'});
    
    if (!msg.member.roles.find("name","Moderator")) {
        msg.channel.send("I'm sorry, you do not have permission for this command").catch(console.error);
    } else if (!unbanUser || !unbanReason) {
        msg.channel.send("The required syntax is `!unban @user [reason]`")
    } else {
        //log to ban-logs channel
        var embed = new Discord.RichEmbed()
            .setColor(0x008000)
            .setTimestamp()
            .setTitle(`⚖ Someone has been unbanned ⚖`)
            .setDescription(`
**User Id:** ${unbanUser}       
**Unbanned By:** ${msg.author.tag}
**Reason:** ${unbanReason}
**When:** ${unbanTime}
            `);
        msg.guild.channels.find("id",unbanChannel).send({embed}).catch(console.error);

        //ban mentioned user
        msg.guild.unban(unbanUser)
        .then(user => console.log("Unbanned " + user.username + " from " + msg.guild.name))
        .catch(console.error);
    };
};

//for !help command (mandatory or the bot will error!)
exports.help = {
    name: "unban",
    category: "Mods",
    description: "Unbans the user ID specified and logs to bot-logs channel",
    usage: "unban [userid] [reason]",
    example: "",
    status: "Ready"
};