const Discord = require("discord.js");
const config = require("../config.json");

exports.run = (client, message) => {
    var guild = message.guild.id;
    var delLogChannel = config.deleteLogChannel;
    if (message.content.length > 1900) {var text = "*Content truncated due to length* - " + message.content.substr(0,1900)} else {var text = message.content};
    var embed = new Discord.RichEmbed()
        .setColor(0x992d22)
        .setTimestamp()
        .setTitle(`🗑 **Message Deleted** 🗑`)
        .setDescription(`**Nickname:** ${message.member.displayName}\n**Tag:** ${message.author.tag}\n**From Channel:** ${message.channel.name}\n**Content:** ${text}`);
    client.guilds.find("id",guild).channels.find("id", delLogChannel).send({embed}).catch(console.error);
};
