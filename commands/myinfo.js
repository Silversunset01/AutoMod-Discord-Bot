exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    var Input = args[0];

    if (typeof Input === 'undefined') {
        //store user roles, max 20
        var roles = msg.member.roles.array();
        var len = roles.length;
        var amt = 20;
        if (len > amt) {
            var answer = roles.slice(0,amt) + " + " + (len - amt) + " more!";
        } else {
            var answer = roles + " ";
        };

        //create embed
        var embed = new Discord.RichEmbed()
            .setColor(0x008000)
            .setTimestamp()
            .setThumbnail(msg.author.avatarURL)
            .setFooter("!myinfo")
            .addField("**User Info**",`
**Tag: ** ${msg.author.tag}
**Nickname: ** ${msg.member.displayName}
**ID: ** ${msg.author.id}
**Avatar URL: ** [click here](${msg.author.avatarURL})
**Created At: ** ${msg.author.createdAt}
            `)
            .addField("**User Status**",`
**Status**: ${msg.author.presence.status}
**Playing: ** ${(msg.author.presence.game = "null" ? "None" : msg.author.presence.game)}
            `)
            .addField("**Roles**", answer);
        msg.channel.send({embed}).catch(console.error);
    } else {
        var UsrLookup = msg.guild.members.find("id",Input);
        var roles = UsrLookup.roles.array();
        var len = roles.length;
        var amt = 20;
        if (len > amt) {
            var answer = roles.slice(0,amt) + " + " + (len - amt) + " more!";
        } else {
            var answer = roles + " ";
        };

        //create embed
        var embed = new Discord.RichEmbed()
            .setColor(0x008000)
            .setTimestamp()
            .setThumbnail(UsrLookup.user.avatarURL)
            .setFooter(".myinfo")
            .addField("**User Info**",`
**Tag: ** ${UsrLookup.user.tag}
**Nickname: ** ${UsrLookup.displayName}
**ID: ** ${UsrLookup.id}
**Avatar URL: ** [click here](${UsrLookup.user.avatarURL})
**Created At: ** ${UsrLookup.user.createdAt}
            `)
            .addField("**User Status**",`
**Status**: ${UsrLookup.presence.status}
**Playing: ** ${(UsrLookup.user.presence.game = "null" ? "None" : UsrLookup.presence.game)}
            `)
            .addField("**Roles**", answer);
        msg.channel.send({embed}).catch(console.error);
    }
};

//for !help command (mandatory or the bot will error!)
exports.help = {
    name: "myinfo",
    category: "Info",
    description: "Displays information relating to the user: name, roles, etc. If a user's ID is specified this will query the user, otherwise the command author will be displayed.",
    usage: "myinfo [<user ID>]",
    example: "",
    status: "Ready"
};