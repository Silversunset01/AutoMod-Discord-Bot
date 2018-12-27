const Discord = require("discord.js");
exports.run = (client, member) => {
  //log new user
  var joinTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York", timeZoneName: "short", weekday: "short", month: "long", day: "2-digit", year: "numeric", hour: '2-digit', minute:'2-digit'});

  var embed = new Discord.RichEmbed()
  .setColor(0x008000)
  .setDescription(`
${member.user} has joined the server 
**Tag:** ${member.user.tag}
**ID:** ${member.user.id}
**Created At:** ${member.user.createdAt}
**Joined At: ** ${joinTime}
  `);
  client.channels.find("id", "527635891007520778").send({embed}).catch(console.error);

  }