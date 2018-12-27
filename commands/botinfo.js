exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    //store bot's game type
    var game = client.user.presence.game.type;
        switch(game) {
            case 1: var gtype = "Playing"; break;
            case 2: var gtype = "Listening to"; break;
            case 3: var gtype = "Watching"; break;
        };
    //store bots OS
    switch(process.platform){
        case "win32": var os = "Windows"; break;
        case "linux": var os = "Linux"; break;
        case "darwin": var os = "Darwin"; break;
        case "openbsd": var os = "OpenBSD"; break;
        case "sunos": var os = "Solaris"; break;
        case "freebst": var os = "FreeBSD"; break;
    };
    //store bots uptime
    var uptime = process.uptime();
    var days = Math.floor((uptime % 31536000) / 86400);
    var hours = Math.floor((uptime % 86400) / 3600);
    var minutes = Math.floor((uptime % 3600) / 60);
    var seconds = Math.round(uptime % 60);
    var botuptime = (days > 0 ? days + " days, ":"") + (hours > 0 ? hours + " hours, ":"") + (minutes > 0 ? minutes + " minutes, ":"") + (seconds > 0 ? seconds + " seconds":"");

    //create embed
    var embed = new Discord.RichEmbed()
        .setAuthor(client.user.tag + " Bot Info", client.user.avatarURL)
        .setColor(0xff0000)
        .setDescription(`
__General Information__
**Status**: ${client.user.presence.status}
**${gtype}:** ${client.user.presence.game.name}
**Uptime:** ${botuptime}
**Ping**: ${Math.round(client.ping)} ms

__Technical Information__
**OS:** ${os}
**Memory:** ${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)} MB
**Node.js Version:** ${process.versions.node}
**Discord.js Version:** ${Discord.version}
       `)
        .setFooter(".botinfo | " + msg.author.tag)
        .setTimestamp();
    msg.channel.send({embed}).catch(console.error);
};

exports.help = {
    name: "botinfo",
    category: "Info",
    description: "Displays information about AutoMod",
    usage: "botinfo",
    example: "",
    status: "Ready"
};