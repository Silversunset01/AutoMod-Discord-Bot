const config = require("../config.json");
exports.run = (client, msg, args, content, cooldown, command, Discord, request) => {
    //store verification level
    switch (msg.guild.verificationLevel) {
        case 0: var vLevel =  "None"; break;
        case 1: var vLevel = "Low"; break;
        case 2: var vLevel = "Medium"; break;
        case 3: var vLevel = "(╯°□°）╯︵ ┻━┻"; break;
        case 4: var vLevel = "┻━┻︵ \ (°□°）/ ︵ ┻━┻"; break;
      };
    //store content filter
    switch (msg.guild.explicitContentFilter) {
        case 0: var cFilter = "Don't scan any messages"; break;
        case 1: var cFilter = "Scan messages from members without a role"; break;
        case 2: var cFilter = "scan messages sent by all members"; break;
      }
    //create embed
    var embed = new Discord.RichEmbed()
        .setAuthor(`Server Info: ${msg.guild.name}`)
        .setColor(0xff0000)
        .setDescription(`
__General Info__
**Owner:** ${msg.guild.owner.displayName}
**Available:** ${(msg.guild.available  ? "Available" : "Not Available")}
**Region:** ${msg.guild.region} 
**Creation Date:** ${msg.guild.createdAt}
**Verification Level:** ${vLevel}

__Misc__
**Emojis:** ${msg.guild.emojis.array().length}
**Roles:** ${msg.guild.roles.array().length}
**Members:** ${msg.guild.memberCount} -> Online: ${msg.guild.members.filter(m => m.user.presence.status == "online").size} | Offline: ${msg.guild.members.filter(m => m.user.presence.status == "offline").size} | Idle: ${msg.guild.members.filter(m => m.user.presence.status == "idle").size} | DND: ${msg.guild.members.filter(m => m.user.presence.status == "dnd").size}
**Channels:** ${msg.guild.channels.array().length} -> Text: ${msg.guild.channels.findAll('type', 'text').length} | Voice: ${msg.guild.channels.findAll('type', 'voice').length}
**AFK info:** Move to ${msg.guild.afkChannel} after ${msg.guild.afkTimeout / 60} minutes
**Content Filter:** ${cFilter}
       `)
        .setFooter("?serverinfo | " + msg.author.tag)
        .setThumbnail(msg.guild.iconURL)
        .setTimestamp();
    msg.channel.send({embed}).catch(console.error);
    
};

//for !help command (mandatory or the bot will error!)
exports.help = {
    name: "serverinfo",
    category: "Info",
    description: "Displays information about the current server",
    usage: "serverinfo",
    example: "",
    status: "Ready"
};